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
            'inv' => 'required',
            'brand' => 'required',
            'brand' => 'required',
            'model' => 'required',
            'serial' => 'required',
            'cond' => 'required',
            'ala' => 'required',
            'ci' => 'required',
            'status' => 'required',
            'local' => 'required',
            'category_id' => 'required'
        ];
    }
}