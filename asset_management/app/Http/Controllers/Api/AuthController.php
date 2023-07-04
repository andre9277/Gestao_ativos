<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;



class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {

        $this->authorize('create-delete-users');

        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'mec' => $data['mec'],
            'email' => $data['email'],
            'role_id' => $data['role_id'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->only('mec', 'email', 'password', 'pin');

        $user = null;
        if (isset($credentials['mec'])) {
            $user = User::where('mec', $credentials['mec'])->first();
        } elseif (isset($credentials['email'])) {
            $user = User::where('email', $credentials['email'])->first();
        }

        if (!$user) {
            return response([
                'message' => 'Atenção! Introduza um endereço de email ou número mec válido e a respetiva password ou PIN!'
            ], 422);
        }

        if (isset($credentials['password'])) {
            if (!Auth::attempt(['id' => $user->id, 'password' => $credentials['password']])) {
                return response([
                    'message' => 'Atenção! A password não é válida!'
                ], 422);
            }
        } elseif (isset($credentials['pin'])) {
            if ($user->pin !== $credentials['pin']) {
                return response([
                    'message' => 'Atenção! O PIN não é válido!'
                ], 422);
            }
        } else {
            return response([
                'message' => 'Atenção! Introduza uma password ou PIN válido!'
            ], 422);
        }

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }



    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
