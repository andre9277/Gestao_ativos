<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

//Resource is a class used to convert database models into Json serializable data (sent from the server (API) to the browser)
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
        //what we want to expose of the current user
        return [
            'id' => $this->id,
            'mec' => $this->mec,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'role_id' => $this->role_id,
            'pin' => $this->pin,
            'roles' => $this->roles ? [
                'id' => $this->roles->id,
                'name' => $this->roles->name,
            ] : null,
        ];
    }
}
