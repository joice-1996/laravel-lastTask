var cartdata=[];
var sum=0;
var product_xmlhttp = new XMLHttpRequest();
product_xmlhttp.onreadystatechange = function() {
   if (product_xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
      if (product_xmlhttp.status == 200) {
        product_data = JSON.parse(product_xmlhttp.responseText);             
        //console.log(product_data);
      }
   }
};
var requestVariable = 'http://localhost/user-management/public/order/get_product';
product_xmlhttp.open("GET", requestVariable, true);
product_xmlhttp.send();


function productAddToCart()
{
    var user_id=document.getElementById("user_id").value;
    if(user_id=="")
    {
        document.getElementById("user_idEr").innerHTML="Select Order";
        return false;
    }
    var product_id=document.getElementById("product_id").value;
    if(product_id=="")
    {
        document.getElementById("productIdEr").innerHTML="Select Product";
        return false;
    }
    var product_rate=document.getElementById("product_rate").value;
    if(product_rate==0)
    {
        document.getElementById("rateEr").innerHTML="Please Enter Rate of the product";
        return false;
    }
    var quantity=document.getElementById("quantity").value;
    if(quantity=="")
    {
        document.getElementById("quantityEr").innerHTML="Enter quantity details";
        return false;
    }
    var total_rate=document.getElementById("total_rate").value;
    document.getElementById("table1").style.display = "block";
    
    if ($("#product_id").val() != null && $("#product_id").val() != '') {

       //alert(1);
       
       var datas= {
        "product_id":product_id,
        "rate":product_rate,
        "quantity":quantity,
        "total_rate":total_rate,
       };
        cartdata.push(datas);
        //console.log(cartdata);
        
        
        
    
       
        // Add product to Table
        productAddToTable();
        //cartdata.forEach(productAddToTable);

        

        // Clear form fields
        //formClear();

        // Focus to product name field
        $("#product_id").focus();
    }
    

}

function productAddToTable()
{
    if ($("#productTable tbody").length == 0) {
        $("#productTable").append("<tbody></tbody>");
    }
    

    // Append product to the table
    var product_id1=$("#product_id").val();
    $("#productTable tbody").append("<tr id='"+product_id1+"'>" +
        "<td>" + product_data[$("#product_id").val()]+ "</td>" +
        "<td>" + $("#product_rate").val() + "</td>" +
        "<td>" + $("#quantity").val() + "</td>" +
        "<td>" + $("#total_rate").val() + "</td>" +
        "<td>" +
        "<button type='button' onclick='productDelete("+product_id1+");' class='btn btn-default btn-primary'>" +
        "Delete" +
        "</button>" +
        "</td>" +
        "</tr>"); 
}

 function formClear() {
    $("#product_id").val("");
    $("#product_rate").val("");
    $("#quantity").val("");
    $("#total_rate").val("");
    
} 



function productDelete(ctl) {
    console.log(1);
    cartdata.splice(cartdata.findIndex(function(i){
       return i.id === ctl;
     }), 1); 
    console.log(cartdata);
    deleteFromCart(ctl);
    //$(ctl).parents("tr").remove();
    alert("deleted");
}
function deleteFromCart(id)
{
    var data=document.getElementById(id);
    data.parentNode.removeChild(data);
}




//Find product with user_id

function products()
{
    var selectedindex = document.getElementById("user_id").value;
// console.log(selectedindex);
loadProducts(selectedindex);
}
function loadProducts(userId) {
   var xmlhttp = new XMLHttpRequest();
   xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
          var resp = (JSON.parse(xmlhttp.responseText));
          var str = "<option value='' selected>Open this select menu</option>"
  for (var item of resp) {
    str += "<option value='" + item['id'] +"'>" + item['product_name'] + "</option>"
   }
   document.getElementById("product_id").innerHTML = str;
          }
          else if (xmlhttp.status == 400) {
             alert('There was an error 400');
          }
          else {
              alert('something else other than 200 was returned');
          }
       }
   };
   var requestVariable = 'http://localhost/user-management/public/order/get_products/'+userId;
   xmlhttp.open("GET", requestVariable, true);
   xmlhttp.send();
}

//get the product rate

function getRate()
{
    console.log(1);
  var selectedIndex=document.getElementById("product_id").value;
  getproductRate(selectedIndex);  
}
function getproductRate(productId)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
           var resp = (JSON.parse(xmlhttp.responseText));
           document.getElementById("product_rate").value=resp.rate;
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };
    var requestVariable = 'http://localhost/user-management/public/order/get_rate/'+productId;
    xmlhttp.open("GET", requestVariable, true);
    xmlhttp.send(); 
     
}

//To Get Total Rate
function total_rate() {
    var rate = document.getElementById('product_rate').value;	
    var quantity = document.getElementById('quantity').value;
    var total_rate = rate * quantity;
    document.getElementById("total_rate").value = total_rate;
    
}
//Order Now

function order_now()
{
    if (Array.isArray(cartdata) && cartdata.length == 0)
    {
        productAddToCart();
    }
    

    var user_id=document.getElementById("user_id").value;
    //alert(cartdata);
    for(item of cartdata)
        {
            sum=sum+parseInt(item['total_rate']);
            document.getElementById("final_rate").value=sum; 

        }
        var final_rate=document.getElementById("final_rate").value;
    
    var order={
        'user_id':user_id,
        'final_rate':final_rate
       
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
            var resp = xmlhttp.responseText; 
              if(resp=='success') 
              {
                  alert("sucessfully inserted");
                  document.getElementById("user_id").value="";
                  document.getElementById("product_id").value="";
                  document.getElementById("product_rate").value="";
                  document.getElementById("quantity").value="";
                  document.getElementById("total_rate").value="";
              }    
             /*  else
              {
                  resp=(JSON.parse(xmlhttp.responseText));
                  if(resp.user_id)
                  {
                      document.getElementById("user_idEr").innerHTML=resp.user_id[0];
                  }
                  if(resp.product_id)
                  {
                      document.getElementById("productidEr").innerHTML=resp.product_id[0];
                  }
                  if(resp.product_rate)
                  {
                      document.getElementById("rateEr").innerHTML=resp.product_rate[0];
                  }
                  if(resp.quantity)
                  {
                      document.getElementById("quantityEr").innerHTML=resp.quantity[0];
                  }
              } */
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
   var requestVariable = 'http://localhost/user-management/public/order/order_now';
   xmlhttp.open("POST", requestVariable, true);
   var data = new FormData(); 
   data.append('order',JSON.stringify({order}));
   data.append('order_details',JSON.stringify({cartdata}));
   xmlhttp.send(data);
    

}

//order close
function order_close()
{
    document.getElementById("user_id").value="";
    document.getElementById("user_idEr").innerHTML="";
    document.getElementById("product_id").value="";
    document.getElementById("productidEr").innerHTML="";
    document.getElementById("product_rate").value="";
    document.getElementById("rateEr").innerHTML="";
    document.getElementById("quantity").value="";
    document.getElementById("quantityEr").innerHTML="";
    document.getElementById("total_rate").value="";
}

//order view
function order_view(id)
{
    var xmlhttp = new XMLHttpRequest();
   xmlhttp.onreadystatechange = function() {
       if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
          if (xmlhttp.status == 200) {
          var resp = (JSON.parse(xmlhttp.responseText));
          }
          else if (xmlhttp.status == 400) {
             alert('There was an error 400');
          }
          else {
              alert('something else other than 200 was returned');
          }
       }
   };
   var requestVariable = 'http://localhost/user-management/public/order/order_view/'+id;
   xmlhttp.open("GET", requestVariable, true);
   xmlhttp.send();
}
