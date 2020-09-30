<?php

namespace App\Http\Middleware\data\normalisation;

use Illuminate\Support\Facades\Auth;
use App\Profile as ProfileModel;
use App\Http\Middleware\BaseApiMiddleware;
use Closure;
use Illuminate\Http\Request;

/**
 * Class Profile
 * @package App\Http\Middleware\data\normalisation
 */
class Profile extends BaseApiMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Request  $request
     * @param  Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            $profileId = $request->data['profileid'];
            $profile = null;

            if (!Auth::check()) {
                if (!$profile = ProfileModel::with(['followers', 'following'])->find($profileId)) {
                    throw new \RuntimeException('No profile found for data profile ID ' . $profileId, 404);
                }

                Auth::login($profile);
            }

            $request->request->add([
                'profile' => $profile,
            ]);
        } catch (\RuntimeException $e) {
            return $this->respondError(
                'Profile normalisation error: ' . $e->getMessage()
            );
        }

        return $next($request);
    }
}
