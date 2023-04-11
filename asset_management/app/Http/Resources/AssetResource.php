<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

//Resource é uma classe utilizada para converter os modelos database em Json serializable data (enviada do servidor(API) para o browser)
class AssetResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        //o que queremos expor sobre o asset
        return [
            'id' => $this->id,
            'numb_inv' => $this->numb_inv,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'date_purch' => $this->date_purch,
            'numb_ser' => $this->numb_ser,
            'cond' => $this->cond,
            'floor' => $this->floor,
            'ala' => $this->ala,
            'ci' => $this->ci,
            'state' => $this->state,
            'cat_id' => $this->cat_id,
            'supplier_id' => $this->supplier_id,
            'brand_id' => $this->brand_id,
            'ent_id' => $this->ent_id,
            'model_id' => $this->model_id,
            'unit_id' => $this->unit_id
        ];
    }
}
