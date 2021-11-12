var image;

function login_validation()
{
    var email=document.getElementById("login_email").value;
    if(email=="")
    {
        document.getElementById("login_emailEr").innerHTML="Email field is required";
    }
    var password=document.getElementById("login_password").value;
    if(password=="")
    {
        document.getElementById("login_passwordEr").innerHTML="Password field is required";
    }

}

//filter the list
function filter()
{
    //console.log(1);
    var search=document.getElementById("search").value;
    var gender1=document.getElementById("gender1").value;
    var from_date=document.getElementById("from-date").value;
    var to_date=document.getElementById("to-date").value;
    var usertype1=document.getElementById("usertype1").value;

    // var to_filter={
    //     'search' : search,
    //     'gender1':gender1,
    //     'from_date':from_date,
    //     'to_date':to_date,
    //     'usertype':usertype1
    // }
    var xmlhttp = new XMLHttpRequest();
       xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
             if (xmlhttp.status == 200) {
               var resp = xmlhttp.responseText;     
               document.getElementById("myDiv").innerHTML=resp;          
            //    document.write(resp);
               document.getElementById("gender1").value = gender1;
               document.getElementById("search").value = search;
               document.getElementById("usertype1").value=usertype1;
               document.getElementById("from-date").value=from_date;
               document.getElementById("to-date").value=to_date;

               document.getElementById("gender2").value = gender1;
               document.getElementById("search1").value = search;
               document.getElementById("usertype0").value=usertype1;
               document.getElementById("from_date1").value=from_date;
               document.getElementById("to_date1").value=to_date;

               document.getElementById("gender3").value = gender1;
               document.getElementById("search2").value = search;
               document.getElementById("usertype2").value=usertype1;
               document.getElementById("from_date2").value=from_date;
               document.getElementById("to_date2").value=to_date;
              
 

             }
             else if (xmlhttp.status == 400) {
                alert('There was an error 400');
             }
             else {
                 alert('something else other than 200 was returned');
             }
          }
      };
      var requestVariable = 'http://localhost/user-management/public/admin/user_list?search=' + search +       
      '&gender1='+ gender1
      '&from_date='+ from_date
      '&to_date='+ to_date
      '&usertype1='+ usertype1
      ;
      xmlhttp.open("GET", requestVariable, true);
    //    var data = new FormData();
    //    data.append('filter',  JSON.stringify({to_filter}));
      xmlhttp.send();

}

//reset the filter form
function reset()
{
    document.getElementById("search").value="";
    document.getElementById("gender1").value="";
    document.getElementById("from-date").value="";
    document.getElementById("to-date").value="";
    document.getElementById("usertype1").value="";
}

//user view
function view_user(id)
{
    var xmlhttp3 = new XMLHttpRequest();
   xmlhttp3.onreadystatechange = function() {
      if (xmlhttp3.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
         if (xmlhttp3.status == 200) {
           var resp1 = (JSON.parse(xmlhttp3.responseText));     
             //alert(resp1);
             //alert(resp1.users['name']);
             var img = document.createElement('img');
             for(var item of resp1)
             {
                document.getElementById('name1').value=item['name'];
                document.getElementById('email1').value=item['email'];
                document.getElementById('phone1').value=item['phone'];
                document.getElementById('email1').value=item['email'];
                document.getElementById('genderr1').value=item['gender'];
                document.getElementById('address1').value=item['address'];
                document.getElementById('dob1').value=item['dob'];
                document.getElementById('usertype_id1').value=item['department']['department_name'];
               /*  var pic=item['profile_pic'];
                img.src="{{asset('uploads/.'"+pic+")}}";
                document.getElementById('proimage').appendChild(img); */
             }
            
            }
            else if (xmlhttp3.status == 400) {
               alert('There was an error 400');
            }
            else {
                alert('something else other than 200 was returned');
            }
         }
     };
     var requestVariable = 'http://localhost/user-management/public/admin/user_view/'+id;
     xmlhttp3.open("POST", requestVariable, true);
     xmlhttp3.send();   
}


//update view
function user_edit_view(id)
 {
    var xmlhttp4 = new XMLHttpRequest();
    xmlhttp4.onreadystatechange = function() {
       if (xmlhttp4.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp4.status == 200) {
            var resp1 = (JSON.parse(xmlhttp4.responseText));     
              //alert(resp1);
              //alert(resp1.users['name']);
              /* var img = document.createElement('img'); */
              var str;
              for(var item of resp1)
              {
                  document.getElementById('id').value=item['id'];
                 document.getElementById('name2').value=item['name'];
                 document.getElementById('email2').value=item['email'];
                 document.getElementById('phone2').value=item['phone'];
                 document.getElementById('email2').value=item['email'];
                if(item['gender']=='female')
                {
                    document.getElementById('female1').checked=true;
                }
                else
                {
                    document.getElementById('male1').checked=true;
                }
                 document.getElementById('address2').value=item['address'];
                 document.getElementById('dob2').value=item['dob'];
                /*  str+= "<option value='" + item['department_id'] + "'>" + item['department']['department_name'] + "</option>"
                 document.getElementById('user_typee1').appendChild(str); */
                 /*  var pic=item['profile_pic'];
                 img.src="{{asset('uploads/.'"+pic+")}}";
                 document.getElementById('proimage').appendChild(img); */
                 document.getElementById('profile_pic1').value=item['profile_pic'];
              }
             
             }
             else if (xmlhttp4.status == 400) {
                alert('There was an error 400');
             }
             else {
                 alert('something else other than 200 was returned');
             }
          }
      };
      var requestVariable = 'http://localhost/user-management/public/admin/user_edit_view/'+id;
      xmlhttp4.open("POST", requestVariable, true);
      xmlhttp4.send();    
 }

 //Update the form

 function user_edit()
 {
     var id=document.getElementById('id').value;
     var name=document.getElementById('name2').value;
     if(name=="")
     {
         document.getElementById('nameErr').innerHTML="name field is required";
         return false;
     }
     var email=document.getElementById('email2').value;
     if(email=="")
     {
         document.getElementById('emailErr').innerHTML="email field is required";
         return false;
     }
     var phone=document.getElementById('phone2').value;
     if(phone=="")
     {
         document.getElementById('phoneEr').innerHTML="Phone field is required";
         return false;
     }
     var gender=document.forms['myForm1']['genderr1'].value;
     if(gender=="")
     {
         document.getElementById('genderErr').innerHTML="gender field is required";
         return false;
     }
     var dob=document.getElementById('dob2').value;
     var address=document.getElementById('address2').value;
     var user_type=document.getElementById('user_typee1').value;
     user={
         "id":id,
        "name":name,
        "email":email,
        "phone":phone,
        "gender":gender,
        "dob":dob,
        "address":address,
        "user_type":user_type
    }
    var xmlhttp6 = new XMLHttpRequest();
    xmlhttp6.onreadystatechange = function() {
       if (xmlhttp6.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp6.status == 200) {
            var resp = xmlhttp6.responseText; 
        
                alert(resp);
                //reset_form();
                filter();
                
          }
          else if (xmlhttp6.status == 400) {
             alert('There was an error 400');
          }
          else {
              alert('something else other than 200 was returned');
          }
       }
   };
   var requestVariable = 'http://localhost/user-management/public/admin/user_update';
   xmlhttp6.open("POST", requestVariable, true);
    var data = new FormData(); 
    data.append('profile_pic',document.getElementById("profile_pic1").files[0]);
    data.append('user',  JSON.stringify({user}));
   xmlhttp6.send(data);

 }
    

 //user delete
 function user_delete(id)
 {
     console.log(1);
    var confirm1=confirm("Are you sure to want to delete this user?");
    if(confirm1)
    {}
    else
    {
       cancel();
    }
    var xmlhttp6 = new XMLHttpRequest();
    xmlhttp6.onreadystatechange = function() {
       if (xmlhttp6.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp6.status == 200) {
            var resp = xmlhttp6.responseText; 
        
                alert(resp);
                //reset_form();
                filter();
                
          }
          else if (xmlhttp6.status == 400) {
             alert('There was an error 400');
          }
          else {
              alert('something else other than 200 was returned');
          }
       }
   };
   var requestVariable = 'http://localhost/user-management/public/admin/user_delete/'+id;
   xmlhttp6.open("POST", requestVariable, true);
   xmlhttp6.send();
 }

 //back
 function back()
 {
    return filter();
     
 }

 if(response.image){
    image=response.image;
    document.getElementById("edit_image").src = 'http://localhost/company/public/uploads/' + response.image;
    document.getElementById("edit_image").style.display='';
    document.getElementById("edit_image_close").style.display='';
    document.getElementById("edit_input_image").style.display='none';
}
else{
    image ='';
    document.getElementById("edit_image").src = '';
    document.getElementById("edit_image").style.display='none';
    document.getElementById("edit_image_close").style.display='none';
    document.getElementById("edit_input_image").style.display='';
}


function removeImage(){
    image ='';
    document.getElementById("edit_image").src = '';
    document.getElementById("edit_image").style.display='none';
    document.getElementById("edit_image_close").style.display='none';
    document.getElementById("edit_input_image").style.display='';
}