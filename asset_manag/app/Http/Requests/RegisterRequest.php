<?php

namespace App\Http\Requests;

//Requests permitem validar a entrada de HTTP requests.
//-Definem as regras de validação dos dados submetidos com um request.
//Assegura que os dados tenham certas especificações antes de seguir a aplicação.

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'password' => [
                'required',
                'string',
                Password::min(8)->mixedCase()->numbers()->symbols()->uncompromised(),
                'confirmed',
            ]
        ];
    }
}
