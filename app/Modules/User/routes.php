<?php
/*
|--------------------------------------------------------------------------
| ModuleOne Module Routes
|--------------------------------------------------------------------------
|
| All the routes related to the ModuleOne module have to go in here. Make sure
| to change the namespace in case you decide to change the
| namespace/structure of controllers.
|
 */
Route::group(['middleware' =>['web']],function(){

Route::group(['prefix' =>'user', 'middleware' => 'newMiddileware',  'module' =>'user', 'namespace' => 'App\Modules\User\Controllers'], function () {
    Route::get('/','UserController@index');
    Route::post('add_user','UserController@add_user');
    Route::post('user_delete/{id}','UserController@user_delete');
    Route::post('user_update_view/{id}','UserController@user_update_view');
    Route::post('update_user','UserController@update_user');
});
});

