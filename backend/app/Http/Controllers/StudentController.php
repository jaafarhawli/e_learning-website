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
        $assignments = Course::where('_id','=',$id)->get('assignments');
        return $assignments;
    }
}
