<?php

use Illuminate\Database\Seeder;
use App\Department;
use Carbon\Carbon;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Department::insert([
            ['department_name'=>'Accountant',
            'status'=>1,
            'created'=>Carbon::now()],
            ['department_name'=>'Developer',
            'status'=>1,
            'created'=>Carbon::now()],
            ['department_name'=>'Analyst',
            'status'=>1,
            'created'=>Carbon::now()],
            ['department_name'=>'UI',
            'status'=>1,
            'created'=>Carbon::now()]
            
        ]);
    }
}
