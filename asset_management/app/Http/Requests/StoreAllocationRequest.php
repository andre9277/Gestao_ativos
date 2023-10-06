<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAllocationRequest extends FormRequest
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
            'allocation_date' => 'required',
            'action_type' => 'required',
            'inv_number' => 'required',
            'reason' => 'required',
            'other' => 'nullable',
            'user_id' => 'required',
            'asset_id' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'inv_number.required' => 'Atenção! É necessário indicar o número de inventário.',
            'reason.required' => 'Atenção! É necessário indicar o motivo.',
            'allocation_date.required' => 'Atenção! É necessário indicar a data.',
            'asset_id' => 'Atenção! Verifique se o número de inventário existe.'
        ];
    }
}
