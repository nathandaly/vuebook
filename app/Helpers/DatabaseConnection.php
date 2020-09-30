<?php

namespace App\Helpers;

use RuntimeException;
use Dotenv\Dotenv;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

/**
 * Class DatabaseConnection
 * @package App\Helpers
 */
class DatabaseConnection
{
    /**
     * @param string $apiKey
     * @return bool
     */
    private static function loadClientConnection(string $apiKey): bool
    {
        if (!Storage::disk('connections')->exists($apiKey . '.env')) {
            $errorMessage = 'Missing database connection file '
                . $apiKey
                .'.env'
                . ' in '
                . Storage::disk('connections')->path('');

            if (!app()->environment('production')) {
                throw new RuntimeException($errorMessage);
            } else {
                Log::error($errorMessage);
                throw new RuntimeException('A connection error has been logged.');
            }
        }

        Dotenv::create(
            Storage::disk('connections')->path(''),
            $apiKey . '.env'
        )
        ->overload();

        return true;
    }

    /**
     * @param string $apiKey
     * @return mixed
     */
    public static function addConnection(string $apiKey)
    {
        self::loadClientConnection($apiKey);
        $connectionDetails = [];

        array_walk($_ENV, function ($value, $key) use (&$connectionDetails) {
            $prefix = 'CLIENT_DB_';

            if (substr($key, 0, strlen($prefix)) === $prefix) {
                $key = substr($key, strlen($prefix));
                $connectionDetails[strtolower($key)] = $value;
            }
        });

        config(['database.connections.' . $apiKey => [
            'driver'    => $connectionDetails['driver'] ?? 'mysql',
            'host'      => $connectionDetails['host'] ?? 'localhost',
            'database'  => $connectionDetails['database'],
            'port'      => $connectionDetails['port'] ?? 3306,
            'username'  => $connectionDetails['username'],
            'password'  => $connectionDetails['password'],
            'charset'   => $connectionDetails['charset'] ?? 'utf8',
            'collation' => $connectionDetails['collation'] ?? 'utf8_unicode_ci',
            'prefix'    => $connectionDetails['prefix'] ?? '',
            'strict'    => $connectionDetails['strict'] ?? false,
            'engine'    => $connectionDetails['engine'] ?? null,
        ]
        ]);

        return DB::connection($apiKey);
    }

    /**
     * @param string $apiKey
     */
    public static function setDefaultConnection(string $apiKey): void
    {
        if (!config()->has('database.connections.' . $apiKey)) {
            $errorMessage = 'Cannot set the database default to a non-existing connection.
                    Have you called DatabaseConnection::addConnection first?';

            if (!app()->environment('production')) {
                throw new \RuntimeException($errorMessage);
            } else {
                Log::error($errorMessage);
                throw new RuntimeException('Database connection not found.');
            }
        }

        config()->set('database.default', $apiKey);
    }
}
