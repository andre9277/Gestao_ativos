<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

//Resource is a class used to convert database models into Json serializable data (sent from the server (API) to the browser)
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
        //expose these information about the allocation
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'asset_id' => $this->asset_id,
            'allocation_date' => $this->allocation_date,
            'action_type' => $this->action_type,
            'inv_number' => $this->inv_number,
            'users' => $this->users ? [
                'id' => $this->users->id,
                'name' => $this->users->name,
            ] : null,
            'assets' => $this->assets ? [
                'id' => $this->assets->id,
                'numb_ser' => $this->assets->numb_ser,
                'numb_inv' => $this->assets->numb_inv,
                'unit_id' => $this->assets->unit_id,
                /* 'unit' => $this->assets->units ? [
                    'id' => $this->assets->units->id,
                    'name' => $this->assets->units->name,
                ] : null, */
            ] : null,
        ];
    }
}
