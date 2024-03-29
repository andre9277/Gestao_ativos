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
            'numb_ser' => ['nullable', 'max:25', 'min:7', 'unique:assets,numb_ser'],
            'cond' => 'required',
            'state' => 'required',
            'cat_id' => 'required',
            'brand_id' => 'required',
            'ci' => ['required', 'max:7'],
            'ent_id' => 'required',
            'numb_inv' => [
                'required',
                'string',
                'size:6',
                'unique:assets,numb_inv',
                'regex:/^0/',
            ],
            'date_purch' => 'required',
            'model_id' => 'required',
            'supplier_id' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'numb_inv.size' => 'Atenção! O número de inventário deve ter exatamente 6 algarismos.',
            'numb_inv.regex' => 'Atenção! O número de inventário deve ter 0 como primeiro algarismo.',
            'numb_inv.unique' => 'Atenção! O número de inventário já foi adicionado.',
            'numb_ser.max' => 'Atenção! O número de série não pode ter mais de 25 caracteres.',
            'numb_ser.min' => 'Atenção! O número de série tem de ter mais de 6 carateres.',
            'ci' => 'Atenção! É necessário indicar o ci.',
            'ci.max' => 'Atenção! CI inválido.',
            'ent_id' => 'Atenção! É necessário indicar a entidade.',
            'numb_inv' => 'Atenção! É necessário indicar o número de inventário.',
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
