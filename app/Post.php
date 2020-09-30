<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\belongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\DB;

/**
 * Class Post
 *
 * @package App
 */
class Post extends BaseModel
{
    /**
     * @var string
     */
    protected $table = 'sf_posts';

    /**
     * @var array
     */
    protected $fillable = [
        'view_count',
        'body',
        'comment_count',
        'share_count',
        'favorite_count',
    ];

    protected $casts = [
        'body' => 'string',
    ];

    /**
     * @param Builder $queryBuilder
     * @param $request
     * @return Builder
     */
    public function attachRelationships(Builder &$queryBuilder, $request): Builder
    {
        $profileId = $request->profile->id;
        $centreId = $request->centre->id;
        $categoryId = (int) $request->data['categoryid'];
        $filter = $request->get('filter') ?? [];
        
        $groups = DB::table('groups')
            ->join('local_groups', 'groups.id', '=', 'local_groups.groupid')
            ->where([
                'local_groups.localid' => $request->local->id,
                'local_groups.centreid' => $request->centre->id,
                'local_groups.roleid' => $request->profile->roles[0]->id,
            ])
            ->orWhere('groups.everyone', '=', 1)
            ->get();

        $everyoneGroup = DB::table('groups')
            ->where([
                'groups.everyone' => 1,
                'groups.centreid' => $request->centre->id,
            ])
            ->get();

        $mygroups = [$everyoneGroup[0]->id];
        foreach ($groups as $group) {
            $mygroups[] = $group->id;
        }

        $queryBuilder
            ->where([
                'deleted' => 0, 
                'centre_id' => $centreId,
                'category_id' => $categoryId,
            ])
            ->where(function($query) use ($profileId)
            {
                $query
                    ->where('approved', '=', 1)
                    ->orWhere(function($query) use ($profileId)
                    {
                        $query
                            ->where('approved', '=', 0)
                            ->where('profile_id', '=', $profileId)
                        ;
                    });
            })
            ->where(function($query) use ($filter)
            {
                if (!empty($filter['user'])) {
                    $user = (int) $filter['user'];
                    if ($user > 0) {
                        $query
                            ->where('profile_id', '=', $filter['user'])
                        ;
                    }
                }
            })
            ->with('local')
            ->with('role')
            ->with('profile')
            ->with(['profile.locals' => static function ($query) use ($centreId) {
                // Only fetch the store the user is representing in this session.
                $query
                    ->where('profile_locals.centreid', $centreId)
                    
                ;
            }])
            ->with(['profile.roles' => static function ($query) use ($centreId) {
                $query
                    ->where('profile_locals.centreid', $centreId)
                ;
            }])
            ->with('comments')
            ->with('comments.profile')
            ->with('postType')
            ->with('sharedBy')
            ->with('groups')
            ->whereHas('groups', function ($query) use ($mygroups) {
                $query
                    ->whereIn('groups.id', $mygroups)
                ;
            })
            ->with(['postmedia.media' => static function ($query) {
                $query
                    ->where('media.deleted', 0)
                ;
            }])
            ->orderBy('createddate', 'desc');

        return $queryBuilder;
    }

    /**
     * @return BelongsTo
     */
    public function local()
    {
        return $this->belongsTo(Local::class);
    }

    /**
     * @return BelongsTo
     */
    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    /**
     * @return belongsTo
     */
    public function postType()
    {
        return $this->belongsTo(PostType::class);
    }

    /**
     * @return belongsToMany
     */
    public function sharedBy()
    {
        return $this->belongsToMany(Profile::class, PostShare::class);
    }

    public function comments()
    {
        return $this->hasMany(Comments::class)->where('deleted', 0);
    }

    /**
     * @return BelongsTo
     */
    public function reaction()
    {
        return $this->hasMany(PostReactions::class)->where('deleted', 0);
    }

    /**
     * @return BelongsTo
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }
    /**
     * @return hasMany
     */
    public function postMedia()
    {
        return $this->hasMany(PostMedia::class)->where('deleted', 0);
    }

    /**
     * @return belongsToMany
     */
    public function groups()
    {
        return $this->belongsToMany(Group::class, PostGroup::class);
    }
}
