<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'email' => 'required_without:mec|email|string|exists:users,email',
            'mec' => 'required_without:email|string',
            'password' => [
                'required',
            ],
            'remember' => 'boolean'
        ];
    }

    /* public function messages()
    {
        return [

            'email.required' => 'Atenção! É necessário indicar um endereço de email!',
            'password.required' => 'Atenção! É necessário indicar uma password!.',
        ];
    } */
}
