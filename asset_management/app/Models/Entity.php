<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Asset;
use App\Models\Unit;

class Entity extends Model
{
    use HasFactory;

    protected $table = 'entity';

    public function assets()
    {
        return $this->hasMany(Asset::class);
    }

    public function units()
    {
        return $this->hasMany(Unit::class);
    }
}
