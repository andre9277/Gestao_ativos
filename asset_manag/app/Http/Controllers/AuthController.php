<?php

//Controlador que permite implementar a lógica de autenticação
namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Método que permite o Registo de um novo user
    public function register(RegisterRequest $request)
    {
        //Primeiro realiza a validação:
        $data = $request->validated();

        //De seguida, cria um user com dados válidos
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']), //guarda a password de forma segura(encriptada)
        ]);

        $token = $user->createToken('auth_token')->plainTextToken; //createToken: cria um acesso ao token pessoal, utilizado em futuros API requests.

        //Token é utilizado para criar um HTTP cookie que retorna a resposta, com o token e dados do user em JSON object
        $cookie = cookie('token', $token, 60 * 24); // Expira em 1 dia

        return response()->json([
            'user' => new UserResource($user), //UserResource transforma os dados do user em formatos apropriados para a resposta
        ])->withCookie($cookie);

        //Permite ao user manter o status da autenticação entre multiplos requests sem ter de incluir o token de acesso em cada request.
        //O token de acesso é guardado em um HTTP cookie que é enviado automaticamente em cada request
    }

    //Método que permite login do user
    public function login(LoginRequest $request)
    {
        //valida o request utilizando o LoginRequest (contem as regras de validação)
        $data = $request->validated();

        //Tenta encontrar um user com o email recebido
        $user = User::where('email', $data['email'])->first();

        //Se user não for encontrado ou password incorreta 
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => 'Email or password is incorrect!'
            ], 401);
        }

        //Caso ocorra com sucesso é criado um novo personal access token para o user
        $token = $user->createToken('auth_token')->plainTextToken;

        //cria um HTTP cookie que retorna a resposta, com o token e dados do user como um JSON object
        $cookie = cookie('token', $token, 60 * 24); // Cookie expira em 1 dia

        return response()->json([
            'user' => new UserResource($user),
        ])->withCookie($cookie);
        //Permite ao user manter o status da autenticação entre multiplos requests sem ter de incluir o token de acesso em cada request.
        //O token de acesso é guardado em um HTTP cookie que é enviado automaticamente em cada request
    }

    //Método que permite o logout 
    public function logout(Request $request)
    {
        //Request com uma sessão válida de um user e um access token associado
        $request->user()->currentAccessToken()->delete(); //tem acesso ao token e apaga-o de seguida

        //Quando token é eliminado , cria um novo HTTP cookie que faz com que o browser do user exclua o cookie de token de acesso existente
        $cookie = cookie()->forget('token');

        //Retorna caso o user tenha realizado o logged out com sucesso
        return response()->json([
            'message' => 'Logged out successfully!'
        ])->withCookie($cookie);

        //Assegura que o user access token é imediatamente revocado quando realiza o logout, e que todos os tokens existentes são apagados do users browser
    }

    //Método que permite a autenticação de um utilizador
    public function user(Request $request)
    {
        //retorna os dados do user autenticado
        return new UserResource($request->user());
    }
}
