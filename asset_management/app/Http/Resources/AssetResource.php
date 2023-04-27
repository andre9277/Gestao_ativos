<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

//Resource is a class used to convert database models into Json serializable data (sent from the server (API) to the browser)
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
        //expose these information about the asset
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
            'unit_id' => $this->unit_id,
            'previous_unit_id' => $this->previous_unit_id,
            'previous_ent_id' => $this->previous_ent_id,
            'previous_ci' => $this->previous_ci,
            'entity' => $this->entity ? [
                'id' => $this->entity->id,
                'ent_name' => $this->entity->ent_name,
                'ent_type' => $this->entity->ent_type,
            ] : null,
            'brand' => $this->brand ? [
                'id' => $this->brand->id,
                'name' => $this->brand->name,
                'sig' => $this->brand->sig,
            ] : null,
            'modelo' => $this->modelo ? [
                'id' => $this->modelo->id,
                'model_name' => $this->modelo->model_name,
            ] : null,
            'category' => $this->category ? [
                'id' => $this->category->id,
                'name' => $this->category->name,
            ] : null,
            'units' => $this->units ? [
                'id' => $this->units->id,
                'unit_contact' => $this->units->unit_contact,
                'unit_address' => $this->units->unit_address,
                'name' => $this->units->name,
            ] : null,
            'suppliers' => $this->suppliers ? [
                'id' => $this->suppliers->id,
                'name' => $this->suppliers->name,
                'email' => $this->suppliers->email,
                'phone' => $this->suppliers->phone,
                'address' => $this->suppliers->address,
            ] : null,
        ];
    }
}
