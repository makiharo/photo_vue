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

// 写真ダウンロード
Route::get('/photos/{photo}/download', 'PhotoController@download');

// APIのURL以外のリクエストに対してはindexテンプレートを返す
// 画面遷移はフロントエンドのVueRouterが制御する
// ?でURL指定なくてもいいとしている
// whereでanyに何か入ってもindexに渡すと指定
Route::get('/{any?}', function () {
    return view('index');
})->where('any', '.+');
