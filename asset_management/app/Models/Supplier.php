<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Asset;

class Supplier extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'suppliers';

    protected $fillable = [
        'supplier_id',
        'name',
        /* 'email',
        'phone',
        'address', */
    ];

    public function assets()
    {
        return $this->hasMany(Asset::class);
    }

    //Update supplier
    /*     public function update(Request $request, Supplier $sup)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $sup->id,
        ]);

        $sup->update([
            'name' => $request->input('name'),
        ]);

        return response()->json($sup, 200);
    } */
}
