<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use MongoDB\BSON\ObjectID;
use App\Models\User;
use App\Models\Instructor;
use App\Models\Student;
use App\Models\Course;
use App\Models\Assignment;
use App\Models\Announcement;
use App\Models\Submission;

class StudentController extends Controller
{
    function viewStudentCourses($id) {
        $courses = Course::where('students','=',$id)->get();
        return $courses;
    }

    function viewCourseAssignments($id) {
        $assignments = Assignment::where('course_id','=',$id)->get();
        return $assignments;
    }
    
    function viewAnnouncements($id) {
        $courses = Course::where('students','=',$id)->get();
        $announcements = [];
        foreach($courses as $course) {
            $announcement = Announcement::where('course_id','=', $course->_id);
            if($announcement) {
                array_push($announcements, $announcement);
            }
        }
        return $announcements;
    }

    function viewAssignments($id) {
        $courses = Course::where('students','=',$id)->get();
        $assignments = [];
        foreach($courses as $course) {
            $assignment = Assignment::where('course_id','=', $course->_id);
            if($assignment) {
                array_push($assignments, $assignment);
            }
        }
        return $assignments;
    }

    function submitAssignment(Request $request) {
        $request->validate([
            "assignment_id" => "required",
            "student_id" => "required",
            "submission_file"  => "required",
        ]);

        $time = date('Y-m-d h:i:s');

        $submission = new Submission();
        $submission->assignment_id = $request->assignment_id;
        $submission->student_id = $request->student_id;
        $submission->submission_file = $request->submission_file;
        $submission->time = $time;
        $user->save();

        Student::where('_id','=',$request->student_id)->push('submissions', $submission->_id);
        Assignment::where('_id','=',$request->assignment_id)->push('submissions', $submission->_id);

        return response()->json([
            "status" => 1,
            "message" => "Submission added successfully",
        ], 200);
    }
    
}
