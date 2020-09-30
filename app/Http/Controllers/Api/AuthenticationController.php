<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Api\DataRequest;

use App\PostReaction;
use Illuminate\Support\Facades\Auth;
use App\Traits\ApiV4Trait;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * Class AuthenticationController
 * @package App\Http\Controllers\Api
 */
class AuthenticationController extends ApiController
{
    use ApiV4Trait;

    /**
     * @param DataRequest $request
     * @return JsonResponse
     * @throws GuzzleException
     */
    public function login(DataRequest $request): JsonResponse
    {
        $profile = $request->profile;

        if (!$profile) {
            return $this->respondUnauthorized();
        }

        if (!Auth::check()) {
            try {
                Auth::login($profile);
                $token = Str::random(60);
                $profile->forceFill([
                    'api_token' => hash('sha256', $token),
                ])->save();
            } catch (\Exception $e) {
                $this->respondFailedLogin();
            }
        }

        $profile->pushData = null;
        if (isset($request->push_data)) {
            $profile->pushData = $request->push_data;
        }
        $profile->pushData = [
            'postId' => 238, 
            'action' => 'post',
        ];

        $profile->avatar = $profile->avatar_set ? $this->getAvatarUrl(
            $request->centre->ownerid,
            $request->profile->id
        ) : null;

        $profile->load(
            [
                'locals' => static function ($query) use ($request) {
                    // Only fetch the store the user is representing in this session.
                    $query->where('localid', $request->local->id);
                },
                'roles' => static function ($query) use ($request) {
                    $query->where('localid', $request->local->id);
                },
                'followers',
                'following',
            ]
        );

        foreach ($profile->locals as $index => $local) {
            foreach ($profile->roles as $role) {
                if ($local->pivot->roleid == $role->id) {
                    $profile->locals[$index]->role = $role;
                }
            }
        }

        $profile->groups = DB::table('groups')
            ->join('local_groups', 'groups.id', '=', 'local_groups.groupid')
            ->where([
                'local_groups.localid' => $request->local->id,
                'local_groups.centreid' => $request->centre->id,
                'local_groups.roleid' => $profile->roles[0]->id,
            ])
            ->get();

        return $this->respondSuccess($profile);
    }
}
