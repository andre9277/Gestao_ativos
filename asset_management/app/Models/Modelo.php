<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Asset;

class Modelo extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'brand_id',
    ];


    protected $table = 'modelo';

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function assets()
    {
        return $this->belongsTo(Asset::class);
    }
}
