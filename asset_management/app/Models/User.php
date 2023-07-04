<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Role;
use App\Models\Allocation;
use App\Notifications\PasswordResetNotification;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;


    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'mec',
        'email',
        'role_id',
        'password',
        'pin',
    ];
    public static $rules = [
        /* 'mec' => [
            'nullable',
            'regex:/^\d{5}$/',
            'size:5'
        ] */];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    //Relationship between Role and User tables. Each user has a role and multiple roles can have multiple users
    public function roles()
    {

        return $this->belongsTo(Role::class, 'role_id');
    }

    public function allocations()
    {
        return $this->hasMany(Allocation::class);
    }

    public function sendPasswordResetNotification($token)
    {

        $url = 'http://127.0.0.1:3000/forgotPasswordForm/' . $token;

        $this->notify(new PasswordResetNotification($url));
    }
}
