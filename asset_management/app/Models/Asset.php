<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Entity;
use App\Models\Supplier;
use App\Models\Modelo;
use App\Models\Allocation;

class Asset extends Model
{
    use HasFactory;

    protected $table = 'assets';

    protected $fillable = [
        'id',
        'numb_inv',
        'date_purch',
        'state',
        'numb_ser',
        'cond',
        'floor',
        'ala',
        'ci',
        'brand_id',
        'cat_id',
        'supplier_id',
        'ent_id',
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function entity()
    {
        return $this->belongsTo(Entity::class);
    }

    public function suppliers()
    {
        return $this->belongsTo(Supplier::class);
    }


    public function allocations()
    {
        return $this->hasMany(Allocation::class);
    }
}
