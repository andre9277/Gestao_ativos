<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Asset;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
    ];

    public function assets()
    {
        return $this->hasMany(Asset::class);
    }

    public function brands()
    {
        return $this->belongsToMany(Brand::class, 'category_brand');
    }
}
