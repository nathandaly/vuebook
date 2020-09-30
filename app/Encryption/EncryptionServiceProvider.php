<?php

namespace App\Encryption;

use Illuminate\Support\Str;
use Illuminate\Encryption\EncryptionServiceProvider as BaseEncryptionServiceProvider;

/**
 * Class EncryptionServiceProvider
 *
 * @package App\Encryption
 */
class EncryptionServiceProvider extends BaseEncryptionServiceProvider
{
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register(): void
    {
        $this->app->singleton('encrypter', function ($app) {
            $config = $app->make('config')->get('app');

            // If the key starts with "base64:", we will need to decode the key before handing
            // it off to the encrypter. Keys may be base-64 encoded for presentation and we
            // want to make sure to convert them back to the raw bytes before encrypting.
            if (Str::startsWith($key = $this->key($config), 'base64:')) {
                $key = base64_decode(substr($key, 7));
            }

            return new Encrypter($key, $config['cipher']);
        });
    }
}
