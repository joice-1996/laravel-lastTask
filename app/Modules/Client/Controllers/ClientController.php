<?php

namespace App\Modules\Client\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\Modules\Client\Models\Product;
use App\Modules\Client\Models\Client;
use App\Modules\Client\Models\ClientContact;
use App\Modules\Client\Models\ClientBranch;
use App\Modules\Client\Models\ClientProductCart;
use Carbon\Carbon;
use Validator;

class ClientController extends Controller
{
      /**
    Laravel 6.0
    * @package Laravel-lastTask
    * @author Joice Sara Joseph
    * @param 
    * @Date 28-05-2021
    * @module  Client
    * Description: client List
    **/
    public function index()
    {
        $clients=Client::with(array('users'=> function ($query){
            $query->select('name','id');
        }))->with(array('client_branches' => function ($query){
            $query->select('branches','client_id','id');
        }))->with(array('client_phones' => function($query){
            $query->select('contact_number','client_id','id');
        }))->with(array('client_cart_products'=> function ($query){
            $query->select('product_id','client_id','start_date','expiry_date','no_of_licences','customization_description'
            ,'customization_amount','license_amount','platform_charge','id')->with(array('products' => function($query){
                $query->select('product_name','id');
            }));
        }))->where('status','!=','0')->paginate(3);
        $users=User::where('status',1)->where('user_type','!=','admin')
        ->get();
        $products=Product::where('status',1)->pluck('product_name','id');
        return view('Client::client_list',compact('users','products','clients'));
    }

       /**
    Laravel 6.0
    * @package Laravel-lastTask
    * @author Joice Sara Joseph
    * @param 
    * @Date 28-05-2021
    * @module  Client
    * Description: Get Product
    **/
    public function get_product()
    {
        $products=Product::where('status',1)->pluck('product_name','id');
        return json_encode($products);
    }

     /**
    Laravel 6.0
    * @package Laravel-lastTask
    * @author Joice Sara Joseph
    * @param Request $request
    * @Date 28-05-2021
    * @module  Client
    * Description: Add Client
    **/
    public function add_client(Request $request)
    {
        $input=$request->all();
        $client = json_decode($input['client']);
        $client = json_decode(json_encode($client), true);
        //return $client['companydata'];
        $error=Validator::make($client['companydata'],[
            'compayname'=>'required',
            'branches'=>'regex:/^[a-z A-Z.0-9]+$/u',
            'contact_person'=>'required|regex:/^[a-z A-Z.]+$/u',
            'contact_number'=>'required|numeric|regex:/[0-9]{9}/|unique:client_contacts',
            'email'=>'required|email|unique:clients',
            'address'=>'required|',
            'consultant'=>'required|',
            
        ]);
        if($error->fails()){
            return $error->messages()->toArray();
        }
        $product = json_decode($input['product']);
        $product = json_decode(json_encode($product), true);
        //return $product;
        if ($request->hasfile('logo')) {
            $file = $request->file('logo');
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
            $input['logo'] = $file_name;
        } else {
            $input['logo'] = '';
        }
        $client_id =  Client::insertGetId([
            "company_name"=>$client['companydata']['compayname'],
            "contact_person"=>ucwords($client['companydata']['contact_person']),
            "email"=>$client['companydata']['email'],
            "address"=>$client['companydata']['address'],
            "company_logo"=> $input['logo'],
            "user_id"=>(integer)$client['companydata']['consultant'],
            "created"=>Carbon::now(),
            "status"=>1
        ]);
        
        if($client_id)
        {
            ClientBranch::insert([
                "client_id"=>$client_id,
                "branches"=>$client['companydata']['branches'],
                "status"=>1,
                "created"=>Carbon::now(),
            ]);
    
            ClientContact::insert([
                "client_id"=>$client_id,
                "contact_number"=>$client['companydata']['contact_number'],
                "status"=>1,
                "created"=>Carbon::now(),
            ]);
    
    
            foreach($product as $key )
            {
                foreach ($key as $value)
                {                
                    ClientProductCart::insert([
                        "client_id"=>$client_id,
                        "product_id"=>$value['id'],
                        "start_date"=>$value['start_date'],
                        "expiry_date"=>$value['expiry_date'],
                        "no_of_licences"=>$value['licenses'],
                        "customization_description"=>$value['customization_description'],
                        "customization_amount"=> (float)$value['customization_amount'],
                        "license_amount"=>(float)$value['license_amount'],
                        "platform_charge"=>(float)$value['platform_charge'],
                        "installation_charge"=>(float)$value['installation_charge'],
                        "status"=>1,
                        "created"=>Carbon::now(),
                    ]);
                }
                 
            }
    
            return 'success';
    
        }
        
       
        
    }


    public function clientdetails(Request $request)
    {
        $id=$request->id;
        $clients=Client::with(array('users'=> function ($query){
            $query->select('name','id');
        }))->with(array('client_branches' => function ($query){
            $query->select('branches','client_id','id');
        }))->with(array('client_phones' => function($query){
            $query->select('contact_number','client_id','id');
        }))->with(array('client_cart_products'=> function ($query){
            $query->select('product_id','client_id','start_date','expiry_date','no_of_licences','customization_description'
            ,'customization_amount','license_amount','platform_charge','id')->with(array('products' => function($query){
                $query->select('product_name','id');
            }));
        }))->where('status','!=','0')->where('id',$id)->get();
        return view('Client::quotation',compact('clients'));
    }
}
