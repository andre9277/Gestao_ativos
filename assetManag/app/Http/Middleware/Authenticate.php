<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        return $request->expectsJson() ? null : route('login');
    }

    public function handle($request, Closure $next, ...$guards)
    {

        //Antes de realizar a autenticação, vai ser configurada algumas opções:
    
        if($jwt = $request->cookie('jwt')){ //Aceder ao jwt através do cookie
            $request->headers->set('Authorization', 'Bearer ' . $jwt); //Colocado manualmente no header com o jwt
        }



        $this->authenticate($request, $guards);

        return $next($request);
    }
}
