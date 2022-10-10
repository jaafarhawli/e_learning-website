<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Assignment extends Eloquent
{
    use HasFactory;

    protected $connection='mongodb';
    protected $collection = 'assignments';

    protected $fillable = [
        'course_id', 'instructor_id', 'assignment_name', 'assignment_content', 'due_date', 'submissions'
    ];

}
