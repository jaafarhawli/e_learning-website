<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;

Route::group(["prefix"=> "v1"], function() {

    Route::post('login', [AuthController::class, "login"]);
    
    Route::post('logout', [AuthController::class, "logout"]);
    
    Route::post('add_student', [AdminController::class, "addStudent"]);
    
    Route::post('add_instructor', [AdminController::class, "addInstructor"]);

    Route::group(["middleware" => "auth:api"], function() {});

});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
