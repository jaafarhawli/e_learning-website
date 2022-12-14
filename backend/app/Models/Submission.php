<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Submission extends Eloquent
{
    use HasFactory;

    protected $connection='mongodb';
    protected $collection = 'submissions';

    protected $fillable = [
        'assignment_id', 'student_id', 'submission_file', 'time'
    ];

}