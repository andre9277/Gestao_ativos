<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Resources\UserResource;
use App\Models\PasswordReset;
use App\Models\User;
use http\Env\Response;
use Illuminate\Contracts\Hashing\Hasher;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Notifications\PasswordResetNotification;

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
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Atenção! Endereço de email e(ou) Password incorreto(s)!'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
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

    /**
     * Perform a password reset
     * @param ForgotPasswordRequest $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function forgot(Hasher $hasher, ForgotPasswordRequest $request): JsonResponse
    {

        /** @var User $user */
        $user = ($query = User::query());

        $user = $user->where($query->qualifyColumn('email'), $request->input('email'))->first();

        //If no such user exists then throw an error
        if (!$user || !$user->email) {
            return response()->json([
                'error' => [
                    'message' => 'Dado não encontrado',
                    'details' => 'Endereço de email incorreto'
                ]
            ], 404);
        }

        //Generate a 4 digit random Token
        $resetPasswordToken = str_pad(random_int(1, 9999), 4, '0', STR_PAD_LEFT);

        //In Case User has already requested for forgot password don't create another record
        if (!$userPassReset = PasswordReset::where('email', $user->email)->first()) {
            //Store Token in DB with Token expiration time i.e: 1hour
            PasswordReset::create([
                'email' => $user->email,
                'token' => $resetPasswordToken,
            ]);
        } else {
            //Store Token in DB with Toen Expiration Time i.e: 1 hour
            $userPassReset->update([
                'email' => $user->email,
                'token' => $resetPasswordToken,
            ]);
        }

        //Send Notification to the user about the reset token
        $user->notify(
            new PasswordResetNotification(
                $user,
                $resetPasswordToken
            )
        );
        return response()->json(['message' => 'Um código foi enviado para o seu endereço de email!']);
    }

    public function reset(ResetPasswordRequest $request): JsonResponse
    {
        //Validate the request
        $attibutes = $request->validated();

        $user = User::where('email', $attibutes['email'])->first();

        if ($user) {
            return response()->error('No Record Found', 'Email incorreto', 404);
        }

        $resetRequest = PasswordReset::where('email', $user->email)->first();

        if (!$resetRequest || $resetRequest->token != $request->token) {
            return response()->error('Ocorreu um erro. Por favor tente de novo.', 'Token mismatch', 400);
        }

        //Update Users Password
        $user->fill([
            'password' => Hash::make($attibutes['password']),
        ]);
        $user->save();

        //Delete previous all Tokens
        $user->tokens()->delete();

        //Get Token for Authenticated User
        $token = $user->createToken('authToken')->plainTextToken;

        //Create a Response
        $loginResponse = [
            'user' => UserResource::make($user),
            'token' => $token
        ];

        return response()->success(
            $loginResponse,
            'Password Reset Success',
            201
        );
    }
}
