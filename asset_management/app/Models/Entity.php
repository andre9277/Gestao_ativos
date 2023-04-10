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

    protected $fillable = [
        'id',
        'ent_name',
        'ent_type'
    ];

    public function assets()
    {
        return $this->hasMany(Asset::class);
    }

    public function units()
    {
        return $this->hasMany(Unit::class);
    }
}
