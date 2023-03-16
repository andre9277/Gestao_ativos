<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request){
        $credentials = $request->validated(); //credentials é um array que possui email e password

        //se as credenciais que o utilizador introduz para o login não forem bem sucedidas
        if(!Auth::attempt($credentials)){
            return response([
                'message' => 'O email e a password estão incorretos!'

            ]);
        }
        /** @var User $user */
        //se ocorrer com sucesso, queremos aceder as informaçoes do utilizador
        $user = Auth::user();
        $user->createToken('main')->plainTextToken;
        return response(compact('user','token'));
    }

    public function register(RegisterRequest $request){
        //dados do pedido
        $data = $request->validated();
        
        /** @var \App\Models\User $user */

        //Cria um user:
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']), //Por razões de segurança a pass é encriptada
        ]);

        //Dá um nome ao token(main) e é plainText
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user','token'));
    }

    public function logout(Request $request){
        /** @var User $user */
        $user = $request->user();
        //Apagar o token do utilizador
        $user->currentAccessToken()->delete();

        //Retorna nada por não precisar e com o código 204: resposta realizada com sucesso
        return response('',204)
    }
}
