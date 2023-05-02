<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAssetRequest extends FormRequest
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
            'numb_ser' => 'required',
            'cond' => 'required',
            'state' => 'required',
            'cat_id' => 'required',
            'brand_id' => 'required',
            'ci' => 'size:7|sometimes|nullable',
            //'model_id' => 'required',
            'ent_id' => 'required',
            'numb_inv' => [
                'required',
                'string',
                'size:6',
                'unique:assets,numb_inv',
                'regex:/^0/',
            ],
        ];
    }

    public function messages()
    {
        return [
            'numb_inv.size' => 'Atenção! O Número de Inventário deve ter exatamente 6 algarismos.',
            'numb_inv.regex' => 'Atenção! O Número de Inventário deve ter 0 como primeiro algarismo.',
            'numb_inv.unique' => 'Atenção! O Número de Inventário já foi adicionado.',
            'numb_ser.size' => 'Atenção! O Número de Série pode ter até 25 caracteres.',
            'ci.size' => 'Atenção! O número de CI só pode ter até 7 algarismos.',
            'ent_id' => 'Atenção! É necessário indicar a entidade do ativo.'

        ];
    }
}
