<div class="myDiv" id="myDiv">
@include('header')

<main>
  
    @include('menu')

    <div class="right-main">

        @include('topBar')

        <div class="main-wrapper">
            <div class="row page-head">
                <div class="col-md-8 page-name">
                    <h4>User List</h4>
                </div>
                <div class="col-md-4 page-head-right text-end">
                    <button type="button" class="primary-btn custom-btn add" data-bs-toggle="modal" data-bs-target="#exampleModal">Add User</button>
                </div>
            </div>

            <div class="filter-div">

                <div class="row">

                <span style="color:green" id="success"></span>
                <span style="color:red" id="fail"></span>
                </div>

            </div>
            
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Employee Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Profile Picture</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Department</th>
                        <th scope="col">Mail</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($users as $user)
                    <tr>
                        <td>{{$user->employee_id}}</td>
                        <td>{{$user->name}}</td>
                        <td>@if($user->profile_pic)
                        <img class="img img-fluid" style="width:50px;height:100px" src="{{asset('uploads/'.$user->profile_pic)}}">
                        @endif</td>
                        <td>{{$user->address}}</td>
                        <td>{{$user->phone}}</td>
                        <td>{{$user->gender}}</td>
                        <td>{{$user->departments['department_name']}}</td>
                        <td>{{$user->email}}</td>
                        <td> <button type="button" class="primary-btn custom-btn add" data-bs-toggle="modal" data-bs-target="#exampleModal1" onclick="update_user({{$user->id}})">Update</button>
                        <td> <button type="button" class="primary-btn custom-btn add" data-bs-toggle="modal" onclick="delete_user({{$user->id}})">Delete</button></td>

                    </tr>
                    @endforeach  
                </tbody>
            </table>
            {!! $users->links() !!}
        </div>
    </div>
</main>

<!--User Insert Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add User</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" onclick="reset_form();" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row gx-4 gy-3">
                <div class="row gx-3 gy-3">
                    <div class="col-md-6">
                   <form action="" method="post"  name="myForm">
                @csrf
                <input type="hidden" name="_token" value="{{ csrf_token() }}" />

                         
                           <label for="exampleFormControlInput1" class="form-label">Department<span class="text-danger" id="name">*</span></label>
                            <select class="form-control" name="department_id" id="department_id"  onchange="validate_department();">
                            <option value="" selected>Select Department</option>
                            @foreach($departments as $department)
                            <option value="{{$department->id}}">{{$department->department_name}}</option>
                            @endforeach
                            
                            </select>
                            <span class="text-danger" id="department_idEr"></span> 
                       
                    </div>

                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="form-label">Profile Picture</label>
                        <input type="file" class="form-control" placeholder="" name="profile_pic" id="profile_pic" aria-label="First name">
                    </div>
                                

                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="form-label">Name<span style="color:red">*</label>
                        <input type="text" class="form-control" placeholder="Enter your name" name="username" id="username" onchange="validate_username();" aria-label="First name">
                        <span class="text-danger "id="nameEr"></span> 
                    </div>
                   

                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="form-label">Address<span class="text-danger "id="address">*</span></label>
                        <textarea class="form-control" name="address" id="address" onchange="validate_address();" placeholder="Enter Address Here"></textarea>
                        <span class="text-danger "id="addressEr"></span>  
                    </div>

                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="form-label">Phone Number<span class="text-danger">*</span></label>
                        <input type="text" class="form-control" name="phone" id="phone" onchange="validate_phonenumber();" placeholder="Enter Phone Number">
                        <span class="text-danger " id="phoneEr"></span>
                    </div>
                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="form-label">Gender<span style="color:red" >*</span></label>
                        <div class="form-check form-check-inline mt-3">
                            <input class="form-check-input" type="radio" id="inlineCheckbox1" name="gender" onchange="validate_gender();" value="female">
                            <label class="form-check-label" for="inlineCheckbox1" >Female</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" id="inlineCheckbox2" value="male" onchange="validate_gender();" name="gender">
                            <label class="form-check-label" for="inlineCheckbox2">Male</label>
                        </div>
                        <span class="text-danger "id="genderEr"></span> 
                    </div>

                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="form-label">Email<span class="text-danger">*</span></label>
                        <input type="text" class="form-control" name="email" id="email" onchange="validate_email();" placeholder="Enter Email">
                        <span class="text-danger " id="emailEr"></span>
                    </div>
                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="form-label">Password <span class="text-danger ">*</span></label>
                        <input type="password" class="form-control" name="password" id="password" onchange="validate_password();" placeholder="Enter Password">
                        <span class="text-danger " id="passwordEr"></span>
                    </div>

                   
                </div>
            </div>
            <div class="modal-footer">

                <button type="button" class="custom-btn save primary-btn" onclick="user_add();" >Register</button>
                </form>
            </div>
        </div>
    </div>
</div>
</div>

<!--User Update Modal -->
<div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Update User</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" onclick="reset_edit_form();" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row gx-4 gy-3">
                <div class="row gx-3 gy-3">
                    <div class="col-md-6">
                   <form action="" method="post"  name="myForm1">
               
                           <input type="hidden" id="user_id" name="user_id" value="">
                           <label for="exampleFormControlInput1" class="form-label">Department<span class="text-danger" id="name">*</span></label>
                            <select class="form-control" name="department_editid" id="department_editid">
                            <option value="" selected>Select Department</option>
                            @foreach($departments as $department)
                            <option value="{{$department->id}}">{{$department->department_name}}</option>
                            @endforeach
                            
                            </select>
                            <span class="text-danger" id="department_editidEr"></span> 
                       
                    </div>

                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="form-label">Profile Picture</label>
                        <input type="file" class="form-control" placeholder="" name="profile_picedit" id="profile_picedit" aria-label="First name">
                        <img src="" id="edit_image" class="img img-fluid" style="width:50px;height:100px">
                        <button type="button" id="edit_image_close" onclick="removeImage()">x</button>                    
                    </div>
                                

                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="form-label">Name<span style="color:red">*</label>
                        <input type="text" class="form-control" placeholder="Enter your name" name="username_edit" id="username_edit" aria-label="First name">
                        <span class="text-danger "id="name_editEr"></span> 
                    </div>
                   

                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="form-label">Address<span class="text-danger "id="address">*</span></label>
                        <textarea class="form-control" name="address_edit" id="address_edit" placeholder="Enter Address Here"></textarea>
                        <span class="text-danger "id="address_editEr"></span>  
                    </div>

                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="form-label">Phone Number<span class="text-danger">*</span></label>
                        <input type="text" class="form-control" name="phone_edit" id="phone_edit" placeholder="Enter Phone Number">
                        <span class="text-danger " id="phone_editEr"></span>
                    </div>
                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="form-label">Gender<span style="color:red" id="genderEr">*</span></label>
                        <div class="form-check form-check-inline mt-3">
                            <input class="form-check-input" type="radio" name="gender_edit" value="female" id="female1">
                            <label class="form-check-label" for="female1" >Female</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" value="male" name="gender_edit" id="male1">
                            <label class="form-check-label" for="male1">Male</label>
                        </div>
                        <span class="text-danger "id="genderEr"></span> 
                    </div>

                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="form-label">Email<span class="text-danger">*</span></label>
                        <input type="text" class="form-control" name="email_edit" id="email_edit" placeholder="Enter Email">
                        <span class="text-danger " id="email_editEr"></span>
                    </div>
                   

                   
                </div>
            </div>
            <div class="modal-footer">

                <button type="button" class="custom-btn save primary-btn" onclick="user_edit();" >Update</button>
                </form>
            </div>
        </div>
    </div>
</div>
</div>
<script src="{{asset('js/user.js')}}"></script>
@include('footer')
