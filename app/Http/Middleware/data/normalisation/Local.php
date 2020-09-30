<?php

namespace App\Http\Middleware\data\normalisation;

use App\Local as LocalModel;
use App\Http\Middleware\BaseApiMiddleware;
use Closure;
use Illuminate\Http\Request;

/**
 * Class Local
 * @package App\Http\Middleware\data\normalisation
 */
class Local extends BaseApiMiddleware
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
            $localId = $request->data['localid'];
            $request->request->add([
                'local' => LocalModel::find($localId),
            ]);
        } catch (\RuntimeException $e) {
            return $this->respondError(
                'Local normalisation error: ' . $e->getMessage()
            );
        }

        return $next($request);
    }
}
