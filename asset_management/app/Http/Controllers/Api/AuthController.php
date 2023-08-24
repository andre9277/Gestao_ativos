<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\Allocation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;


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
        //---------Version of MySQL:---------
        /* $version = DB::select('SELECT version()')[0]->{'version()'};
        echo "Version MySQL: " . $version; */

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

        if ($user->blocked) {
            return response([
                'message' => 'Atenção! A sua conta está bloqueada!'
            ], 422);
        }

        $isPasswordCorrect = isset($credentials['password']) && Hash::check($credentials['password'], $user->password);
        $isPinCorrect = isset($credentials['pin']) && Hash::check($credentials['pin'], $user->pin);

        if (!$isPasswordCorrect && !$isPinCorrect) {
            $user->login_attempts++;
            $user->save();

            // Check if the user account should be blocked
            if ($this->hasExceededMaxLoginAttempts($user)) {
                $this->blockUserAccount($user);
                return response([
                    'message' => 'Atenção! A sua conta foi bloqueada devido a múltiplas tentativas de login falhadas.'
                ], 422);
            }

            if (!$isPasswordCorrect) {
                return response([
                    'message' => 'Atenção! A password está incorreta!'
                ], 422);
            }

            if (!$isPinCorrect) {
                return response([
                    'message' => 'Atenção! O PIN está incorreto!'
                ], 422);
            }
        } else {
            // Reset login attempts if login is successful
            $user->login_attempts = 0;
            $user->save();
        }

        $token = $user->createToken('main')->plainTextToken;

        // Log the CRUD operation
        Log::channel('custom')->info('Record created: ' . $user->id);

        return response(compact('user', 'token'));
    }

    protected function hasExceededMaxLoginAttempts(User $user)
    {
        return $user->login_attempts >= 5;
    }

    protected function blockUserAccount(User $user)
    {
        $user->update(['blocked' => true]);
    }


    public function logout(Request $request)
    {


        /** @var \App\Models\User $user */
        $user = $request->user();
  
        $user->currentAccessToken()->delete();

        // Log the CRUD operation
        Log::channel('custom')->info('Record created: ' . $user->id);

        return response('', 204);
    }

    //Takes care of the log information
    public function log(Request $request)
    {
        $message = $request->input('message');
        Log::info($message);

        return response()->json(['message' => 'Log entry created'], 200);
    }
}
