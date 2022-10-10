<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use MongoDB\BSON\ObjectID;
use App\Models\User;
use App\Models\Instructor;
use App\Models\Student;
use App\Models\Course;

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
        $courses = viewStudentCourses($id);
        $assignments = [];
        foreach($courses as $course) {
            $assignment = viewCourseAssignments($course->_id);
            array_push($assignments, $assignment);
        }
        return $assignments;
    }
}
