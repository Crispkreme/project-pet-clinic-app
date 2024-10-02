<?php

use App\Http\Controllers\HomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/home', [HomeController::class, 'getUserData']);
Route::middleware('auth:sanctum')->get('/messages', [HomeController::class, 'messages']);
Route::middleware('auth:sanctum')->get('/message', [HomeController::class, 'message']);