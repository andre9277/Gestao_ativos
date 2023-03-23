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


    //Responsável por autenticar users
    public function handle($request, Closure $next, ...$guards)
    {
        //Verifica se o token existe no request cookie
        if ($token = $request->cookie('token')) {
            //Se token é encpntrado, é adicionado ao request header
            $request->headers->set('Authorization', 'Bearer ' . $token);
        }

        //Realiza a autenticação do request (permite que prossiga para o middleware ou para o método Controller)
        $this->authenticate($request, $guards);

        return $next($request);
    }
}
