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
}
