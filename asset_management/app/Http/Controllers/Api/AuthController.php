<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\Allocation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
            'pin' => bcrypt($data['pin']),
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
                'message' => 'Atenção! Introduza um endereço de email ou número mec válido!'
            ], 422);
        }

        if (isset($credentials['password']) && !Hash::check($credentials['password'], $user->password)) {
            return response([
                'message' => 'Atenção! A password está incorreta!'
            ], 422);
        }

        if (isset($credentials['pin']) && !Hash::check($credentials['pin'], $user->pin)) {
            return response([
                'message' => 'Atenção! O PIN está incorreto!'
            ], 422);
        }

        $token = $user->createToken('main')->plainTextToken;

        // Create a new allocation record for the user
        $allocation = new Allocation([
            'allocation_date' => now(),
            'ser_number' => "",
            'action_type' => 'Log in',
            'user_id' => $user->id
        ]);
        $allocation->save();

        return response(compact('user', 'token'));
    }



    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        // Create a new allocation record for the user
        $allocation = new Allocation([
            'allocation_date' => now(),
            'ser_number' => "",
            'action_type' => 'Log out',
            'user_id' => $user->id
        ]);
        $allocation->save();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
