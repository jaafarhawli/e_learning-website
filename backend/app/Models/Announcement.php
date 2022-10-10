<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Announcement extends Eloquent
{
    use HasFactory;

    protected $connection='mongodb';
    protected $collection = 'announcements';

    protected $fillable = [
        'course_id', 'instructor_id', 'title', 'announcement_content', 'time'
    ];

}
