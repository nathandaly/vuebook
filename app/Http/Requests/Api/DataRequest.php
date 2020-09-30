<?php

namespace App\Http\Requests\Api;

/**
 * Class DataRequest
 *
 * @package App\Http\Request\Api
 */
class DataRequest extends ApiRequest
{
    /**
     * @return array
     */
    public function validationData(): array
    {
        return $this->get('data') ?: [];
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'localid' => 'required|string',
            'centreid' => 'required|string',
            'categoryid' => 'required|string',
            'roleid' => 'required|string',
            'profileid' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'profileid.required' => 'No profile id found in the data string.'
        ];
    }
}
