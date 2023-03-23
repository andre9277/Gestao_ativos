<?php

namespace App\Http\Resources;


//Classes Resources são utilizados para transformar dados da nossa app em um formato que possam retornar em resposta JSON.
//é possível alterar os dados que são retornados em uma resposta e podem ser utilizados para esconder informação sensível

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
