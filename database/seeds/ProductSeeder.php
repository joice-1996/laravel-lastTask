<?php

use Illuminate\Database\Seeder;
use App\Modules\Client\Models\Product;
use Carbon\Carbon;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       Product::insert([
           ['product_name'=>'FactFokuz',
           'status'=>1,
           'created'=>Carbon::now()],
           ['product_name'=>'BankFokuz',
           'status'=>1,
           'created'=>Carbon::now()],
           ['product_name'=>'TextileFokuz',
           'status'=>1,
           'created'=>Carbon::now()],
           ['product_name'=>'SalesFokuz',
           'status'=>1,
           'created'=>Carbon::now()],
          
       ]) ;
    }
}
