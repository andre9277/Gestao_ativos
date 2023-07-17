<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAssetRequest extends FormRequest
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
            'ci' => ['required', 'max:7'],
            //'model_id' => 'required',
            'ent_id' => 'required',
            'numb_inv' => [
                'nullable',
                'string',
                'digits:6',
                'regex:/^0/',
            ],
        ];
    }

    public function messages()
    {
        return [
            'numb_inv.size' => 'Atenção! O número de inventário deve ter exatamente 6 algarismos.',
            'numb_inv.regex' => 'Atenção! O número de inventário deve ter 0 como primeiro algarismo.',
            'numb_inv.unique' => 'Atenção! O número de inventário já foi adicionado.',
            'numb_ser.max' => 'Atenção! O número de série não pode ter mais de 25 caracteres.',
            'ci' => 'Atenção! É necessário indicar o ci.',
            'ci.max' => 'Atenção! CI inválido.',
            'ent_id' => 'Atenção! É necessário indicar a entidade.',
            'numb_ser' => 'Atenção! É necessário indicar o número de série.',
            'cat_id' => 'Atenção! É necessário indicar a categoria.',
            'cond' => 'Atenção! É necessário indicar a condição.',
            'brand_id' => 'Atenção! É necessário indicar a marca.',
            'state' => 'Atenção! É necessário indicar o estado.',
            'date_purch' => 'Atenção! É necessário indicar a data de compra.',
            'model_id' => 'Atenção! É necessário indicar o modelo.',
            'supplier_id' => 'Atenção! É necessário indicar o fornecedor.',
        ];
    }
}
