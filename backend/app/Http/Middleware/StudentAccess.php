<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentAccess
{
    public function handle(Request $request, Closure $next)
    {
        if(auth()->user()->type == 'student'){
            return $next($request);
        }

        return response()->json(['You do not have permission to access this page.']);
    }
}
