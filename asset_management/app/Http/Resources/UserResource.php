<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

//Resource é uma classe utilizada para converter os modelos database em Json serializable data (enviada do servidor(API) para o browser)
class UserResource extends JsonResource
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
        //o que queremos expor sobre o user
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'role_id' => $this->role_id,
        ];
    }
}
