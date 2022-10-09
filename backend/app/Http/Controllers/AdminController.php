<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Admin;
use App\Models\Instructor;
use App\Models\Student;
use App\Models\Course;

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
            "admin_id" => "required",
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

        Admin::where('_id','=',$request->admin_id)->push('students', array( 'id' => $user->_id ));

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

        $instructor_email = User::where('email', '=', $request->email);
        if(count($instructor_email)>0) {
            return response()->json([
                "message" => "Email already exists in the database",
            ]); 
        }

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
    
    function addCourse(Request $request) {
        $request->validate([
            "admin_id" => "required",
            "name" => "required|unique:courses",
            "instructors" => "required|array",
            "instructors.*"  => "required|string|distinct",
            "students" => "required|array",
            "students.*"  => "required|string|distinct",
        ]);

        $instructors_ids = [];
        $students_ids = [];

        foreach ($request->instructors as $email) {
            $id = User::select('_id')->where('email', '=', $email)->where('type', '=', 'instructor')->get();
            
            if(count($id)>0) {
                array_push($instructors_ids,  array('id' => $id[0]->_id));
            }
        };

        foreach ($request->students as $email) {
            $id = User::where('email', '=', $email)->where('type', '=', 'student')->get(['_id']);
            if(count($id)>0) {
                array_push($students_ids, array('id' => $id[0]->_id));
            }
        };

        $course = new Course();
        $course->name = $request->name;
        $course->students = $students_ids;
        $course->instructors = $instructors_ids;
        $course->assignments = [];
        $course->save();

        Admin::where('_id','=',$request->admin_id)->push('courses', array( 'id' => $course->_id ));

        return response()->json([
            "status" => 1,
            "message" => "User registered successfully",
        ], 200);
    }

    function assignInstructor(Request $request) {
        $request->validate([
            "admin_id" => "required",
            "course_id" => "required",
            "instructors" => "required|array",
            "instructors.*"  => "required|string|distinct",
        ]);
        $course = Course::find($request->course_id);
        if(!$course) {
            return response()->json([
                "message" => "Course not found",
            ]); 
        };

        foreach ($request->instructors as $email) {
            $id = User::where('email', '=', $email)->where('type', '=', 'instructor')->get(['_id']);
            $id = $id[0]->_id;
            
            foreach($course->instructors as $instructor_id) {
                if($instructor_id['id']==$id) {
                    return response()->json([
                        "message" => "Instructor already assigned",
                    ]); 
                }
                Instructor::where('_id','=',$id)->push('courses', array( 'id' => $request->course_id ));
            }
            Course::where('_id','=',$request->course_id)->push('instructors', array( 'id' => $id[0]->_id ));
        };

        return response()->json([
            "status" => 1,
            "message" => "User registered successfully",
        ], 200);
    }
}
