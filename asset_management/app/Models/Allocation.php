<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\User;
use App\Models\Asset;

class Allocation extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'id',
        'asset_id',
        'user_id',
        'allocation_date',
        'action_type',
        'ser_number',
        'reason',
        'other',
    ];

    protected $table = 'allocations';

    //User and Allocation have a many:many binding; can perform multiple moves
    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    //Asset and Allocation have a many:many binding
    public function assets()
    {
        return $this->belongsTo(Asset::class, 'asset_id');
    }
}
