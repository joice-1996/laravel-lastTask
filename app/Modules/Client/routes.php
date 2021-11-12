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

Route::group(['prefix' =>'client',  'module' =>'client', 'namespace' => 'App\Modules\Client\Controllers'], function () {
    Route::get('/','ClientController@index');
    Route::get('get_product','ClientController@get_product');
    Route::post('add_client','ClientController@add_client');
    Route::get('clientdetails','ClientController@clientdetails');

});