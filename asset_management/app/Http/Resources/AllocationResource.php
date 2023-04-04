<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

//Resource é uma classe utilizada para converter os modelos database em Json serializable data (enviada do servidor(API) para o browser)
class AllocationResource extends JsonResource
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
            'user_id' => $this->user_id,
            'asset_id' => $this->asset_id,
            'allocation_date' => $this->allocation_date,
        ];
    }
}