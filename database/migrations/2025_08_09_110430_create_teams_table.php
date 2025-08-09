<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB; // for inserting data

return new class extends Migration {
    public function up() {
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('team_id')->nullable()->constrained()->nullOnDelete();
        });

        // Insert default teams
        DB::table('teams')->insert([
            ['name' => 'BOCADILL', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'ECOM', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'OFICINA PROYECTOS', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down() {
        Schema::dropIfExists('teams');

        Schema::table('users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('team_id');
        });
    }
};
