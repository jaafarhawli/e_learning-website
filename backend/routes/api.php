<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\InstructorController;

Route::group(["prefix"=> "v1"], function() {

    Route::post('login', [AuthController::class, "login"]);
    
    Route::post('logout', [AuthController::class, "logout"]);


    
    
    Route::post('add_admin', [AdminController::class, "addAdmin"]);
    
    Route::post('add_student', [AdminController::class, "addStudent"]);
    
    Route::post('remove_student', [AdminController::class, "removeStudent"]);
    
    Route::post('add_instructor', [AdminController::class, "addInstructor"]);
    
    Route::post('remove_instructor', [AdminController::class, "removeInstructor"]);
    
    Route::post('add_course', [AdminController::class, "addCourse"]);
    
    Route::post('remove_course', [AdminController::class, "removeCourse"]);
    
    Route::post('assign_instructor', [AdminController::class, "assignInstructor"]);
    
    Route::get('view_instructors', [AdminController::class, "viewInstructors"]);
    
    Route::get('view_instructor/{id}', [AdminController::class, "viewInstructor"]);
    
    Route::get('view_students', [AdminController::class, "viewStudents"]);
    
    Route::get('view_student/{id}', [AdminController::class, "viewStudent"]);
    
    Route::get('view_courses', [AdminController::class, "viewCourses"]);
    
    Route::get('view_course/{id}', [AdminController::class, "viewCourse"]);
    
    
    
    
    Route::post('assign_student', [InstructorController::class, "assignStudentToCourse"]);
    
    Route::post('add_assignment', [InstructorController::class, "addAssignment"]);
    
    Route::post('add_announcement', [InstructorController::class, "addAnnouncement"]);

    Route::group(["middleware" => "auth:api"], function() {});

});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
