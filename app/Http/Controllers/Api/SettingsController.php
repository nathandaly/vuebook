<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Api\DataRequest;
use App\Reaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use GuzzleHttp\Exception\GuzzleException;

/**
 * Class SettingsController
 * @package App\Http\Controllers\Api
 */
class SettingsController extends ApiController
{
    public function all(Request $request)
    {
        $settings = [
            'reactions' => Reaction::all(),
            'pluginStyles' => $request->input('plugin_styles'),
        ];

        return $this->respondSuccess($settings);
    }

    /**
     * @param DataRequest $request
     * @return JsonResponse
     * @throws GuzzleException
     */
    public function reactions(DataRequest $request): JsonResponse
    {
        return $this->respondSuccess(Reaction::all());
    }
}
