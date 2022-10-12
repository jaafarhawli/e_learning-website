<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Middleware\AdminAccess;
use App\Models\User;
use App\Models\Admin;
use App\Models\Instructor;
use App\Models\Student;
use App\Models\Course;

class AdminController extends Controller
{
    // Add a new admin
    function addAdmin(Request $request) {
        $request->validate([
            "name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required|min:8|",
        ]);

        // Add to users table
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->type = 'admin';
        $user->save();

        // Add to admins table
        $admin = new Admin();
        $admin->_id = $user->_id;
        $admin->save();

        return response()->json([
            "status" => 1,
            "message" => "Admin added successfully"
        ], 200);
    }

    // Add a new student
    function addStudent(Request $request) {
        $request->validate([
            "admin_id" => "required",
            "name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required|min:8|",
        ]);

        // Add to users table
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->type = 'student';
        $user->save();

        // Add to students table
        $student = new Student();
        $student->_id = $user->_id;
        $student->admin_id = $request->admin_id;
        $student->courses = [];
        $student->submissions = [];
        $student->save();

        return response()->json([
            "status" => 1,
            "message" => "Student added successfully"
        ], 200);
    }

    // Add a new instructor
    function addInstructor(Request $request) {
        $request->validate([
            "admin_id" => "required",
            "name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required|min:8|",
        ]);

        // Add to users table
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->type = 'instructor';
        $user->save();

        // Add to ui==instructors table
        $instructor = new Instructor();
        $instructor->_id = $user->_id;
        $instructor->admin_id = $request->admin_id;
        $instructor->courses = [];
        $instructor->save();

        return response()->json([
            "status" => 1,
            "message" => "Instructor added successfully"
        ], 200);
    }
    
    // Add a new course
    function addCourse(Request $request) {
        $request->validate([
            "admin_id" => "required",
            "name" => "required|unique:courses",
        ]);

        $course = new Course();
        $course->name = $request->name;
        $course->admin_id = $request->admin_id;
        $course->students = [];
        $course->instructors = [];
        $course->assignments = [];
        $course->announcements = [];
        $course->save();

        return response()->json([
            "status" => 1,
            "message" => "Course added successfully",
        ], 200);
    }

    // Assign instructor/s to course
    function assignInstructor(Request $request) {
        $request->validate([
            "course_id" => "required",
            "instructors" => "required|array",
            "instructors.*"  => "required|string|distinct",
        ]);

        // Check if course exists in the database
        $course = Course::find($request->course_id);
        if(!$course) {
            return response()->json([
                "message" => "Course not found",
            ]); 
        };

        // Loop over instructors
        foreach ($request->instructors as $email) {
            // Get instructor id from the given email
            $id = User::where('email', '=', $email)->where('type', '=', 'instructor')->get(['_id']);
            $id = $id[0]->_id;
            
            // Loop over course instructors to make sure not to add duplicates 
            foreach($course->instructors as $instructor_id) {
                if($instructor_id['id']==$id) {
                    return response()->json([
                        "message" => "Instructor already assigned",
                    ]); 
                }
            }
            // Add course to instructors collection
            Instructor::where('_id','=',$id)->push('courses', $request->course_id);
            // Add instructor to courses collection
            Course::where('_id','=',$request->course_id)->push('instructors', $id);
        };

        return response()->json([
            "status" => 1,
            "message" => "Instructor assigned to course successfully",
        ], 200);
    }

    function viewAdmins () {
        $admins = Admin::all();
    
        return response()->json([
            "status" => 1,
            "data" => $admins]);
    }


    // View all instructors
    function viewInstructors () {
        $instructors = Instructor::all();
        // Add the name and email of each instructor to the result
        foreach($instructors as $instructor) {
            $data = User::where('_id','=',$instructor->_id)->get(['name','email']);
            $instructor['name'] = $data[0]->name;
            $instructor['email'] = $data[0]->email;
        }
        
        return response()->json([
            "status" => 1,
            "data" => $instructors]);
    }

    // View the selected instructor
    function viewInstructor($id) {
        $instructor = Instructor::find($id);
        if(!$instructor) {
            return response()->json([
                "message" => "Couldn't find the instructor"]);
        }
        $data = User::where('_id','=',$id)->get(['name','email']);
        $instructor['name'] = $data[0]->name;
        $instructor['email'] = $data[0]->email;

        return response()->json([
            "status" => 1,
            "data" => $instructor]);
    }
    
    // View all students
    function viewStudents () {
        $students = Student::all();

        foreach($students as $student) {
            $data = User::where('_id','=',$student->_id)->get(['name','email']);
            $student['name'] = $data[0]->name;
            $student['email'] = $data[0]->email;
        }
        
        return response()->json([
            "status" => 1,
            "data" => $students]);
    }

    // View selected student
    function viewStudent($id) {
        $student = Student::find($id);
        if(!$student) {
            return response()->json([
                "message" => "Couldn't find the student"]);
        }
        $data = User::where('_id','=',$id)->get(['name','email']);
        $student['name'] = $data[0]->name;
        $student['email'] = $data[0]->email;

        return response()->json([
            "status" => 1,
            "data" => $student]);
    }
    
    // View all courses
    function viewCourses () {
        $courses = Course::all();
        
        return response()->json([
            "status" => 1,
            "data" => $courses]);
    }
    
    // View selected course
    function viewCourse ($id) {
        $course = Course::find($id);
        
        return response()->json([
            "status" => 1,
            "data" => $course]);
    }

    // Remove selected student
    function removeStudent(Request $request) {
        $id = $request->id;
        $student = Student::find($id);
        if(!$student) {
            return response()->json([
                "message" => "Couldn't find the student"]);
        }
        // Delete from students table
        $student->delete();

        // Delete from users table
        $user = User::find($id);
        $user->delete();

        // Delete from courses table
        $courses = Course::all();
        foreach($courses as $course) {
            foreach($course->students as $student) {
                if($student['id']==$id) {
                    Course::where('_id','=',$course->_id)->pull('students', $student);
                }
            }       
        }
        return response()->json([
            "status" => 1,
            "message" => "Student Removed successfully",
        ], 200);
    }

    // Remove selected instructor
    function removeInstructor(Request $request) {
        $id = $request->id;
        $instructor = Instructor::find($id);
        if(!$instructor) {
            return response()->json([
                "message" => "Couldn't find the instructor"]);
        }
        $instructor->delete();

        $user = User::find($id);
        $user->delete();

        $courses = Course::all();
        foreach($courses as $course) {
            foreach($course->instructors as $instructor) {
                if($instructor['id']==$id) {
                    Course::where('_id','=',$course->_id)->pull('instructors', $instructor);
                }
            }       
        }
        return response()->json([
            "status" => 1,
            "message" => "Instructor removed successfully",
        ], 200);
    }
    
    // Remove selected course
    function removeCourse(Request $request) {
        $id = $request->id;
        $course = Course::find($id);
        if(!$course) {
            return response()->json([
                "message" => "Couldn't find the course"]);
        }
        $course->delete();

        $students = Student::all();
        foreach($students as $student) {
            foreach($student->courses as $course) {
                if($course['id']==$id) {
                    Student::where('_id','=',$student->_id)->pull('courses', $course);
                }
            }       
        }
        
        $instructors = Instructor::all();
        foreach($instructors as $instructor) {
            foreach($instructor->courses as $course) {
                if($course['id']==$id) {
                    Instructor::where('_id','=',$instructor->_id)->pull('courses', $course);
                }
            }       
        }
        return response()->json([
            "status" => 1,
            "message" => "Course removed successfully",
        ], 200);
    }
}
