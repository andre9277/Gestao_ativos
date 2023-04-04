<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Allocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'asset_id',
        'user_id',
        'allocation_date',
    ];


    public function user()
    {
        return $this->belongsToMany(User::class);
    }

    public function asset()
    {
        return $this->belongsToMany(Asset::class);
    }
}
