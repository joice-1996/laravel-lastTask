<?php

namespace App\Http\Middleware;

use Closure;

class newMiddileware
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (isset($request->user()->user_type) && $request->user()->user_type == 'admin') {
            return $next($request);
        }

        return redirect('/');
    }
}
