<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
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

    protected function prepareForValidation()
    {
        $this->merge([
            'mec' => $this->addLeadingZero($this->input('mec')),
        ]);
    }

    private function addLeadingZero($value)
    {
        if (strlen($value) === 4) {
            $value = '0' . $value;
        }
        return preg_replace('/^(?!b\d{5}$)/', 'b', $value);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:55',
            'mec' => 'required',
            'email' => [
                'required',
                'email',
                'unique:users,email',
                'regex:/^(?:[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/',
            ],

            'role_id' => 'required',
            'password' => [
                'required',
                Password::min(8)
                    ->letters()
                    ->symbols(),
            ]
        ];
    }

    public function messages()
    {
        return [
            'mec.size' => 'Atenção! O Número Mecanográfico deve ter exatamente 5 algarismos.',
            'role_id.required' => 'Atenção! Deve atribuir uma função.',
            'password.required' => 'Atenção! Deve inserir uma password com pelo menos 8 caracteres, 1 letra maiuscula e símbolos.',
            'email.required' => 'Atenção! Deve ser inserir uma password.',
            'mec.required' => 'Atenção! Insira o número mecanográfico.',
            'name.required' => 'Atenção! Insira o nome.',
            'name.size' => 'Atenção! Ultrapassou o limite de carateres.',
            'password.min' => 'Atenção! A password deve conter pelo menos 8 caracteres.',
            'password.letters' => 'Atenção! A password deve conter letras.',
            'password.symbols' => 'Atenção! A password deve conter símbolos.',
        ];
    }
}
