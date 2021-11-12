<?php

namespace App\Modules\User\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Department;
use App\User;
use Validator;
use File;
use Hash;
use Carbon\Carbon;
use Response;
use Config;

class UserController extends Controller
{
       /**
    Laravel 6.0
    * @package Laravel-lastTask
    * @author Joice Sara Joseph
    * @param 
    * @Date 27-05-2021
    * @module  User
    * Description: User List
    **/
    public function index()
    {
        $active = Config::get('constants.ACTIVE');
       $users=User::where('user_type','!=','admin')->where('status',$active)
       ->with(array('departments'=>function($query){
            $query->select('department_name','id');
        }))->paginate(3);
        $departments=Department::all();
        return view('User::user_list',compact('departments','users'));
    }
      /**
    Laravel 6.0
    * @package Laravel-lastTask
    * @author Joice Sara Joseph
    * @param Request $request
    * @Date 27-05-2021
    * @module  User
    * Description: User Registeration
    **/
    public function add_user(Request $request)
    {
        //return 'success';
        $input=$request->all();
        $user = json_decode($input['user']);
        $user = json_decode(json_encode($user), true);
        //return $user['user']['name'];
        $error=Validator::make($user['user'],[
            'department_id'=>'required',
            //'profile_pic'=>'mimes:jpeg,jpg,png',
            'name'=>'required|regex:/^[a-z A-Z.]+$/u',
            'address'=>'required',
            'phone'=>'required|numeric|digits:10|unique:users',
            'gender'=>'required',
            'email'=>'required|email|unique:users',
            'password'=>'required|min:3|max:5'
        ]);
        if($error->fails()){
            return $error->messages()->toArray();
        }
        //return $user;
        if ($request->hasfile('profile_pic')) {

            $file = $request->file('profile_pic');
            $extenstion = strtolower($file->getClientOriginalExtension());
            /* if ($extenstion notin() 'jpg'  'png' ) {
                return 'Image must be of jpg';
            } */
            $name = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $destinationPath = 'uploads/';
            $name=str_replace(' ', '', $name);
            if (!is_dir($destinationPath)) {
                File::makeDirectory($destinationPath, 0775, true);
                $file_name_1 = $destinationPath . "/index.html";
                fopen($file_name_1, "w");
            }    
            $file_name = $name . round(microtime(true)) . rand(10, 10000000) . "." . $extenstion;
            $file->move($destinationPath, $file_name);
            $input['profile_pic'] = $file_name;
        } else {
            $input['profile_pic'] = '';
        }
        $latestOrder = User::orderBy('created','DESC')->first();
        $query=User::insert([
            'employee_id'=>'Fokuz'.str_pad($latestOrder['id'] + 1, 3, "0", STR_PAD_LEFT),
            'department_id'=>$user['user']['department_id'],
            'name'=>ucfirst($user['user']['name']),
            'email'=>$user['user']['email'],
            'address'=>$user['user']['address'],
            'phone'=>$user['user']['phone'],
            'gender'=>$user['user']['gender'],
            'profile_pic'=>$input['profile_pic'],
            'password'=>Hash::make($user['user']['password']),
            'user_type'=>'user',
            'status'=>1,
            'created'=>Carbon::now()
        ]);
        if($query)
        {
            return 'success';
        }

    }

       /**
    Laravel 6.0
    * @package Laravel-lastTask
    * @author Joice Sara Joseph
    * @param $id
    * @Date 27-05-2021
    * @module  User
    * Description: User Delete
    **/
    public function user_delete($id)
    {
        $query=User::where('id',$id)->update([
            'status'=>0
        ]);
        if($query)
        {
            return 'success';
        }
    }

       /**
    Laravel 6.0
    * @package Laravel-lastTask
    * @author Joice Sara Joseph
    * @param $id
    * @Date 27-05-2021
    * @module  User
    * Description: User Update view
    **/
    function user_update_view($id)
    {
        $users=User::where('id',$id)->first();
        return Response::json($users);
    }

    /**
    Laravel 6.0
    * @package Laravel-lastTask
    * @author Joice Sara Joseph
    * @param Request $request
    * @Date 27-05-2021
    * @module  User
    * Description: User Update 
    **/
    public function update_user(Request $request)
    {
        $input=$request->all();
        $user = json_decode($input['user']);
        $user = json_decode(json_encode($user), true);
        //return $user['user']['name'];
        //return $user;
        $image=$user['user']['image'];
        $error=Validator::make($user['user'],[
            'department_id'=>'required',
            //'profile_pic'=>'mimes:jpeg,jpg,png',
            'name'=>'required|regex:/^[a-zA-Z .]+$/u',
            'address'=>'required',
            'phone'=>'required|regex:/[0-9]{9}/',
            'gender'=>'required',
            'email'=>'required|email',
           
        ]);
        if($error->fails()){
            return $error->messages()->toArray();
        }
        if ($request->hasfile('profile_pic')) {
            $file = $request->file('profile_pic');
            $extenstion = strtolower($file->getClientOriginalExtension());
            $name = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $destinationPath = 'uploads/';
            $name=str_replace(' ', '', $name);
            if (!is_dir($destinationPath)) {
                File::makeDirectory($destinationPath, 0775, true);
                $file_name_1 = $destinationPath . "/index.html";
                fopen($file_name_1, "w");
            }    
            $file_name = $name . round(microtime(true)) . rand(10, 10000000) . "." . $extenstion;
            $file->move($destinationPath, $file_name);
            $input['profile_pic'] = $file_name;
        } else {
            if($image)
            {
                $input['profile_pic']=$image; 
            }
            else
            {
                $input['profile_pic'] = '';
            }
            
        }
       
        $query=User::where('id',$user['user']['id'])->update([
           
            'department_id'=>$user['user']['department_id'],
            'name'=>ucfirst($user['user']['name']),
            'email'=>$user['user']['email'],
            'address'=>$user['user']['address'],
            'phone'=>$user['user']['phone'],
            'gender'=>$user['user']['gender'],
            'profile_pic'=>$input['profile_pic'],
            
        ]);
        if($query)
        {
            return 'success';
        }

    }
}
