<?php


namespace App\Http\Middleware;

use App\Profile;
use Closure;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Class DataStringAuthentication
 * @package App\Http\Middleware\data
 */
class DataStringAuthentication extends BaseApiMiddleware
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

            if (!$profile = Profile::find($profileId)) {
                throw new \RuntimeException('No profile found for data profile ID ' . $profileId, 404);
            }

            $request->request->add([
                'profile' => $profile,
            ]);
        } catch (QueryException $e) {
            return $this->respondError(
                'Profile normalisation error: ' . $e->getMessage(),
                1,
                500
            );
        }
        catch (\RuntimeException $e) {
            return $this->respondError(
                'Profile normalisation error: ' . $e->getMessage()
            );
        }

        return $next($request);
    }
}
