<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{

    public function register(Request $request){
        return User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password'))
        ]);
       /*  return $user; */
    }

    public function login(Request $request){
        //se login ocorrer sem sucesso, vai retornar a resposta
        if(!Auth::attempt($request->only('email','password'))){
            return response([
                'message' => 'Invalid credentials!'
            ], Response::HTTP_UNAUTHORIZED);
        }
        
        //Quanto tem autorização, retornamos o utilizador
        $user = Auth::user();

        //Token vai criar um token obj e transformar em string
        $token = $user->createToken('token')->plainTextToken;

        //criar cookies para armazenar os tokens: (jwt:JSON Web Token)
        $cookie = cookie('jwt', $token, 60*24); //1 day

        return response([
            'message' => 'success'
        ])->withCookie($cookie); //return a cookie para o frontend que não consegue fazer nada com o cookie e visualizamos só a mensagem com Sucesso!
    }

    //Autenticação do utilizador:
    public function user(){
        return Auth::user();;
    }

    public function logout(){
        $cookie = Cookie::forget('jwt');

        return response([
            'message' => 'Success'
        ])->withCookie($cookie); //só o backend consegue eliminar o cookie 

        
    }
}
