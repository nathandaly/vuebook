<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Http\Requests\Api\DataRequest;
use App\Traits\ApiV4Trait;
use Illuminate\Http\JsonResponse;

/**
 * Class ProfileController
 * @package App\Http\Controllers\Api
 */
class ProfileController extends ApiController
{
    use ApiV4Trait;

    /**
     * @param DataRequest $request
     * @return JsonResponse
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function read(DataRequest $request): JsonResponse
    {
        if (!$profile = $request->profile) {
            return $this->respondNotFound();
        }

        $profile->with('local');

        return $this->respondSuccess($profile);
    }

    /**
     * @param string $ownerId
     * @param string $profileId
     * @return JsonResponse
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function getAvatar(string $ownerId, string $profileId): JsonResponse
    {
        try {
            if ('' === ($avatarUrl = $this->getAvatarUrl($ownerId, $profileId))) {
                return $this->respondNotFound();
            }
        } catch (Exception $e) {
            return $this->respondNotFound();
        }

        return $this->respond($avatarUrl);
    }
}
