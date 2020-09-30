<?php


namespace App\Http\Middleware;

use Illuminate\Http\JsonResponse;

/**
 * Class BaseApiMiddleware
 * @package App\Http\Middleware
 */
class BaseApiMiddleware
{
    /**
     * @param string $message
     * @param int $errorCode
     * @param int $statusCode
     * @return JsonResponse
     */
    public function respondError(string $message, int $errorCode = 0, int $statusCode = 401): JsonResponse
    {
        return response()->json([
            'error' => [
                'message' => $message,
                'error_code' => $errorCode,
                'status_code' => $statusCode
            ]
        ], $statusCode);
    }
}
