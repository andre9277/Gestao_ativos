<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('assets', function (Blueprint $table) {
            //
            $table->string('ala', 100)->nullable()->change();
            $table->string('floor', 100)->nullable()->change();
            $table->string('ci', 100)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('assets', function (Blueprint $table) {
            //
            $table->string('ala', 100)->change();
            $table->string('piso', 100)->change();
            $table->string('ci', 100)->change();
        });
    }
};
