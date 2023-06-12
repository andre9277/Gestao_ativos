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
}
