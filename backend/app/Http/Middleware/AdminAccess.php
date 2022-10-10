<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminAccess
{
    public function handle(Request $request, Closure $next)
    {
        if(auth()->user()->type == 'admin'){

            return $next($request);

        }
        return response()->json(['You do not have permission to access this page.']);
    }
}
