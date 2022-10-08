<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AdminController extends Controller
{
    function addStudent(Request $request) {
        $request->validate([
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

        return response()->json([
            "status" => 1,
            "message" => "User registered successfully"
        ], 200);
    }

    function addInstructor(Request $request) {
        $request->validate([
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

        return response()->json([
            "status" => 1,
            "message" => "User registered successfully"
        ], 200);
    }
    
}
