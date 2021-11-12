<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\User;
use Carbon\Carbon;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::insert([
            'name'=>'admin',
            'email'=>'admin@admin.com',
            'password'=>Hash::make('admin'),
            'user-type'=>'admin',
            'department_id'=>0,
            'created'=>Carbon::now(),
            'status'=>1
        ]);
    }
}
