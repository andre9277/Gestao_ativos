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
            'ser_number' => 'required',
            'reason' => 'nullable',
            'other' => 'nullable',
            'user_id' => 'required',
            'asset_id' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'ser_number.required' => 'Atenção! É necessário indicar o número de série.',
            'reason.required' => 'Atenção! É necessário indicar o motivo.',
            'date_purch.required' => 'Atenção! É necessário indicar a data de compra.',
        ];
    }
}
