var image='';
//Category added
function add_category()
{
    console.log(1);
    
    var category_name = document.getElementById("category").value;
    console.log(category_name);
    if(category_name == "")
    {
        document.getElementById("categoryEr").innerHTML="Category field is required";
        return false;
    }
    var category={
        'category_name':category_name
    }

     var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
            var resp = xmlhttp.responseText; 
              if(resp=='success') 
              {
                  alert("sucessfully inserted");
                  document.getElementById("category").value="";
                  document.getElementById("categoryEr").value="";
              }    
              else
              {
                  resp=(JSON.parse(xmlhttp.responseText));
                  if(resp.category_name)
                  {
                      document.getElementById("categoryEr").innerHTML=resp.category_name[0];
                  }
              }
              document.getElementById("category")='';
          }
          else if (xmlhttp.status == 400) {
             alert('There was an error 400');
          }
          else {
              alert('something else other than 200 was returned');
          }
       }
   };
   var requestVariable = 'http://localhost/user-management/public/category/add_category';
   xmlhttp.open("POST", requestVariable, true);
   var data = new FormData(); 
   data.append('category',JSON.stringify({category}));
   xmlhttp.send(data);
         
}

function reset_category_form()
{
    document.getElementById("category").value="";
    document.getElementById("categoryEr").innerHTML="";
}

function add_sub_category()
{
    console.log(1);
    
    var subcategory_name = document.getElementById("subcategory").value;
    console.log(subcategory_name);
    if(subcategory_name == "")
    {
        document.getElementById("subcategoryEr").innerHTML="SubCategory field is required";
        return false;
    }
    var category_id = document.getElementById("category_id").value;
    //console.log(subcategory_name);
    if(category_id == "")
    {
        document.getElementById("categoryidEr").innerHTML="select Category";
        return false;
    }
    var subcategory={
        'subcategory_name':subcategory_name,
        'category_id':category_id
    }

     var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
            var resp = xmlhttp.responseText; 
              if(resp=='success') 
              {
                  alert("sucessfully inserted");
                  document.getElementById("subcategory").value="";
                  document.getElementById("subcategoryEr").innerHTML="";
                  document.getElementById("category_id").value="";
                  document.getElementById("categoryidEr").innerHTML="";
              }    
              else
              {
                  resp=(JSON.parse(xmlhttp.responseText));
                  if(resp.subcategory_name)
                  {
                      document.getElementById("subcategoryEr").innerHTML=resp.subcategory_name[0];
                  }
                  if(resp.category_id)
                  {
                      document.getElementById("categoryidEr").innerHTML=resp.category_id[0];
                  }
              }
              document.getElementById("subcategory")='';
              document.getElementById("category_id")='';
          }
          else if (xmlhttp.status == 400) {
             alert('There was an error 400');
          }
          else {
              alert('something else other than 200 was returned');
          }
       }
   };
   var requestVariable = 'http://localhost/user-management/public/subcategory/add_subcategory';
   xmlhttp.open("POST", requestVariable, true);
   var data = new FormData(); 
   data.append('subcategory',JSON.stringify({subcategory}));
   xmlhttp.send(data);
           
}

function subcategories()
{
    var selectedindex = document.getElementById("category_id").value;
// console.log(selectedindex);
loadSubCategoryValues(selectedindex);
}
function loadSubCategoryValues(categoryId) {
   var xmlhttp = new XMLHttpRequest();
   xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
          var resp = (JSON.parse(xmlhttp.responseText));
          var str = "<option value='' selected>Open this select menu</option>"
  for (var item of resp) {
    str += "<option value='" + item['id'] + "'>" + item['subcategory_name'] + "</option>"
   }
   document.getElementById("subcategory_id").innerHTML = str;
          }
          else if (xmlhttp.status == 400) {
             alert('There was an error 400');
          }
          else {
              alert('something else other than 200 was returned');
          }
       }
   };
   var requestVariable = 'http://localhost/user-management/public/product/get_subcategories/'+categoryId;
   xmlhttp.open("GET", requestVariable, true);
   xmlhttp.send();

}


function add_product()
{
    var product_name=document.getElementById("product").value;
    if(product_name=="")
    {
        document.getElementById("productEr").innerHTML="Product Fields is required";
        return false;
    }
    var category_id=document.getElementById("category_id").value;
    if(category_id=="")
    {
        document.getElementById("categoryidEr").innerHTML="Select Category";
        return false;
    }
    var subcategory_id=document.getElementById("subcategory_id").value;
    if(subcategory_id=="")
    {
        document.getElementById("subcategoryidEr").innerHTML="Select SubCategory";
        return false;
    }
    var description=document.getElementById("description").value;
    var product_image=document.getElementById("product_image").value;
    var rate=document.getElementById("product_rate").value;
    var product={
        'product_name':product_name,
        'category_id':category_id,
        'subcategory_id':subcategory_id,
        'description':description,
        'product_rate':rate
        
    }
 
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
            var resp = xmlhttp.responseText; 
              if(resp=='success') 
              {
                  alert("sucessfully inserted");
                  document.getElementById("product").value="";
                  document.getElementById("productEr").innerHTML="";
                  document.getElementById("category_id").value="";
                  document.getElementById("categoryidEr").innerHTML="";
                  document.getElementById("subcategory_id").value="";
                  document.getElementById("subcategoryidEr").innerHTML="";
                  document.getElementById('product_rate').value="";
              }    
              else
              {
                  resp=(JSON.parse(xmlhttp.responseText));
                  if(resp.product_name)
                  {
                      document.getElementById("productEr").innerHTML=resp.product_name[0];
                  }
                  if(resp.category_id)
                  {
                      document.getElementById("categoryidEr").innerHTML=resp.category_id[0];
                  }
                  if(resp.subcategory_id)
                  {
                      document.getElementById("subcategoryidEr").innerHTML=resp.subcategory_id[0];
                  }
                  if(resp.product_image)
                  {
                      document.getElementById("product_imageEr").innerHTML=resp.product_image[0];
                  }
                  if(resp.product_rate)
                  {
                      document.getElementById("product_rateEr").innerHTML=resp.product_rate[0];
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
   var requestVariable = 'http://localhost/user-management/public/product/add_product';
   xmlhttp.open("POST", requestVariable, true);
   var data = new FormData(); 
   data.append('product_image',  document.getElementById("product_image").files[0]);
   data.append('product',JSON.stringify({product}));
   xmlhttp.send(data);
           

}

function assign(id)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
            var resp = (JSON.parse(xmlhttp.responseText)); 
            for(var item of resp)
            {
                document.getElementById("id").value=item['id'];
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
   var requestVariable = 'http://localhost/user-management/public/product/get_productid/' +id;
   xmlhttp.open("POST", requestVariable, true);
   xmlhttp.send();
   
}

function assign_user()
{
    var user_id=document.getElementById('user_id').value;
    
    if(user_id=="")
    {
        document.getElementById("user_idEr").innerHTML="Field is required";
        return false;
    }
    var product_id=document.getElementById("id").value;
    var assign_user={
        'product_id':product_id,
        'user_id':user_id
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
            var resp = xmlhttp.responseText; 
              if(resp=='success') 
              {
                  alert("sucessfully Updated");
                  document.getElementById("user_id").value="";
                  document.getElementById("user_idEr").value="";
              }    
              else
              {
                  resp=(JSON.parse(xmlhttp.responseText));
                  if(resp.user_id)
                  {
                      document.getElementById("user_idEr").innerHTML=resp.user_id[0];
                  }
              }
              document.getElementById("user_id")='';
          }
          else if (xmlhttp.status == 400) {
             alert('There was an error 400');
          }
          else {
              alert('something else other than 200 was returned');
          }
       }
   };
   var requestVariable = 'http://localhost/user-management/public/product/assign_user';
   xmlhttp.open("POST", requestVariable, true);
   var data = new FormData(); 
   data.append('assign_user',JSON.stringify({assign_user}));
   xmlhttp.send(data);
   

}

//category Update
function update_category_view(id)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
            var resp = (JSON.parse(xmlhttp.responseText)); 
            for(var item of resp)
            {
                document.getElementById("category_id").value=item['id'];
                document.getElementById("category_edit").value=item['category_name'];
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
   var requestVariable = 'http://localhost/user-management/public/category/get_category/' +id;
   xmlhttp.open("POST", requestVariable, true);
   xmlhttp.send();
   
}

function update_category()
{
    var category=document.getElementById("category_edit").value;
    if(category=="")
    {
        document.getElementById("category_editEr").innerHTML="field is required";
        return false;
    }
    var category_id=document.getElementById("category_id").value;
    var category_edit={
        'category_name':category,
        'category_id':category_id
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
            var resp = xmlhttp.responseText; 
              if(resp=='success') 
              {
                  alert("sucessfully Updated");
                  document.getElementById("category_edit").value="";
                  document.getElementById("category_editEr").innerHTML="";
              }    
              else
              {
                  resp=(JSON.parse(xmlhttp.responseText));
                  if(resp.category_edit)
                  {
                      document.getElementById("cateegory_editEr").innerHTML=resp.user_id[0];
                  }
              }
              document.getElementById("category_edit")='';
          }
          else if (xmlhttp.status == 400) {
             alert('There was an error 400');
          }
          else {
              alert('something else other than 200 was returned');
          }
       }
   };
   var requestVariable = 'http://localhost/user-management/public/category/update_category';
   xmlhttp.open("POST", requestVariable, true);
   var data = new FormData(); 
   data.append('category_edit',JSON.stringify({category_edit}));
   xmlhttp.send(data);

}

function delete_category(id)
{
    var confirm1=confirm("Are you sure to want to delete this category?");
    if(confirm1)
    {}
    else
    {
       cancel();
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
            var resp = xmlhttp.responseText; 
            //alert(resp);
                
          }
          else if (xmlhttp.status == 400) {
             alert('There was an error 400');
          }
          else {
              alert('something else other than 200 was returned');
          }
       }
   };
   var requestVariable = 'http://localhost/user-management/public/category/delete_category/' +id;
   xmlhttp.open("POST", requestVariable, true);
   xmlhttp.send();
}

function subcategory_edit_view(id)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
            var resp = (JSON.parse(xmlhttp.responseText)); 
            //alert(resp);
            if(resp)
            {
                for(var item of resp)
                {
                    document.getElementById("subcategory_edit").value=item['subcategory_name'];
                    document.getElementById("subcategory_id").value=item['id'];
                    document.getElementById("category_edit_id").value=item['category_id'];
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
   var requestVariable = 'http://localhost/user-management/public/subcategory/update_subcategory_view/' +id;
   xmlhttp.open("POST", requestVariable, true);
   xmlhttp.send();
}

function delete_subcategory(id)
{
    var confirm1=confirm("Are you sure to want to delete this subcategory?");
    if(confirm1)
    {}
    else
    {
       cancel();
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
            var resp = xmlhttp.responseText; 
            //alert(resp);
                
          }
          else if (xmlhttp.status == 400) {
             alert('There was an error 400');
          }
          else {
              alert('something else other than 200 was returned');
          }
       }
   };
   var requestVariable = 'http://localhost/user-management/public/subcategory/delete_subcategory/' +id;
   xmlhttp.open("POST", requestVariable, true);
   xmlhttp.send();
}

function update_sub_category()
{
    var subcategory=document.getElementById("subcategory_edit").value;
    if(subcategory=="")
    {
        document.getElementById("subcategoryEditEr").innerHTML="subcategory field is required";
        return false;
    }
    var category_id=document.getElementById("category_edit_id").value;
    if(category_id=="")
    {
        document.getElementById("category_edit_idEr").innerHTML="select category";
        return false;
    }
    var id=document.getElementById("subcategory_id").value;
    var subcategory_edit={
        'id':id,
        'subcategory_name':subcategory,
        'category_id':category_id
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
            var resp = xmlhttp.responseText; 
              if(resp=='success') 
              {
                  alert("sucessfully Updated");
                  document.getElementById("subcategory_edit").value="";
                  document.getElementById("subcategoryEditEr").innerHTML="";
                  document.getElementById("category_edit_id").value="";
                  document.getElementById("category_edit_idEr").innerHTML="";
              }    
              else
              {
                  resp=(JSON.parse(xmlhttp.responseText));
                  if(resp.subcategory_name)
                  {
                      document.getElementById("subcategoryEditEr").innerHTML=resp.subcategory_name[0];
                  }
                  if(resp.category_id)
                  {
                      document.getElementById("category_edit_idEr").innerHTML=resp.category_id[0];
                  }
              }
              document.getElementById("subcategory_edit")='';
          }
          else if (xmlhttp.status == 400) {
             alert('There was an error 400');
          }
          else {
              alert('something else other than 200 was returned');
          }
       }
   };
   var requestVariable = 'http://localhost/user-management/public/subcategory/update_subcategory';
   xmlhttp.open("POST", requestVariable, true);
   var data = new FormData(); 
   data.append('subcategory',JSON.stringify({subcategory_edit}));
   xmlhttp.send(data);

}


function remove_assign(id)
{
    var confirm1=confirm("Are you sure to want to remove user from the product?");
    if(confirm1)
    {}
    else
    {
       cancel();
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
            var resp = xmlhttp.responseText; 
            //alert(resp);
                
          }
          else if (xmlhttp.status == 400) {
             alert('There was an error 400');
          }
          else {
              alert('something else other than 200 was returned');
          }
       }
   };
   var requestVariable = 'http://localhost/user-management/public/product/remove_user/' +id;
   xmlhttp.open("POST", requestVariable, true);
   xmlhttp.send();   
}


function removeImage(){
    image ='';
    document.getElementById("edit_image").src = '';
    document.getElementById("edit_image").style.display='none';
    document.getElementById("edit_image_close").style.display='none';
    document.getElementById("edit_input_image").style.display='';
}
function update_product_view(id)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
            var resp =(JSON.parse(xmlhttp.responseText)); 
            document.getElementById("product_id").value=resp.id;
            document.getElementById("product_edit").value=resp.product_name;
            document.getElementById("category_edit_id").value=resp.category_id;
            document.getElementById("product_edit_rate").value=resp.rate;
            var subcategories=loadSubCategoryValues(resp.category_id);
           //console.log(subcategories);
           for (var item of subcategories)
           {
                document.getElementById("subcategory_editid").value=item['id'];
           }
           document.getElementById("description_edit").value=resp.description;
            
            if(resp.product_image){
                image=response.product_image;
                document.getElementById("edit_image").src = 'http://localhost/user-management/public/uploads/' + resp.product_image;
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
          }
          else if (xmlhttp.status == 400) {
             alert('There was an error 400');
          }
          else {
              alert('something else other than 200 was returned');
          }
       }
   };
   var requestVariable = 'http://localhost/user-management/public/product/update_product_view/' +id;
   xmlhttp.open("POST", requestVariable, true);
   xmlhttp.send();     
}

function delete_product(id)
{
    var confirm1=confirm("Are you sure to want to delete this product?");
    if(confirm1)
    {}
    else
    {
       cancel();
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
            var resp = (JSON.parse(xmlhttp.responseText)); 
            //alert(resp);
            document.getElementById("")
                
          }
          else if (xmlhttp.status == 400) {
             alert('There was an error 400');
          }
          else {
              alert('something else other than 200 was returned');
          }
       }
   };
   var requestVariable = 'http://localhost/user-management/public/product/delete_product/' +id;
   xmlhttp.open("POST", requestVariable, true);
   xmlhttp.send();     
}

function select_subcategories()
{
    var selectedindex = document.getElementById("category_filter_id").value;
// console.log(selectedindex);
loadSubCategoryForFilter(selectedindex);
}
function loadSubCategoryForFilter(categoryId) {
   var xmlhttp = new XMLHttpRequest();
   xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
          var resp = (JSON.parse(xmlhttp.responseText));
          var str = "<option value='' selected>Select SubCategory</option>"
  for (var item of resp) {
    str += "<option value='" + item['id'] + "'>" + item['subcategory_name'] + "</option>"
   }
   document.getElementById("subcategory_filter_id").innerHTML = str;
          }
          else if (xmlhttp.status == 400) {
             alert('There was an error 400');
          }
          else {
              alert('something else other than 200 was returned');
          }
       }
   };
   var requestVariable = 'http://localhost/user-management/public/product/get_subcategories_forfilter/'+categoryId;
   xmlhttp.open("GET", requestVariable, true);
   xmlhttp.send();

}

function product_filter()
{
    var product_name=document.getElementById("product_filter").value;
    var category_id=document.getElementById("category_filter_id").value;
    var subcategory_id=document.getElementById("subcategory_filter_id").value;
    var xmlhttp = new XMLHttpRequest();
       xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
             if (xmlhttp.status == 200) {
               var resp = xmlhttp.responseText;     
               document.getElementById("myDiv").innerHTML=resp;          
            //    document.write(resp);
               document.getElementById("product_filter").value = product_name;
               document.getElementById("category_filter_id").value = category_id;
               document.getElementById("subcategory_filter_id").value=subcategory_id;

             }
             else if (xmlhttp.status == 400) {
                alert('There was an error 400');
             }
             else {
                 alert('something else other than 200 was returned');
             }
          }
      };
      var requestVariable = 'http://localhost/user-management/public/product/products_list?search=' + product_name +       
      '&category_id='+ category_id
      '&subcategory_id='+ subcategory_id;
      xmlhttp.open("GET", requestVariable, true);
    //    var data = new FormData();
    //    data.append('filter',  JSON.stringify({to_filter}));
      xmlhttp.send();

}

function reset_filter()
{
    document.getElementById("product_filter").value="";
    document.getElementById("category_filter_id").value="";
    document.getElementById("subcategory_filter_id").value="";
    product_filter();
}
