<?php

namespace App\Http\Middleware\data\normalisation;

use App\ProfileLocal as ProfileLocalModel;
use App\Http\Middleware\BaseApiMiddleware;
use Closure;
use Illuminate\Http\Request;

/**
 * Class Local
 * @package App\Http\Middleware\data\normalisation
 */
class ProfileLocal extends BaseApiMiddleware
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
            $request->request->add([
                'profileLocal' => ProfileLocalModel::findProfileLocal(
                    $request->data['localid'],
                    $request->data['profileid'],
                    $request->data['centreid'],
                    $request->data['roleid']
                ),
            ]);
        } catch (\RuntimeException $e) {
            return $this->respondError(
                'Local normalisation error: ' . $e->getMessage()
            );
        }

        return $next($request);
    }
}
