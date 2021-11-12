<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientProductCartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_product_carts', function (Blueprint $table) {
            $table->id();
            $table->integer('client_id');
            $table->foreign('client_id')->references('id')->on('clients');
            $table->integer('product_id');
            $table->foreign('product_id')->references('id')->on('products');
            $table->date('start_date');
            $table->date('expiry_date');
            $table->integer('no_of_licences');
            $table->string('customization_description');
            $table->float('customization_amount');
            $table->float('license_amount');
            $table->float('platform_charge');
            $table->float('installation_charge');
            $table->string('created');
            $table->integer('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('client_product_carts');
    }
}
