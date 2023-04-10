<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Asset;

class Modelo extends Model
{
    use HasFactory;


    protected $table = 'modelo';

    public function ativos()
    {
        return $this->hasMany(Asset::class);
    }
}
