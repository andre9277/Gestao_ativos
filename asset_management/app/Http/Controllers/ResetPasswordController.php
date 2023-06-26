<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\User;


class ResetPasswordController extends Controller
{
    public function resetLink(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            // User not found
            return response()->json(['message' => 'User not found'], 404);
        }

        $broker = Password::broker();
        $repository = $broker->getRepository();

        $response = $repository->exists(
            $user,
            $request->token
        );

        if ($response) {
            // The token is valid and not expired
            return response()->json(['message' => 'Token is valid'], 200);
        } else {
            // The token is invalid or expired
            return response()->json(['message' => 'Token is invalid or expired'], 400);
        }
    }


    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|min:8|confirmed',
        ]);

        $response = Password::broker()->reset(
            $request->only('email', 'token', 'password', 'password_confirmation'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();
            }
        );

        if ($response === Password::PASSWORD_RESET) {
            // Password has been successfully reset

            // Delete the password reset token from the password_resets table
            DB::table('password_resets')
                ->where('email', $request->email)
                ->delete();

            return response()->json(['message' => 'Password reset successfully'], 200);
        } else {
            // Unable to reset password
            return response()->json(['message' => 'Unable to reset password'], 400);
        }
    }


    /*  public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::reset($request->only('email', 'password', 'password_confirmation', 'token'), function ($user, $password) {
            $user->forceFill([
                'password' => Hash::make($password),
            ])->save();
        });

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'Password reset successfully'], 200)
            : response()->json(['message' => 'Unable to reset password'], 400);
    } */
}
