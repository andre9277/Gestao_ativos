<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->singleton('translator', function ($app) {
            $translator = new \Illuminate\Translation\Translator(
                $app['translation.loader'],
                $app['config']['app.locale']
            );
            $translator->setFallback('en'); // Set the fallback language to 'en' (English)
            return $translator;
        });
    }
}
