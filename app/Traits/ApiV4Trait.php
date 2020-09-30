<?php

namespace App\Traits;

use GuzzleHttp\Client as HttpClient;

/**
 * Trait ApiV4Trait
 * @package App\Traits
 */
trait ApiV4Trait
{
    /**
     * @param string $ownerId
     * @param string $profileId
     * @return string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    protected function getAvatarUrl(string $ownerId, string $profileId): string
    {
        $result = '';

        try {
            $client = new HttpClient();
            $response = $client->request('GET', env('API_V4_URL') . '/profile/avatar', [
                'query' => [
                    'owner-id' => $ownerId,
                    'profile-id' => $profileId,
                ]
            ]);
        } catch (\Exception $e) {
            return $result;
        }

        $content = json_decode($response->getBody()->getContents(), true);

        if (!is_array($content['results']) && !empty($content['results'])) {
            $result = $content['results'];
        }

        if (!empty($content['results']['profile_url'])) {
            $result = $content['results']['profile_url'];
        }

        return $result;
    }
}
