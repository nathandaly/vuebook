<?php

namespace App\Http\Middleware\Data;

use App\Helpers\DatabaseConnection;
use App\Http\Middleware\BaseApiMiddleware;
use Illuminate\Http\Request;
use Closure;

/**
 * Class Segregation
 * @package App\Http\Middleware
 */
class Segregation extends BaseApiMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Request  $request
     * @param  Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $apiKey = $request->data['api_key'] ?? null;

            if (!$apiKey) {
                return $this->respondError(
                    'Data segregation error: API Key was not present on get request.'
                );
            }

            // Add a new connection based on the API key and
            // set it to the default database connection.
            DatabaseConnection::addConnection($apiKey);
            DatabaseConnection::setDefaultConnection($apiKey);
        } catch (\RuntimeException $e) {
            return $this->respondError(
                'Data segregation error: ' . $e->getMessage()
            );
        } catch (\Exception $e) {
            return $this->respondError(
                'Data segregation error: ' . $e->getMessage()
            );
        }

        return $next($request);
    }
}
