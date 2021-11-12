var user;
var image;
//login front end validation
/* var nameReg=/^[A-Za-z\s]+$/;
var phoneReg=/^[6-9][0-9]{9}$/; */

function validate_department()
{
    var department_id=document.getElementById("department_id").value;
    if(department_id=="")
    {
        document.getElementById("department_idEr").innerHTML="Select Department";
    }
    else
    {
        document.getElementById("department_idEr").innerHTML="";
    }
}
function validate_username()
{
    var username=document.getElementById("username").value;
    if(username=="")
    {
        document.getElementById("nameEr").innerHTML="Name Field is required";
    }
    
    else
    {
        document.getElementById("nameEr").innerHTML="";
    }
}
function validate_phonenumber()
{
    var phone=document.getElementById("phone").value;
    if(phone=="")
    {
        document.getElementById("phoneEr").innerHTML="Phone Field is required";
    }  
    else
    {
        document.getElementById("phoneEr").innerHTML="";
    }
}
function validate_address()
{
    var address=document.forms["myForm"]["address"].value;
    if(address=="")
    {
        document.getElementById("addressEr").innerHTML="Address Field is required";
    }  
    else
    {
        document.getElementById("addressEr").innerHTML="";
    }
}
function validate_gender()
{
    var gender=document.forms["myForm"]["gender"].value;
    if(gender=="")
    {
        document.getElementById("genderEr").innerHTML="Gender field is required";
        return false;
    }
    else
    {
        document.getElementById("genderEr").innerHTML="";
        return false;
    }
}
function validate_email()
{
    var email=document.getElementById("email").value;
    if(email=="")
    {
        document.getElementById("emailEr").innerHTML="Email Field is required";
        return false;
    }
    else
    {
        document.getElementById("emailEr").innerHTML="";
        return false;
    }
}
function validate_password()
{
    var password=document.getElementById("password").value;
    if(password=="")
    {
        document.getElementById("passwordEr").innerHTML="Password field is required";
        return false;
    }
    else
    {
        document.getElementById("passwordEr").innerHTML="";
        return false;
    }
}

//user front end validation and registeration
function user_add()
{
    var department_id=document.getElementById('department_id').value;
    if(department_id=="")
    {
        document.getElementById("department_idEr").innerHTML="Select Department";
        return false;
    }
    
    var name=document.getElementById('username').value;
    console.log(name);
    if(name=="")
    {
        document.getElementById('nameEr').innerHTML="Name field is required";
        return false;
    }
    var address=document.forms["myForm"]["address"].value;
    console.log(address);
    if(address=="")
    {
        document.getElementById('addressEr').innerHTML="Address field is required";
        return false;
    }
    var phone=document.getElementById('phone').value;
    if(phone=="")
    {
        document.getElementById('phoneEr').innerHTML="Phone Field is required";
        return false;
    }
    //var gender=document.getElementsByName("gender").value;
        var gender = document.getElementsByName('gender');
        var genValue = false;

        for(var i=0; i<gender.length;i++){
            if(gender[i].checked == true){
                genValue = true;   
                gender=gender[i].value; 
            }
        }
        if(!genValue){
            document.getElementById('genderEr').innerHTML="Gender Field is required";
            return false;
        }
    
    var email=document.getElementById('email').value;
    if(email=="")
    {
        document.getElementById('emailEr').innerHTML="Email Field is required";
        return false;
    }
    var password=document.getElementById('password').value;
    if(password=="")
    {
        document.getElementById('passwordEr').innerHTML="Password Field is required";
        return false;
    }
    
    user={
        "department_id":department_id,
        "name":name,
        "address":address,
        "phone":phone,
        "gender":gender,
        "email":email,
        "password":password
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
            var resp = xmlhttp.responseText; 
            if(resp=='success')
            {
               /*  alert("successfully inserted"); */
               document.getElementById("success").innerHTML="successfully inserted";
                // var success = document.getElementById("success");
                // setTimeout(function(){ success.innerHTML = "Successfully Inserted" }, 2000);
                //list_users();
                //reset_form();
            }
            else
            {
                resp=(JSON.parse(xmlhttp.responseText));
                  if(resp.department_id)
                  {
                      document.getElementById("company_name").innerHTML=resp.department_id[0];
                  }
                  if(resp.name)
                  {
                      document.getElementById("nameEr").innerHTML=resp.name[0];
                  }
                  if(resp.address)
                  {
                      document.getElementById("addressEr").innerHTML=resp.address[0];
                  }
                  if(resp.phone)
                  {
                      document.getElementById("phoneEr").innerHTML=resp.phone[0];
                  }
                  if(resp.gender)
                  {
                      document.getElementById("genderEr").innerHTML=resp.gender[0];
                  }
                  if(resp.email)
                  {
                      document.getElementById("emailEr").innerHTML=resp.email[0];
                  }
                  if(resp.password)
                  {
                      document.getElementById("passwordEr").innerHTML=resp.password[0];
                  }
            }
             
          }
          
          else if (xmlhttp.status == 400) {
             alert('There was an error 400');
          }
          else {
              alert('something else other than 200 was returned');
          }
       }
   };
   var requestVariable = 'http://localhost/Laravel-lastTask/public/user/add_user';
   xmlhttp.open("POST", requestVariable, true);
    var data = new FormData(); 
    data.append('profile_pic',  document.getElementById("profile_pic").files[0]);
    data.append('user',  JSON.stringify({user}));
    data.append('_token',"{{csrf_token()}}");
   xmlhttp.send(data);
        
}

//Reset the form
function reset_form()
{
    document.getElementById('department_id').value="";
    document.getElementById('department_idEr').innerHTML="";
    document.getElementById('username').value="";
    document.getElementById('nameEr').innerHTML="";
    document.getElementById('email').value="";
    document.getElementById('emailEr').innerHTML="";
    document.getElementById('phone').value="";
    document.getElementById('phoneEr').innerHTML="";
    document.getElemenstByName(gender).value="";
    document.getElementById('genderEr').innerHTML="";
    document.getElementsByName('address').value="";
    document.getElementById('addressEr').innerHTML="";
    document.getElementById('password').value="";
    document.getElementById('passwordEr').innerHTML="";

}

//list the user
function list_users()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
                var resp = xmlhttp.responseText;
                document.getElementById("myDiv").innerHTML=resp; 
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };
    var requestVariable = 'http://localhost/Laravel-lastTask/public/user';
    xmlhttp.open("GET", requestVariable, true);
    xmlhttp.send();

}

//delete User

function delete_user(id)
{
    var confirm1=confirm("Are you sure want to delete this user?");
    if(confirm1)
    {

    }
    else
    {
        cancel();
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
           var resp = xmlhttp.responseText;
            if(resp=='success')
            {
                //alert("Successfully delete");
                var success = document.getElementById("success");
                setTimeout(function(){ success.innerHTML = "Successfully Delete" }, 2000);
                list_users();
               
                
            }
           
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };
    var requestVariable = 'http://localhost/Laravel-lastTask/public/user/user_delete/'+id;
    xmlhttp.open("POST", requestVariable, true);
    xmlhttp.send();
 
}
function removeImage(){
    image ='';
    document.getElementById("edit_image").src = '';
    document.getElementById("edit_image").style.display='none';
    document.getElementById("edit_image_close").style.display='none';
    document.getElementById("profile_picedit").style.display='';
}

function update_user(id)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
           var response = (JSON.parse(xmlhttp.responseText));
           //return response;
           document.getElementById("user_id").value=response.id;
           if(response.profile_pic){
            image=response.profile_pic;
            document.getElementById("edit_image").src = 'http://localhost/Laravel-lastTask/public/uploads/' + response.profile_pic;
            document.getElementById("edit_image").style.display='';
            document.getElementById("edit_image_close").style.display='';
            document.getElementById("profile_picedit").style.display='none';
        }
        else{
            image ='';
            document.getElementById("edit_image").src = '';
            document.getElementById("edit_image").style.display='none';
            document.getElementById("edit_image_close").style.display='none';
            document.getElementById("profile_picedit").style.display='';
        } 
            document.getElementById("department_editid").value=response.department_id;
            document.getElementById("username_edit").value = response.name;
            document.getElementById("address_edit").innerHTML = response.address;
            document.getElementById("phone_edit").value = response.phone;
            document.getElementById("email_edit").value = response.email;
            if(response.gender=="female")
                {
                    document.getElementById("female1").checked=true;
                }
                else
                {
                    document.getElementById("male1").checked=true;
                }
            
            
           
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };
    var requestVariable = 'http://localhost/Laravel-lastTask/public/user/user_update_view/'+id;
    xmlhttp.open("POST", requestVariable, true);
    xmlhttp.send();
}

function user_edit()
{
    var user_id=document.getElementById("user_id").value
    var department_id=document.getElementById('department_editid').value;
    if(department_id=="")
    {
        document.getElementById("department_editidEr").innerHTML="Select Department";
        return false;
    }
    
    var name=document.getElementById('username_edit').value;
    console.log(name);
    if(name=="")
    {
        document.getElementById('nameeditEr').innerHTML="Name field is required";
        return false;
    }
    var address=document.forms["myForm1"]['address_edit'].value;
    if(address=="")
    {
        document.getElementById('address_editEr').innerHTML="Address field is required";
        return false;
    }
    var phone=document.getElementById('phone_edit').value;
    if(phone=="")
    {
        document.getElementById('phone_editEr').innerHTML="Phone Field is required";
        return false;
    }
    var gender=document.forms["myForm1"]["gender_edit"].value;
    if(gender=="")
    {
        document.getElementById('gender_editEr').innerHTML="Gender Field is required";
        return false;
    }
    var email=document.getElementById('email_edit').value;
    if(email=="")
    {
        document.getElementById('email_editEr').innerHTML="Email Field is required";
        return false;
    }
    
    user={
        "id":user_id,
        "department_id":department_id,
        "name":name,
        "address":address,
        "image":image,
        "phone":phone,
        "gender":gender,
        "email":email,
        
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
            var resp = xmlhttp.responseText; 
            if(resp=='success')
            {
                list_users();
                document.getElementById("success").innerHTML="Successfully Updated";
                //setTimeout(function(){ success.innerHTML = "Successfully Updated" }, 2000);
                
            }
            else
            {
                resp=(JSON.parse(xmlhttp.responseText));
                  if(resp.department_id)
                  {
                      document.getElementById("department_ieditdEr").innerHTML=resp.department_id[0];
                  }
                  if(resp.name)
                  {
                      document.getElementById("name_editEr").innerHTML=resp.name[0];
                  }
                  if(resp.address)
                  {
                      document.getElementById("address_editEr").innerHTML=resp.address[0];
                  }
                  if(resp.phone)
                  {
                      document.getElementById("phone_editEr").innerHTML=resp.phone[0];
                  }
                  if(resp.gender)
                  {
                      document.getElementById("gender_editEr").innerHTML=resp.gender[0];
                  }
                  if(resp.email)
                  {
                      document.getElementById("email_editEr").innerHTML=resp.email[0];
                  }
                  
            }
             
          }
          
          else if (xmlhttp.status == 400) {
             alert('There was an error 400');
          }
          else {
              alert('something else other than 200 was returned');
          }
       }
   };
   var requestVariable = 'http://localhost/Laravel-lastTask/public/user/update_user';
   xmlhttp.open("POST", requestVariable, true);
    var data = new FormData(); 
    data.append('profile_pic',  document.getElementById("profile_picedit").files[0]);
    data.append('user',  JSON.stringify({user}));
   xmlhttp.send(data);
    

}
