<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\StudentController;

Route::group(["prefix"=> "v1"], function() {

    Route::post('login', [AuthController::class, "login"]);

    Route::group(["middleware" => "user"], function() {
        
        Route::group(["middleware" => "admin"], function() {
            // Admin functions
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
        });
        
        Route::group(["middleware" => "instructor"], function() {
            // Instructor functions
            Route::post('enroll_student', [InstructorController::class, "enrollStudent"]);
            
            Route::post('add_assignment', [InstructorController::class, "addAssignment"]);
            
            Route::post('add_announcement', [InstructorController::class, "addAnnouncement"]);
            
            Route::get('view_courses/{id}', [InstructorController::class, "viewCourses"]);
            
            Route::get('view_students_in_course/{id}', [InstructorController::class, "viewStudentsInCourse"]);
            
            Route::get('view_instructor_announcements/{id}', [InstructorController::class, "viewInstructorAnnouncements"]);
            
            Route::get('view_instructor_assignments/{id}', [InstructorController::class, "viewInstructorAssignments"]);
            
            Route::get('view_assignment_submissions/{id}', [InstructorController::class, "viewAssignmentSubmissions"]);
        });
        
        Route::group(["middleware" => "student"], function() {
            // Student functions
            Route::get('view_student_courses/{id}', [StudentController::class, "viewStudentCourses"]);
        
            Route::get('view_course_assignments/{id}', [StudentController::class, "viewCourseAssignments"]);
            
            Route::get('view_announcements/{id}', [StudentController::class, "viewAnnouncements"]);
            
            Route::get('view_assignments/{id}', [StudentController::class, "viewAssignments"]);
            
            Route::post('submit_assignment', [StudentController::class, "submitAssignment"]);
        });
    });
});

