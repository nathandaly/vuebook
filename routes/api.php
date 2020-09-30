<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::namespace('Api')->group(static function () {
    Route::middleware(['data.api', 'data.normalisation'])->group(static function () {
        /**
         * Settings routes
         */
        Route::get('settings', 'SettingsController@all');
        Route::get('settings/reactions', 'SettingsController@reactions');

        /**
         * Authentication routes
         */
        Route::get('login', 'AuthenticationController@login');

        /**
         * Centre routes
         */
        Route::get('centre', 'CentreController@read');

        /**
         * Profile routes
         */
        Route::get('profile', 'ProfileController@read');

        /**
         * Post routes
         */
        Route::get('posts', 'PostController@all');
        Route::get('posts/{id}', 'PostController@single');
        Route::post('posts/{id}/report/{user}', 'PostController@report');
        Route::post('posts/{id}/delete', 'PostController@delete');
        Route::post('posts/{id}/reportComment/{commentId}/{user}', 'PostController@reportComment');
        Route::post('posts/{id}/deleteComment/{commentId}', 'PostController@deleteComment');
        Route::post('posts/{id}/like/{user}', 'PostController@like');
        Route::post('posts/{id}/unlike/{user}', 'PostController@unLike');
        Route::post('posts/{id}/share/{user}', 'PostController@share');
        Route::get('posts/{id}/comments', 'PostController@comments');
        Route::post('posts/{id}/comments', 'PostController@createComment');
        Route::post('posts', 'PostController@create');
    });

    Route::get('profile/avatar/{ownerId}/{profileId}', 'ProfileController@getAvatar');
});
