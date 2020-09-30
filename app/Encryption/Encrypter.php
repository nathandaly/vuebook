<?php

namespace App\Encryption;

use Illuminate\Encryption\Encrypter as BaseEncrypter;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Contracts\Encryption\Encrypter as EncrypterContract;

use function openssl_decrypt;
use function parse_str;
use function str_replace;
use function explode;

/**
 * Class Encrypter
 *
 * @package App\Encryption
 */
class Encrypter extends BaseEncrypter implements EncrypterContract
{
    /**
     * Decrypt the given value.
     *
     * @param mixed $payload
     * @param bool $unserialize
     * @param bool $dataString
     * @return array|mixed
     */
    public function decrypt($payload, $unserialize = true, $dataString = false)
    {
        if (!$dataString) {
            return parent::decrypt($payload, $unserialize);
        }

        $decryptedArray = [];
        $payload = $this->decodePayload($payload);

        if (!env('DATA_DECRYPTION_KEY')) {
            throw new \RuntimeException(
                'Environment variable \'DATA_DECRYPTION_KEY\' is not set.'
            );
        }

        $this->hashPackKey(
            env('DATA_DECRYPTION_KEY'),
            $payload['salt']
        );

        // Here we will decrypt the value. If we are able to successfully decrypt it
        // we will then unserialize it and return it out to the caller. If we are
        // unable to decrypt this value we will throw out an exception message.
        $decryptedString = openssl_decrypt(
            $payload['value'],
            $this->cipher,
            $this->key,
            OPENSSL_NO_PADDING,
            $payload['iv']
        );

        if ($decryptedString === false) {
            throw new DecryptException('Could not decrypt the data.');
        }

        parse_str(trim($decryptedString), $decryptedArray);
        unset($decryptedArray['padding']);

        return $decryptedArray ?? [];
    }

    /**
     * Decrypt the given data string.
     *
     * @param  string  $payload
     * @return array
     */
     public function decryptDataString($payload): array
     {
         try {
             return $this->decrypt($payload, false, true);
         } catch (\Exception $e) {
             return $this->decrypt(urldecode($payload), false, true);
         }
     }

    /**
     * @param string $password
     * @param string $salt
     * @return void
     */
    protected function hashPackKey(string $password, string $salt): void
    {
        $key = hash_pbkdf2('sha256', $password, $salt,10000,64);
        $this->key = pack('H*', $key);
    }

    /**
     * @param string $payload
     * @return array
     */
    protected function decodePayload(string $payload): array
    {
        $payload = str_replace(' ', '+', $payload);

        list($iv, $salt, $value) = explode('-', $payload);

        $iv = base64_decode($iv);
        $salt = base64_decode($salt);
        $value = base64_decode($value);

        return compact('iv', 'salt', 'value');
    }
}
