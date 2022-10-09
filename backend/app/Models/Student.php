<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Student extends Eloquent
{
    use HasFactory;

    protected $connection='mongodb';
    protected $collection = 'students';

    protected $fillable = [
        'admin_id', 'courses', 'submissions'
    ];

}
