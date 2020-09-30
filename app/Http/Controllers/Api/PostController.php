<?php

namespace App\Http\Controllers\Api;

use App\Comments;
use App\CommentsFlag;
use App\Post;
use App\Helpers\LinkProcessor;
use App\Helpers\MediaProcessor;
use App\Http\Requests\Api\DataRequest;
use App\Flag;
use App\Media;
use App\PostFlag;
use App\PostMedia;
use App\PostReaction;
use App\PostShare;
use App\PostType;
use App\Profile;
use App\Reaction;
use App\Traits\ApiV4Trait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use \Exception;

/**
 * Class PostController
 * @package App\Http\Controllers\Api
 */
class PostController extends ApiController
{
    use ApiV4Trait;

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        $mediaProcessor = new MediaProcessor;
        $post = new Post();

        try {
            $post->body = nl2br($request->get('body'));

            $linkProcessor = new LinkProcessor;
            $pageScrape = $linkProcessor->pageScrape($post->body);
            $post->body = $linkProcessor->formatString($post->body);

            if ($pageScrape != '') {
                $post->body .= "<br /><br />" . $pageScrape;
            }

            $profile = Profile::find($request->get('profile')['id']);
            $firstPost = Post::where(['profile_id' => $profile->id, 'deleted' => 0])->first();
            $post->profile()->associate($profile);

            $post->centre_id = $request->centre->id;
            $post->local_id = $request->data['localid'];
            $post->role_id = $request->data['roleid'];
            $post->category_id = (int) $request->data['categoryid'];

            $postType = PostType::where('machine_name', $request->get('postType'))->first();
            $post->postType()->associate($postType);

            if ($post->save()) {
                $postGroupIds = collect($request->get('postGroups'))->pluck('id');
                $post->groups()->attach($postGroupIds);

                foreach ($request->get('files') as $file) {
                    $filename = $mediaProcessor->base64ImageToAWS($file['src'], $request->centre->id);

                    $media = new Media();
                    $media->name = $filename;
                    $media->filename = $filename;
                    $media->createddate = date('Y-m-d H:i:s');
                    $media->modifieddate = '0000-00-00 00:00:00';
                    $media->media_typeid = 15;
                    $media->deleted = 0;
                    $media->acl = 'public';
                    $media->centreid = $request->centre->id;
                    $media->save();

                    $postMedia = new PostMedia();
                    $postMedia->post()->associate($post);
                    $postMedia->media()->associate($media);
                    $postMedia->save();
                }

                if ($request->get('postType') == 'share') {
                    $post->share_post_id = $request->get('postShare');
                    $post->save();

                    $shared_post = Post::find($request->get('postShare'));

                    $postShare = new PostShare();

                    $postShare->profile()->associate($profile);
                    $postShare->post()->associate($shared_post);
                    $postShare->save();

                    ++$shared_post->share_count;
                    $shared_post->save();

                    // SEND NOTIFICATION TO AUTHOR
                    $myProfileId = $request->profile->id;
                    $author = $shared_post->profile_id;

                    if ($author != $myProfileId) {
                        $pushProfileIds = [$author];

                        $title = 'New Share on Social Feed';
                        $message = $request->profile->firstname . ' ' . $request->profile->lastname . ' has shared your post';
                        $pushData = [
                            'action' => 'post',
                            'postId' => $post->id,
                        ];

                        $this->pushProfiles($request, $pushProfileIds, $title, $message, $pushData);
                    }
                }
            }

        } catch (Exception $e) {
            return $this->respondError($e->getMessage(), 409);
        }

        $postQuery = Post::query();
        $postQuery->find($post->id);
        $post = (new Post)->attachRelationships($postQuery, $request)->first();

        if ($post->profile->avatar_set > 0) {
            $post->profile->avatar = $this->getAvatarUrl($request->centre->ownerid, $profile->id);
        }

        foreach ($post->profile->locals as $index => $local) {
            foreach ($post->profile->roles as $role) {
                if ($local->pivot->roleid == $role->id) {
                    $post->profile->locals[$index]->role = $role;
                }
            }
        }

        $post->postmedia = $mediaProcessor->postMediaURLs($post->postmedia, $request->centre->id);

        $post->first_post = $firstPost ? false : true;

        $post = $this->mapPost($request, $post);

        return $this->respondCreated($post);
    }

    /**
     * @param DataRequest $request
     * @return JsonResponse
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function all(DataRequest $request): JsonResponse
    {
        $postsQuery = Post::query();
        (new Post())->attachRelationships($postsQuery, $request);

        $posts = $postsQuery
            ->paginate(
                $request->get('limit') ?? 10,
                ['*'],
                'page',
                $request->get('page') ?? 1
            );

        $posts->map(function ($post) use ($request) {
            return $this->mapPost($request, $post);
        });

        $filter = $request->get('filter') ?? [];
        if (!empty($filter['media'])) {
            if ($filter['media'] == 1) {
                foreach ($posts as $index => $post) {
                    if (
                        (count($post->postmedia) == 0 && empty($post->share_post)) ||
                        (count($post->postmedia) == 0 && count($post->share_post->postmedia) == 0)
                    ) {
                        $posts[$index] = null;
                    }
                }
            }
        }

        return $this->respondSuccess($posts);
    }

    /**
     * @param $request
     * @param $postId
     * @return mixed
     */
    public function single($request, $postId)
    {
        $filter = $request->get('filter');
        $filter['user'] = null;
        $request->merge(['filter' => $filter]);

        $postQuery = Post::query();
        $postQuery->find($postId);
        $post = (new Post())->attachRelationships($postQuery, $request)->first();

        if (is_null($post)) {
            return false;
        }

        $post = $this->mapPost($request, $post);

        return $this->respondSuccess($post);
    }

    /**
     * @param $postId
     * @return JsonResponse
     */
    public function comments(Request $request, $postId): JsonResponse
    {
        $comments = Post::find($postId)
            ->comments()
            ->with('profile')
            ->get();

        foreach ($comments as $key => $comment) {
            $comments[$key]->profile->avatar = $comment->profile->avatar_set ? $this->getAvatarUrl(
                $request->centre->ownerid,
                $comment->profile->id
            ) : null;
        }

        return $this->respondSuccess($comments);
    }

    /**
     * @param Request $request
     * @param $postId
     * @return JsonResponse
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function createComment(Request $request, $postId): JsonResponse
    {
        $comment = new Comments();

        try {
            $comment->body = nl2br($request->get('body'));
            $profile = $request->get('profile');
            $post = Post::find($postId);
            $comment->profile()->associate($profile);

            if ($comment->profile->avatar_set > 0) {
                $comment->profile->avatar = $this->getAvatarUrl($request->centre->ownerid, $profile->id);
            }

            $comment->post()->associate($post);
            $comment->save();
            $post->comment_count = $this->getCommentCount($postId);
            $post->save();

            // SEND NOTIFICATION TO AUTHOR
            $myProfileId = $request->profile->id;
            $author = $post->profile_id;
            if ($author != $myProfileId) {
                $pushProfileIds = [$post->profile_id];

                $title = 'New Comment on Social Feed';
                $message = $request->profile->firstname . ' ' . $request->profile->lastname . ' has commented on your post';
                $pushData = [
                    'action' => 'post',
                    'postId' => $postId,
                ];

                $this->pushProfiles($request, $pushProfileIds, $title, $message, $pushData);
            }

            // SEND NOTIFICATION TO COMMENT AUTHORS
            $comment_authors = $this->commentAuthors($postId);
            $pushProfileIds = array_unique($comment_authors, SORT_NUMERIC);
            $pushProfileIds = array_diff($pushProfileIds, [$myProfileId, $author]);

            if (!empty($pushProfileIds)) {
                $title = 'New Comment on Social Feed';
                $message = $request->profile->firstname . ' ' . $request->profile->lastname . ' has also commented on a post';
                $pushData = [
                    'action' => 'post',
                    'postId' => $postId,
                ];

                $this->pushProfiles($request, $pushProfileIds, $title, $message, $pushData);
            }

       } catch (Exception $e) {
           return $this->respondError($e->getMessage(), 409);
       }

       return $this->respondCreated($comment);
    }

    /**
     * @param $postId
     * @return int
     */
    private function getCommentCount($postId): int
    {
        $comments = Comments::where([
            'post_id' => $postId,
            'deleted' => 0,
        ])->count();

        return $comments;
    }

    /**
     * @param $postId
     * @param $profileId
     * @return JsonResponse
     */
    public function report($postId, $profileId): JsonResponse
    {
        $postFlag = new PostFlag();

        try {
            $post = Post::find($postId);
            $profile = Profile::find($profileId);
            $flag = Flag::where('name', 'report')->first();
            $postFlag->profile()->associate($profile);
            $postFlag->post()->associate($post);
            $postFlag->flag()->associate($flag);
            $postFlag->save();
        } catch (Exception $e) {
            return $this->respondError($e->getMessage(), 409);
        }

        return $this->respondCreated($postFlag);
    }

    /**
     * @param $postId
     * @return JsonResponse
     */
    public function delete($postId): JsonResponse
    {
        try {
            $post = Post::find($postId);
            $post->deleted = 1;
            $post->save();
        } catch (Exception $e) {
            return $this->respondError($e->getMessage(), 409);
        }

        return $this->respondCreated($post);
    }

    /**
     * @param $postId
     * @param $commentId
     * @param $profileId
     * @return JsonResponse
     */
    public function reportComment($postId, $commentId, $profileId): JsonResponse
    {
        $commentsFlag = new CommentsFlag();

        try {
            $post = Post::find($postId);
            $comment = Comments::find($commentId);
            $profile = Profile::find($profileId);
            $flag = Flag::where('name', 'report')->first();
            $commentsFlag->profile()->associate($profile);
            $commentsFlag->comments()->associate($comment);
            $commentsFlag->flag()->associate($flag);
            $commentsFlag->save();
        } catch (Exception $e) {
            return $this->respondError($e->getMessage(), 409);
        }

        return $this->respondCreated($commentsFlag);
    }

    /**
     * @param $postId
     * @param $commentId
     * @return JsonResponse
     */
    public function deleteComment($postId, $commentId): JsonResponse
    {
        try {
            $post = Post::find($postId);
            --$post->comment_count;
            $post->save();
            $comment = Comments::find($commentId);
            $comment->deleted = 1;
            $comment->save();
        } catch (Exception $e) {
            return $this->respondError($e->getMessage(), 409);
        }

        return $this->respondCreated($comment);
    }

    /**
     * @param $postId
     * @param $profileId
     * @return JsonResponse
     */
    public function like(Request $request, $postId, $profileId): JsonResponse
    {
        $postReaction = new PostReaction();

        try {
            $post = Post::find($postId);
            $profile = Profile::find($profileId);
            $reaction = Reaction::where('emoji_one_name', 0)->first();
            $postReaction->profile()->associate($profile);
            $postReaction->post()->associate($post);
            $postReaction->reaction()->associate($reaction);
            $postReaction->save();
            $post->favorite_count = $this->getLikeCount($postId);
            $post->save();

            // SEND NOTIFICATION TO AUTHOR
            $myProfileId = $request->profile->id;
            $author = $post->profile_id;

            if ($author != $myProfileId) {
                $pushProfileIds = [$author];

                $title = 'New Like on Social Feed';
                $message = $request->profile->firstname . ' ' . $request->profile->lastname . ' has liked your post';
                $pushData = [
                    'action' => 'post',
                    'postId' => $postId,
                ];

                $this->pushProfiles($request, $pushProfileIds, $title, $message, $pushData);
            }
        } catch (Exception $e) {
            return $this->respondError($e->getMessage(), 409);
        }

        return $this->respondCreated($post);
    }

    /**
     * @param $postId
     * @param $profileId
     * @return JsonResponse
     */
    public function unLike($postId, $profileId): JsonResponse
    {
        try {
            $reaction = Reaction::where('emoji_one_name', 0)->first();
            $result = PostReaction::where([
                'profile_id' => $profileId,
                'post_id' => $postId,
                'reaction_id' => $reaction->id,
            ])->update(['deleted' => 1]);
            $post = Post::find($postId);
            $post->favorite_count = $this->getLikeCount($postId);
            $post->save();
        } catch (Exception $e) {
            return $this->respondError($e->getMessage(), 409);
        }

        return $this->respondCreated($post);
    }

    /**
     * @param $postId
     * @return int
     */
    private function getLikeCount($postId): int
    {
        $reaction = Reaction::where('emoji_one_name', 0)->first();
        $likes = PostReaction::where([
            'post_id' => $postId,
            'deleted' => 0,
            'reaction_id' => $reaction->id,
        ])->count();

        return $likes;
    }

    /**
     * @param $postId
     * @param $profileId
     * @return JsonResponse
     */
    public function share(Request $request, $postId, $profileId): JsonResponse
    {
        $postShare = new PostShare();

        try {
            $post = Post::find($postId);
            $profile = Profile::find($profileId);
            $postShare->profile()->associate($profile);
            $postShare->post()->associate($post);
            $postShare->save();
            $post->share_count = $this->getShareCount($postId);
            $post->save();

        } catch (Exception $e) {
            return $this->respondError($e->getMessage(), 409);
        }

        return $this->respondCreated($postShare);
    }

    /**
     * @param $postId
     * @return int
     */
    private function getShareCount($postId): int
    {
        $shares = $postShare::where([
            'post_id' => $postId,
            'deleted' => 0,
        ])->count();

        return $shares;
    }

    private function mapPost($request, $post)
    {
        $mediaProcessor = new MediaProcessor;
        $reaction = Reaction::where('emoji_one_name', 0)->first();
        $profileId = $request->profile->id;

        $liked = PostReaction::where([
            'post_id' => $post->id,
            'profile_id' => $profileId,
            'reaction_id' => $reaction->id,
            'deleted' => 0,
        ])->first();
        $post->liked = $liked ?: false;

        $shared = PostShare::where([
            'post_id' => $post->id,
            'profile_id' => $profileId,
            'deleted' => 0,
        ])->first();
        $post->shared = $shared ?: false;

        $post->profile->avatar = null;

        if ($post->profile->avatar_set > 0) {
            $post->profile->avatar = $this->getAvatarUrl($request->centre->ownerid, $post->profile->id);
        }

        foreach ($post->profile->locals as $index => $local) {
            foreach ($post->profile->roles as $role) {
                if ($local->pivot->roleid == $role->id) {
                    $post->profile->locals[$index]->role = $role;
                }
            }
        }

        $post->share_post = false;
        if ($post->share_post_id > 0) {
            $shared_post = $this->single($request, $post->share_post_id);

            if (!$shared_post) {
                $post->share_post_id = -1;
            } else {
                $post->share_post = $shared_post->original;
                if (is_object($post->share_post->postmedia)) {
                    foreach ($post->share_post->postmedia as $index => $postMedia) {
                        if ($postMedia['deleted'] == 1 || $postMedia['media']['deleted'] == 1) {
                            unset($post->postmedia[$index]);
                        }
                        else {
                            $ownerid = $request->centre->ownerid;
                            $centreid = $request->centre->id;
                            $location = 'files';
                            $filename = $postMedia['media']['filename'];

                            if (env('S3_SEGREGATED')) {
                                $uri = sprintf(
                                    'uploads/o%d/%d/%s/%s',
                                    $ownerid,
                                    $centreid,
                                    $location,
                                    trim($filename,'/')
                                );
                            } else {
                                $uri = sprintf(
                                    'uploads/%d/%s/%s',
                                    $centreid,
                                    $location,
                                    trim($filename,'/')
                                );
                            }

                            $post->share_post->postmedia[$index]->url = Storage::disk('s3')->url($uri);
                        }
                    }
                }
            }
        }

        if (is_object($post->postmedia)) {
            $post->postmedia = $mediaProcessor->postMediaURLs($post->postmedia, $request->centre->id);
        }

        return $post;
    }

    /**
     * @param $postId
     * @return array
     */
    private function commentAuthors($postId): array
    {
        $comments = Post::find($postId)
            ->comments()
            ->with('profile')
            ->get();

        $comment_authors = [];
        foreach ($comments as $comment) {
            $comment_authors[] = $comment->profile_id;
        }

        return array_unique($comment_authors, SORT_NUMERIC);
    }

    /**
     * @param $request
     * @param $pushProfileIds
     * @param $category [comment, like, share]
     * @param $message
     * @param $pushData
     * @return int
     */
    private function pushProfiles(Request $request, $pushProfileIds, $category, $message, $pushData = []): int
    {
        $push_sent = 0;

        $tokens = DB::table('apn')
            ->select([
                'devices.token',
                'devices.device_os',
                'devices.device_make',
            ])
            ->leftJoin('profile_status', function($join) {
                $join->on('apn.profileid', '=', 'profile_status.profileid');
                $join->on('apn.centreid', '=', 'profile_status.centreid');
            })
            ->leftJoin('devices', function($join) {
                $join->on('apn.deviceid', '=', 'devices.id');
            })
            ->whereIn('apn.profileid', $pushProfileIds)
            ->where('profile_status.email_verified', '=', 1)
            ->where('profile_status.approved', '=', 1)
            ->where('apn.modifieddate', '>', 'NOW() - INTERVAL 60 DAY')
            ->groupBy('devices.token')
            ->get();

        $tokens_array = [];
        if (count($tokens) > 0) {
            foreach ($tokens as $token){
                if (preg_match('(SIMULATOR|null)', $token->token) === 1) {
                    unset($tokens);
                    continue;
                }

                // Set OS
                $os = strtolower($token->device_os);
                if (empty($tokent->device_os)) {
                    switch ($token->device_make) {
                        case 'android':
                            $os = 'android';
                            break;
                        case 'iPad':
                        case 'iPhone':
                            $os = 'ios';
                            break;
                    }
                }

                if (!isset($tokens_array[$os])) {
                    $tokens_array[$os] = [];
                }

                $tokens_array[$os][$token->token] = [
                    'centreid' => $request->centre->id,
                    'rowid' => 0,
                    'count' => 1,
                    'device_make' => strtolower($token->device_make),
                    'groupid' => $request->centre->id,
                ];
            }

            include(app_path() . '/push-library/Push.php');
            $push = new \Push();
            $push->setup($request->centre->appid);
            $push->logger = false;

            $payload = [
                'scheduleid' => 0,
                'streamid' => 0,
                'categoryid' => (int) $request->data['categoryid'],
                'centreid' => $request->centre->id,
                'category' => $category,
                'message' => $message,
                'push_data' => $pushData,
            ];

            if (!empty($tokens_array['ios'])) {
                $push->sendApple([
                    'tokens' => $tokens_array['ios'],
                    'payload' => $payload
                ]);
                $push_sent += count($tokens_array['ios']);
            }

            if (!empty($tokens_array['android'])) {
                $push->sendAndroid([
                    'tokens' => $tokens_array['android'],
                    'payload' => $payload
                ]);
                $push_sent += count($tokens_array['android']);
            }

            if (!empty($tokens_array['windows'])) {
                $push->sendWindows([
                    'tokens' => $tokens_array['windows'],
                    'payload' => $payload
                ]);
                $push_sent += count($tokens_array['windows']);
            }
        }

        return $push_sent;
    }

}
