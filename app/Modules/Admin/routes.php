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
Route::group(['prefix' => 'admin',  'module' => 'admin', 'namespace' => 'App\Modules\Admin\Controllers'], function () {
    Route::get('/','AdminController@index');
    Route::post('logsearch','AdminController@logsearch');
    Route::get('dashboard','AdminController@dashboard');
    Route::get('logout','AdminController@logout');
});
});