<?php

namespace App\Modules\Admin\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\User;

class AdminController extends Controller
{
       /**
    Laravel 6.0
    * @package Laravel-lastTask
    * @author Joice Sara Joseph
    * @param 
    * @Date 27-05-2021
    * @module  Admin
    * Description: Login Form
    **/
    public function index()
    {
        return view('Admin::login');
    }
       /**
    Laravel 6.0
    * @package Laravel-lastTask
    * @author Joice Sara Joseph
    * @param 
    * @Date 27-05-2021
    * @module  Admin
    * Description: Dashboard
    **/
    public function dashboard()
    {
        return view('Admin::dashboard');
    }
      /**
    Laravel 6.0
    * @package Laravel-lastTask
    * @author Joice Sara Joseph
    * @param Request $request
    * @Date 27-05-2021
    * @module  Admin
    * Description: Login validation
    **/
    public function logsearch(Request $request)
    {

        $request->validate([
        
            'email' => 'email|required',
            'password'=>'required',
        ]);
        
        $email = $request->email;
        $password=$request->password;
        
            if(Auth::attempt(['email'=>$email,'password'=>$password])){
                
                if(Auth::user()->user_type =="admin"){
                    return redirect('admin/dashboard')->with('success','Successfully login');
                   
                }
               
            } else {
                
                return redirect()->back()->with('fail','Invalid Email or Password');
            }
        
    
    }

      /**
    Laravel 6.0
    * @package Laravel-lastTask
    * @author Joice Sara Joseph
    * @param 
    * @Date 27-05-2021
    * @module  Admin
    * Description: Logout with auth
    **/
    public function logout()
    {
        Auth::logout();
        return redirect('admin/');
    }
}
