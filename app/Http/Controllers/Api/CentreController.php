<?php

namespace App\Http\Controllers\Api;

use App\Group;
use App\Http\Requests\Api\DataRequest;
use GuzzleHttp\Client as HttpClient;
use Illuminate\Http\JsonResponse;

/**
 * Class CentreController
 * @package App\Http\Controllers\Api
 */
class CentreController extends ApiController
{
    /**
     * @param DataRequest $request
     * @return JsonResponse
     */
    public function read(DataRequest $request): JsonResponse
    {
        if (!$centre = $request->centre) {
            return $this->respondNotFound();
        }

        $centre->available_groups = Group::where([
            'centreid' => $centre->id,
            'deleted' => 0
        ])->get();

        return $this->respondSuccess($centre);
    }
}
