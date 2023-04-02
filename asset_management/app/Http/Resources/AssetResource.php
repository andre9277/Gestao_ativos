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
            'inv' => $this->inv,
            'brand' => $this->brand,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'model' => $this->model,
            'serial' => $this->serial,
            'cond' => $this->cond,
            'ala' => $this->ala,
            'ci' => $this->ci,
            'status' => $this->status,
            'local' => $this->local,
            'category_id' => $this->category_id,
        ];
    }
}
