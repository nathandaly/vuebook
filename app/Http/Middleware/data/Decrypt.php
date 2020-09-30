<?php

namespace App\Http\Middleware\Data;

use App\Facades\Crypt;
use App\Http\Middleware\BaseApiMiddleware;
use Closure;
use Illuminate\Http\Request;

/**
 * Class Decrypt
 *
 * @package App\Http\Middleware\Data
 */
class Decrypt extends BaseApiMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (!$data = $request->get('data')) {
            return $this->respondError('Data error: Data param was not present on get request.');
        }

        $decryptedData = Crypt::decryptDataString($data);

        $request->request->add([
            'raw_data' => $data,
            'data'    => $decryptedData,
        ]);

        return $next($request);
    }
}
