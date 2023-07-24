
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
        Schema::create('allocations', function (Blueprint $table) {
            $table->id();
            $table->dateTime('allocation_date');
            $table->timestamps();
            $table->string('action_type');
            $table->string('inv_number');
            $table->string('reason');

            $table->text('other')->nullable();

            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('asset_id')->nullable()->constrained("assets")->cascadeOnUpdate()->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('allocations');
    }
};
