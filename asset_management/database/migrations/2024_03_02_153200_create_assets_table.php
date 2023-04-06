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
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->string('numb_inv');
            $table->date('date_purch');
            $table->string('state');
            $table->string('numb_ser');
            $table->string('cond');
            $table->string('floor');
            $table->string('ala');
            $table->string('ci');


            $table->unsignedBigInteger('brand_id');
            $table->unsignedBigInteger('cat_id');
            $table->unsignedBigInteger('supplier_id');
            $table->unsignedBigInteger('model_id');
            $table->unsignedBigInteger('ent_id');

            $table->timestamps();

            $table->foreign('brand_id')->nullable()->references('id')->on('brand')->onDelete('cascade');
            $table->foreign('cat_id')->nullable()->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('ent_id')->nullable()->references('id')->on('entity')->onDelete('cascade');
            $table->foreign('supplier_id')->nullable()->references('id')->on('suppliers')->onDelete('cascade');
            $table->foreign('model_id')->nullable()->references('id')->on('modelo')->onDelete('cascade');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('assets');

        Schema::table('assets', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropColumn('category_id');
        });
    }
};
