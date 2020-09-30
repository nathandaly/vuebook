<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

class User
{
    public $id;

    public function __construct($id)
    {
        $this->id = $id;
    }
}

Route::get('event-example', function () {
    \App\Events\NewUserRegisteredExample::dispatch(new User(rand(1, 100)));

    return response()->json([
        'message' => 'Broadcasting example.'
    ]);
});

Route::group(['middleware' => ['data.api']], function () {
    Route::get('/{any}', 'SpaController@index')->where('any', '.*');
});
