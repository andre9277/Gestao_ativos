<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Entity;

class Unit extends Model
{
    use HasFactory;


    protected $table = 'units';
    public function entity()
    {
        return $this->belongsTo(Entity::class);
    }

    public function assets()
    {
        return $this->belongsTo(Asset::class);
    }
}
