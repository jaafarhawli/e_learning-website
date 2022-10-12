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
use App\Http\Middleware\StudentAccess;
use Illuminate\Support\Facades\Auth;


class StudentController extends Controller
{

    // View all courses the student is enrolled in
    function viewStudentCourses($id) {
        $courses = Course::where('students','=',$id)->get();
        return $courses;
    }

    // View all assignments in the enrolled course
    function viewCourseAssignments($id) {
        $assignments = Assignment::where('course_id','=',$id)->get();
        return $assignments;
    }
    
    // View all announcements in the enrolled courses
    function viewAnnouncements($id) {
        $courses = Course::where('students','=',$id)->get();
        $course_ids = [];
        foreach($courses as $course) {
            array_push($course_ids, $course->_id);
        }
        $announcements = Announcement::whereIn('course_id', $course_ids)->orderBy('time', 'desc')->get();
        return $announcements;
    }

    // View all assignments for the all enrolled courses
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

    // Submit assignment 
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
