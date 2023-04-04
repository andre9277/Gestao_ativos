<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    //Asset e Supplier tem uma ligação one:many
    public function suppliers()
    {
        return $this->belongsTo(Supplier::class);
    }
}
