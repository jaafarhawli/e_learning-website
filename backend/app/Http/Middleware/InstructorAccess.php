<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class InstructorAccess
{
    public function handle(Request $request, Closure $next)
    {
        if(auth()->user()->type == 'instructor'){
            return $next($request);
        }

        return response()->json(['You do not have permission to access this page.']);
    }
}
