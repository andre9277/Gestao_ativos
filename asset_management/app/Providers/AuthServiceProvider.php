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


        //Only the Admin and SI user can create a new asset
        Gate::define('create-edit', function (User $user) {
            if ($user->role_id === 1 || $user->role_id === 2) {
                return true;
            }
        });


        //Admin and SI user can delete an asset
        Gate::define('delete', function (User $user) {
            if ($user->role_id === 1 || $user->role_id === 2) {
                return true;
            }
        });

        //Only admin and SI user can allocate an asset 
        Gate::define('allocations', function (User $user) {
            if ($user->role_id === 1 || $user->role_id === 2) {
                return true;
            }
        });

        //Only admin can import
        Gate::define('import', function (User $user) {
            if ($user->role_id === 1) {
                return true;
            }
        });
    }
}
