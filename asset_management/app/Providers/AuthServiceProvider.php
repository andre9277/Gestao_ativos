<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Allocation;
use App\Models\Asset;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        Gate::define('create-delete-users', function (User $user) {
            if ($user->role_id === 1) {
                return true;
            }
        });

        //Só o Admin e o SI pode criar um novo ativo
        Gate::define('create-edit', function (User $user) {
            if ($user->role_id === 1 || $user->role_id === 2) {
                return true;
            }
        });

        //Só o Admin pode apagar um ativo
        Gate::define('delete', function (User $user) {
            if ($user->role_id === 1) {
                return true;
            }
        });
    }
}
