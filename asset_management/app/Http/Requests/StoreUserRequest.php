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
        if (strlen($value) === 5 && substr($value, 0, 1) === 'b') {
            $value = 'b0' . substr($value, 1);
        } elseif (strlen($value) === 4 && !preg_match('/^b\d{5}$/', $value)) {
            $value = '0' . $value;
        } elseif (strlen($value) === 3 && substr($value, 0, 1) === 'b' && !preg_match('/^b\d{4}$/', $value)) {
            $value = 'b00' . substr($value, 1);
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
            'mec' => ['required', 'regex:/^(b\d{5}|\d{6})$/',],
            'email' => [
                'required',
                'email',
                'unique:users,email',
                'regex:/^(?:[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/',
            ],

            'role_id' => 'required',
            'pin' => [
                'numeric',
                'size:6',
                'nullable',
            ],
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
            'mec.required' => 'Atenção! Deve inserir o número mecanográfico.',
            'mec.size' => 'Atenção! Introduza um número mecanográfico válido.',
            'role_id.required' => 'Atenção! Deve inserir uma função.',
            'password.required' => 'Atenção! Deve inserir uma password com pelo menos 8 caracteres, 1 letra maiuscula e símbolos.',
            'email.required' => 'Atenção! Deve introduzir um email.',
            'pin.size' => 'Atenção! O pin deve ter 6 algarismos.',
            'pin.numeric' => 'O pin só pode conter algarismos.',
            'name.required' => 'Atenção! Deve introduzir um nome.',
            'name.size' => 'Atenção! Ultrapassou o limite de carateres.',
            'password.min' => 'Atenção! A password deve conter pelo menos 8 caracteres.',
            'password.letters' => 'Atenção! A password deve conter letras.',
            'password.symbols' => 'Atenção! A password deve conter símbolo(s).',

        ];
    }
}
