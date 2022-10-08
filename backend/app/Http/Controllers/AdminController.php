<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Admin;
use App\Models\Instructor;
use App\Models\Student;

class AdminController extends Controller
{
    function addAdmin(Request $request) {
        $request->validate([
            "name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required|min:8|",
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->type = 'admin';
        $user->save();

        $admin = new Admin();
        $admin->_id = $user->_id;
        $admin->students = [];
        $admin->instructors = [];
        $admin->courses = [];
        $admin->save();

        return response()->json([
            "status" => 1,
            "message" => "User registered successfully"
        ], 200);
    }

    function addStudent(Request $request) {
        $request->validate([
            "adder_id" => "required",
            "name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required|min:8|",
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->type = 'student';
        $user->save();

        $student = new Student();
        $student->_id = $user->_id;
        $student->courses = [];
        $student->submissions = [];
        $student->save();

        Admin::where('_id','=',$request->adder_id)->push('students', array( 'id' => $user->_id ));

        return response()->json([
            "status" => 1,
            "message" => "User registered successfully"
        ], 200);
    }

    function addInstructor(Request $request) {
        $request->validate([
            "admin_id" => "required",
            "name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required|min:8|",
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->type = 'instructor';
        $user->save();

        $instructor = new Instructor();
        $instructor->_id = $user->_id;
        $instructor->students = [];
        $instructor->courses = [];
        $instructor->announcements = [];
        $instructor->save();

        Admin::where('_id','=',$user->admin_id)->push('instructors', array( 'id' => $user->_id ));

        return response()->json([
            "status" => 1,
            "message" => "User registered successfully"
        ], 200);
    }
}
