<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Supplier extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'supplier_id',
        'name',
        'email',
        'phone',
        'address',
    ];

    public function ativos()
    {
        return $this->hasMany(Asset::class);
    }
}
