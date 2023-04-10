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
        'asset_id',
        'user_id',
        'allocation_date',
    ];

    protected $table = 'allocations';

    //User e Allocation tem uma ligação many:many; pode realizar várias movimentações
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //Asset e Allocation tem uma ligação many:many
    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }
}
