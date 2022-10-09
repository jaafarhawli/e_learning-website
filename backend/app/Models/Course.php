<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Course extends Eloquent
{
    use HasFactory;

    protected $connection='mongodb';
    protected $collection = 'courses';

    protected $fillable = [
        'admin_id','name', 'instructors', 'students', 'assignments'
    ];

}