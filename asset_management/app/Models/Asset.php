<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    use HasFactory;

    protected $guarded = [];

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

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function model()
    {
        return $this->belongsTo(Model::class);
    }

    public function allocation()
    {
        return $this->hasMany(Allocation::class);
    }
}
