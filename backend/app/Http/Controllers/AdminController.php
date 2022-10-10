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
        // $admin->students = [];
        // $admin->instructors = [];
        // $admin->courses = [];
        $admin->save();

        return response()->json([
            "status" => 1,
            "message" => "Admin added successfully"
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
        $student->admin_id = $request->admin_id;
        $student->courses = [];
        $student->submissions = [];
        $student->save();

        // Admin::where('_id','=',$request->admin_id)->push('students', array( 'id' => $user->_id ));

        return response()->json([
            "status" => 1,
            "message" => "Student added successfully"
        ], 200);
    }

    function addInstructor(Request $request) {
        $request->validate([
            "admin_id" => "required",
            "name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required|min:8|",
        ]);

        $instructor_email = User::where('email', '=', $request->email)->get();
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
        $instructor->admin_id = $request->admin_id;
        $instructor->courses = [];
        $instructor->save();

        // Admin::where('_id','=',$user->admin_id)->push('instructors', array( 'id' => $user->_id ));

        return response()->json([
            "status" => 1,
            "message" => "Instructor added successfully"
        ], 200);
    }
    
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

        // foreach ($request->instructors as $email) {
        //     $id = User::select('_id')->where('email', '=', $email)->where('type', '=', 'instructor')->get();
            
        //     if(count($id)>0) {
        //         array_push($instructors_ids,  array('id' => $id[0]->_id));
        //         Instructor::where('_id','=', $id[0]->_id)->push('courses', array( 'id' => $course->_id ));
        //     }
        // };

        // foreach ($request->students as $email) {
        //     $id = User::where('email', '=', $email)->where('type', '=', 'student')->get(['_id']);
        //     if(count($id)>0) {
        //         array_push($students_ids, array('id' => $id[0]->_id));
        //         Student::where('_id','=', $id[0]->_id)->push('courses', array( 'id' => $course->_id ));
        //     }
        // };

        // Admin::where('_id','=',$request->admin_id)->push('courses', array( 'id' => $course->_id ));

        return response()->json([
            "status" => 1,
            "message" => "Course added successfully",
        ], 200);
    }

    function assignInstructor(Request $request) {
        $request->validate([
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
            }
            Instructor::where('_id','=',$id)->push('courses', $request->course_id);
            Course::where('_id','=',$request->course_id)->push('instructors', $id);
        };

        return response()->json([
            "status" => 1,
            "message" => "Instructor assigned to course successfully",
        ], 200);
    }

    function viewInstructors () {
        $instructors = Instructor::all();

        foreach($instructors as $instructor) {
            $data = User::where('_id','=',$instructor->_id)->get(['name','email']);
            $instructor['name'] = $data[0]->name;
            $instructor['email'] = $data[0]->email;
        }
        
        return response()->json([
            "status" => 1,
            "data" => $instructors]);
    }

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
    
    function viewCourses () {
        $courses = Course::all();
        
        return response()->json([
            "status" => 1,
            "data" => $courses]);
    }
    
    function viewCourse ($id) {
        $course = Course::find($id);
        
        return response()->json([
            "status" => 1,
            "data" => $course]);
    }

    function removeStudent(Request $request) {
        $id = $request->id;
        $student = Student::find($id);
        if(!$student) {
            return response()->json([
                "message" => "Couldn't find the student"]);
        }
        $student->delete();

        $user = User::find($id);
        $user->delete();

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
