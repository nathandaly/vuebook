<?php

namespace App\Helpers;

use RuntimeException;
use Dotenv\Dotenv;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Goutte\Client;

use function explode;
use function end;
use function sprintf;
use function time;
use function strtolower;
use function trim;
use function base64_decode;

/**
 * Class MediaProcessor
 * @package App\Helpers
 */
class MediaProcessor
{
    /**
     * @param string $base64image
     * @param int $centreid
     * @return string
     */
    public function base64ImageToAWS(string $base64image_raw, int $centreid): string
    {
        $image_explode = explode(';', $base64image_raw);
        $base64image = str_replace('base64,', '', $image_explode[1]);
        $content_type = explode(':', $image_explode[0]);
        $content_type = end($content_type);
        $file_type = explode('/', $content_type);
        $file_type = end($file_type);

        $code_length = 4;
        $code1 = Str::random($code_length);
        $code2 = Str::random($code_length);

        $filename = sprintf(
            '%s_%s_%s.%s',
            $code1,
            time(),
            $code2,
            strtolower($file_type)
        );

        $ownerid = request('centre')->ownerid;
        $location = 'files';
        if (env('S3_SEGREGATED')) {
            $uri = sprintf(
                'uploads/o%d/%d/%s/%s', 
                $ownerid, 
                $centreid, 
                $location, 
                trim($filename,'/')
            );
        } else {
            $uri = sprintf(
                'uploads/%d/%s/%s', 
                $centreid, 
                $location, 
                trim($filename,'/')
            );
        }

        Storage::disk('s3')->put($uri, base64_decode($base64image), 'public');
        
        return $filename;
    }
    
    /**
     * @param object $postmedia
     * @param int $centreid
     * @return object
     */
    public function postMediaURLs(object $postmedia, int $centreid): object
    {
        foreach ($postmedia as $index => $media) {
            if ($media['deleted'] == 1 || $media['media']['deleted'] == 1) {
                unset($postmedia[$index]);
            }
            else {
                $ownerid = request('centre')->ownerid;
                $location = 'files';
                $filename = $media['media']['filename'];
                
                if (env('S3_SEGREGATED')) {
                    $uri = sprintf(
                        'uploads/o%d/%d/%s/%s', 
                        $ownerid, 
                        $centreid, 
                        $location, 
                        trim($filename,'/')
                    );
                } else {
                    $uri = sprintf(
                        'uploads/%d/%s/%s', 
                        $centreid, 
                        $location, 
                        trim($filename,'/')
                    );
                }
                
                $postmedia[$index]->url = Storage::disk('s3')->url($uri);
            }
        }
        
        return $postmedia;
    }

}
