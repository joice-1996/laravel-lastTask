<div id="MyDiv">
        @include('header')

        <main>
        
            @include('menu')

            <div class="right-main">

                @include('topBar')

                <div class="main-wrapper">
                    <div class="row page-head">
                        <div class="col-md-8 page-name">
                            <h4>Client List</h4>
                        </div>
                        <div class="col-md-4 page-head-right text-end">
                            <button type="button" class="primary-btn custom-btn add" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Client</button>
                        </div>
                    </div>

                    <div class="filter-div">

                        <div class="row">
                        
                        <span style="color:green" id="success"></span>
                        </div>

                    </div>

                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Company Name</th>
                                <th scope="col">Contact Person</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Branches</th>
                                <th scope="col">Email</th>
                                <th scope="col">Consultant</th>
                                <th scope="col">Product Name</th>    
                                <th scope="col">Action</th> 
                            </tr>
                        </thead>
                        <tbody>
                        @foreach($clients as $client)
                            <tr>
                                @if($client->company_logo)
                                <td><img src="{{asset('uploads/' .$client->company_logo)}} " class="img img-fluid img-rounded" style="width:100px;height:100px">{{"  ".$client->company_name}}</td>
                                @else
                                <td>{{$client->company_name}}</td>
                                @endif
                                <td>{{$client->contact_person}}</td>
                                <td>@foreach($client->client_phones as $phone)
                                        {{$phone->contact_number}} </br>
                                    @endforeach
                                </td>
                                <td>@foreach($client->client_branches as $braches)
                                        {{$braches->branches}} </br>
                                    @endforeach
                                </td>
                                <td>{{$client->email}}</td>
                                <td>{{$client->users['name']}}</td>
                                <td>@foreach($client->client_cart_products as $cartproducts)
                                        {{$cartproducts->products['product_name']}} </br>
                                    @endforeach
                                </td>
                                <form action="client/clientdetails" method="get">
                                <input type="hidden" value="{{$client->id}}" name="id" >
                                <td><button type="submit"  class="primary-btn custom-btn add" data-bs-toggle="modal" >VIEW DETAILS</button>
                                
                            </form> 
                            
                            </td>  
                                </tr>
                            @endforeach

                        
                        </tbody>
                    </table>
                    {!! $clients->links() !!}
                </div>
            </div>
        </main>

        <!-- Client Insertion Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Client</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" onclick="reset_form();" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="form" name="myForm" action="" method="post">
                            @csrf
                        <div class="row gx-4 gy-3">
                            <div class="col-md-6">
                                <label for="exampleFormControlInput1" class="form-label">Company Name<span style="color:red" >*</span></label>
                                <input type="text" class="form-control" name="company_name" id="company_names" placeholder="Enter Compay Name" aria-label="First name">
                                <span style="color:red" id="company_name"></span>
                            </div>

                            <div class="col-md-6 input_fields_wrap">
                                <label for="exampleFormControlInput1" class="form-label">Branches</label>
                            
                                <input type="text" class="form-control" placeholder="Enter branches here" id="branches" name="branches"   aria-label="First name" id="brancehs">
                                <span style="color:red" id="branchesEr"></span>
                            </div>

                            <div class="col-md-6">
                                <label for="exampleFormControlInput1" class="form-label">Contact Person Name<span style="color:red" >*</span></label>
                                <input type="text" class="form-control" name="contact_person_name" id="contact_person_names" placeholder="Contact Person Name" aria-label="First name">
                                <span style="color:red" id="contact_person_name"></span>
                            </div>

                            <div class="col-md-6">
                                <label for="exampleFormControlInput1" class="form-label">Email<span style="color:red" >*</span></label>
                                <input type="text" class="form-control" name="email" id="emails" placeholder="Enter Email" aria-label="First name">
                                <span style="color:red" id="email"></span>
                            </div>

                            <div class="col-md-6 input_fields_wrap1">
                                <label for="exampleFormControlInput1" class="form-label">Phone Number<span style="color:red" >*</span></label>
                            
                                <input type="text" class="form-control" name="phone_numbers" id="phone" placeholder="Enter Phone Numbers"  aria-label="First name">
                                <span style="color:red" id="phone_numbers"></span>
                                </div>

                            <div class="col-md-6">
                                <label for="exampleFormControlInput1" class="form-label">Address<span style="color:red" >*</span></label>
                                <textarea  class="form-control" name="address" id="addresss" placeholder="Address here" aria-label="First name"></textarea>
                                <span style="color:red" id="addressEr"></span>
                            </div>

                            <div class="col-md-6">
                                <label for="exampleFormControlInput1" class="form-label">Company Logo</label>
                                <input type="file" class="form-control" name="company_logo" id="company_logoo" aria-label="First name">
                            </div>

                            <div class="col-md-6">
                                <label for="exampleFormControlInput1" class="form-label">Consultant<span style="color:red">*</span></label>
                                <select name="consultant_id" class="form-control" id="consultant" >
                                    <option value="" selected>Open this select menu</option>
                                @foreach ($users as $user)
                                <option value="{{$user->id}}">{{$user->name}}</option>
                                @endforeach
                                </select>
                                <span style="color:red" id="consultantEr"></span>
                            </div>

                        </div>
                        <div class="row gx-4 gy-3 border rounded bg-secondary mt-3 p-3">
                        <h5 class="text-center" id="exampleModalLabel">Product Details</h5>
                            <div class="col-md-6 ">
                                <label for="exampleFormControlInput1 " class="form-label text-white">Product<span style="color:red">*</span></label>
                                <select name="consultant_id" class="form-control" name="productname" id="productname">
                                    <option value="" selected>Open this select menu</option>
                                
                                    @foreach ($products as $key => $value)
                                    <option value="{{$key}}">{{$value}}</option>
                                    @endforeach
                                
                                </select>
                                <span style="color:red" id="productnameEr"></span>
                            </div>

                            <div class="col-md-6">
                                <label for="exampleFormControlInput1" class="form-label text-white">Start Date<span style="color:red">*</span></label>
                                <input type="date" class="form-control" placeholder="License Amount" name="start_date" id="start_date"  aria-label="First name">
                                <span style="color:red" id="start_dateEr"></span>
                            </div>

                            <div class="col-md-6">
                                <label for="exampleFormControlInput1" class="form-label text-white">Expiry Date<span style="color:red">*</span></label>
                                <input type="date" class="form-control" placeholder="License Amount" name="expiry_date" id="expiry_date"  aria-label="First name">
                                <span style="color:red" id="expiry_dateEr"></span>
                            </div>


                            <div class="col-md-6">
                                <label for="exampleFormControlInput1" class="form-label text-white">No.of Licence<span style="color:red">*</span></label>
                                <input role="spinbutton" aria-valuemax="20" class="form-control" name="license" id="license" aria-valuemin="0" aria-valuenow="0" type="number" value="0">
                                <span style="color:red" id="licenseEr"></span>
                            </div>

                            <div class="col-md-6">
                                <label for="exampleFormControlInput1" class="form-label text-white">License Amount<span style="color:red">*</span></label>
                                <input type="text" class="form-control" placeholder="License Amount" name="license_amount" id="license_amount" aria-label="First name">
                                <span style="color:red" id="license_amountEr"></span>
                            </div>

                        
                            <div class="col-md-6">
                                <label for="exampleFormControlInput1" class="form-label text-white">Customization Description</label>
                                <textarea  class="form-control" name="customization_description" id="customization_description" placeholder="Description here" aria-label="First name"></textarea>
                            </div>

                            <div class="col-md-6">
                                <label for="exampleFormControlInput1" class="form-label text-white">Customization Amount</label>
                                <input type="text" class="form-control" name="customization_amount" id="customization_amount" placeholder="Customization Amount" aria-label="First name">
                            </div>
                        

                            <div class="col-md-6">
                                <label for="exampleFormControlInput1" class="form-label text-white">Installation Charge<span style="color:red">*</span></label>
                                <input type="text" class="form-control" name="installation_charge" id="installation_charge" placeholder="Installation Amount" aria-label="First name">
                                <span style="color:red" id="installation_chargeEr"></span>
                            </div>

                            <div class="col-md-6">
                                <label for="exampleFormControlInput1" class="form-label text-white">Platform Charge<span style="color:red">*</span></label>
                                <input type="text" class="form-control" name="platform_charge" id="platform_charge" placeholder="Platform  Amount" aria-label="First name">
                                <span style="color:red" id="platform_chargeEr"></span>
                            </div>
                            
                            <button type="button"  id="productAdd" class="custom-btn save primary-btn" onclick="productAddToCart({{$products}});">Add To Cart</button>
                        </div>
                        <div class="container table1" id="table1" style="display:none">
                        <div class="row">
                        <div class="col-sm-6">
                    <h2>List Products</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <table id="productTable" class="table table-bordered table-condensed table-striped">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Start Date</th>
                                <th>Expiry Date</th>
                                <th>No.of License</th>
                                <th>License Amount</th>
                                <th>Customization Description</th>
                                <th>Customization Amount</th>
                                <th>Installation Charge</th>
                                <th>Platform Charge</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
                    </div>
                    <div class="modal-footer">

                        <button type="button" class="custom-btn save primary-btn" onclick="validate_clientForm();" >Save</button>
                    </div>
                </div>
            </div>
        </form>
        </div>

</div>
@include('footer')
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="{{asset('js/client.js')}}"></script>