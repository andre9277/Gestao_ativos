<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Asset;

class Brand extends Model
{
    use HasFactory;

    protected $table = 'brand';

    public function assets()
    {
        return $this->hasMany(Asset::class);
    }

    public function modelo()
    {
        return $this->hasMany(Modelo::class);
    }
}
