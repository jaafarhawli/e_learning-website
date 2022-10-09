<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Instructor;
use App\Models\Student;
use App\Models\Course;

class InstructorController extends Controller
{
    function enrollStudent(Request $request) {
        $request->validate([
            "course_id" => "required",
            "students" => "required|array",
            "students.*"  => "required|string|distinct",
        ]);
        $course = Course::find($request->course_id);
        if(!$course) {
            return response()->json([
                "message" => "Course not found",
            ]); 
        };
        
        foreach ($request->students as $email) {
            $id = User::where('email', '=', $email)->where('type', '=', 'student')->get(['_id']);
            $id = $id[0]->_id;
        
            foreach($course->students as $student_id) {
                if($student_id['id']==$id) {
                    return response()->json([
                        "message" => "Student already assigned",
                        "data" => $email,
                    ]); 
                }
                Student::where('_id','=',$id)->push('courses', $request->course_id);
            }
            Course::where('_id','=',$request->course_id)->push('students', $id);
        };

        return response()->json([
            "status" => 1,
            "message" => "Student assigned successfully",
        ], 200);
    }

    function addAssignment(Request $request) {
        $request->validate([
            "course_id" => "required",
            "assignment_name" => "required",
            "assignment_content" => "required|string",
            "due_date"  => "required|date_format:Y-m-d",
        ]);

        $course_id = $request->course_id;
        $name = $request->assignment_name;
        $assignment = $request->assignment_content;
        $due = $request->due_date;

        $assignments = Course::where('_id','=',$course_id)->get(['assignments']);
        foreach($assignments[0]->assignments as $element) {
            if($element['name'] == $name) {
                return response()->json([
                    "message" => "Assignment already exists",
                ],);
            }
        }
        Course::where('_id','=',$course_id)->push('assignments', array( 'name' => $name, 'content' => $assignment, 'due' => $due ));

        return response()->json([
            "status" => 1,
            "message" => "Assignment added successfully",
        ], 200);
    }
    
    function addAnnouncement(Request $request) {
        $request->validate([
            "course_id" => "required",
            "title" => "required",
            "announcement_content" => "required",
        ]);

        $course_id = $request->course_id;
        $title = $request->title;
        $content = $request->announcement_content;
        $time = date('Y-m-d h:i:s');

        Course::where('_id','=',$course_id)->push('announcements', array( 'content' => $content, 'title' => $title, 'time' => $time ));

        return response()->json([
            "status" => 1,
            "message" => "Announcement added successfully",
        ], 200);
    }

    function viewCourses($id) {
        $courses = Course::where('instructors','=',$id)->get();
        return $courses;
    }
}
