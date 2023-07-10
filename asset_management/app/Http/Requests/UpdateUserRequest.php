<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        //gives permisson
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        //except the id
        return [
            'name' => 'required|string|max:55',
            'mec' => ['required', 'size:6',],
            'email' => 'required|email|unique:users,email,' . $this->id,
            'role_id' => 'required',
            'pin' => 'size:6',
            'password' => [
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols(),
            ]
        ];
    }

    public function messages()
    {
        return [
            'mec.required' => 'Atenção! Insira o número mecanográfico.',
            'mec.size' => 'Atenção! Introduza um número mecanográfico válido.',
            'role_id.required' => 'Atenção! Deve atribuir uma função.',
            'password.required' => 'Atenção! Deve inserir uma password com pelo menos 8 caracteres, 1 letra maiuscula e símbolos.',
            'email.required' => 'Atenção! Deve inserir uma email.',
            'pin.size' => 'Atenção! O pin deve ter 6 algarismos',
            'name.required' => 'Atenção! Insira o nome.',
            'name.size' => 'Atenção! Ultrapassou o limite de carateres.',
            'password.min' => 'Atenção! A password deve conter pelo menos 8 caracteres.',
            'password.letters' => 'Atenção! A password deve conter letras.',
            'password.symbols' => 'Atenção! A password deve conter símbolos.',
        ];
    }
}
