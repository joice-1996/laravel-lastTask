var cartdata=[];
var product_xmlhttp = new XMLHttpRequest();
product_xmlhttp.onreadystatechange = function() {
   if (product_xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
      if (product_xmlhttp.status == 200) {
        product_data = JSON.parse(product_xmlhttp.responseText);             
        //console.log(product_data);
      }
   }
};
var requestVariable = 'http://localhost/Laravel-lastTask/public/client/get_product';
product_xmlhttp.open("GET", requestVariable, true);
product_xmlhttp.send();

//Products add to cart
function productAddToCart()
{
	console.log(1);
	var product_id=document.getElementById("productname").value;
	if(product_id=="")
	{
		document.getElementById("productnameEr").innerHTML="product field is required";
		return false;
	}
	var start_date=document.getElementById("start_date").value;
	if(start_date=="")
	{
		document.getElementById("start_dateEr").innerHTML="Start Date is required";
        return false;
	}
	var expiry_date=document.getElementById("expiry_date").value;
    if(expiry_date == "")
    {
        document.getElementById("expiry_dateEr").innerHTML="Expiry Date is required";
        return false;
    }
	var license=document.getElementById("license").value;
    if(license == 0)
    {
        document.getElementById("licenseEr").innerHTML="no.of license is required";
        return false;
    }
	var license_amount=document.getElementById("license_amount").value;
     if(license_amount == "")
     {
         document.getElementById("license_amountEr").innerHTML="license amount is required";
         return false;
     }
	  //installation amount  field
	  var installation_charge=document.getElementById("installation_charge").value;
	  if(installation_charge == "")
	  {
		  document.getElementById("installation_chargeEr").innerHTML="Installation Charge is required";
		  return false;
	  }
	   //platform amount  field
	   var platform_charge=document.getElementById("platform_charge").value;
	   if(platform_charge == "")
	   {
		   document.getElementById("platform_chargeEr").innerHTML="Platform Charge is required";
		   return false;
	   }
	   var customization_description=document.getElementById("customization_description").value;
	   var customization_amount=document.getElementById("customization_amount").value;

	   document.getElementById("table1").style.display = "block";
    
	   if ($("#productname").val() != null && $("#productname").val() != '') {
   
		  //alert(1);
		  
		  var datas= {
		   "id":product_id,
		   "start_date":start_date,
		   "expiry_date":expiry_date,
		   "licenses":license,
		   "license_amount":license_amount,
		   "customization_description":customization_description,
		   "customization_amount": customization_amount,
		   "installation_charge":installation_charge,
		   "platform_charge":platform_charge
		  };
		   cartdata.push(datas);
		   console.log(cartdata);
	    // Add product to Table
        productAddToTable();
        //cartdata.forEach(productAddToTable);

        // Clear form fields
        formClear();

        // Focus to product name field
        $("#productname").focus();
    }

}

function productAddToTable() {
     
    
	/*  document.getElementById("div1").style.display = "block";
	 document.write(1); */
	 // First check if a <tbody> tag exists, add one if not
	 if ($("#productTable tbody").length == 0) {
		 $("#productTable").append("<tbody></tbody>");
	 }
	 
 
	 // Append product to the table
	 var product_id=$("#productname").val();
	 
  $("#productTable tbody").append("<tr id='"+product_id+"'>" +
		 "<td>" + product_data[$("#productname").val()]+ "</td>" +
		 "<td>" + $("#start_date").val() + "</td>" +
		 "<td>" + $("#expiry_date").val() + "</td>" +
		 "<td>" + $("#license").val() + "</td>" +
		 "<td>" + $("#license_amount").val() + "</td>" +
		 "<td>" + $("#customization_description").val() + "</td>" +
		 "<td>" + $("#customization_amount").val() + "</td>" +
		 "<td>" + $("#installation_charge").val() + "</td>" +
		 "<td>" + $("#platform_charge").val() + "</td>" +
		 "<td>" +
		 "<button type='button' onclick='productDelete("+product_id+");' class='btn btn-default btn-primary'>" +
		 "Delete" +
		 "</button>" +
		 "</td>" +
		 "</tr>"); 
 
 }
 
 function formClear() {
	 $("#productname").val("");
	 $("#start_date").val("");
	 $("#expiry_date").val("");
	 $("#license").val("");
	 $("#license_amount").val("");
	 $("#customization_description").val("");
	 $("#customization_amount").val("");
	 $("#installation_charge").val("");
	 $("#platform_charge").val("");
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

 //validate_clientForm
 function validate_clientForm()
 {
	var company_name=document.forms["myForm"]["company_name"].value;
    if(company_name=="")
    {
        document.getElementById("company_name").innerHTML="company name field is required";
        return false;
    }
    //alert(1);
     var branches=document.forms["myForm"]["branches"].value;
  /* branches1.push(branches);
   alert(branches1);  */
    var contact_person=document.forms["myForm"]["contact_person_name"].value;
    if(contact_person=="")
    {
        document.getElementById("contact_person_name").innerHTML="contact filed is required";
        return false;
    }

    var email=document.forms["myForm"]["email"].value;
    if(email=="")
    {
        document.getElementById("email").innerHTML="email field is required";
    }

    var phone=document.getElementById("phone").value;
    //alert(phone);
    if(phone=="")
    {
        document.getElementById("phone_numbers").innerHTML="phone number filed is required";
        return false;
    }
    


    var address=document.forms["myForm"]["address"].value;
    if(address=="")
    {
        document.getElementById("addressEr").innerHTML="address filed is required";
        return false;
    }

    var company_logo=document.forms["myForm"]["company_logo"].value;
    

    var consultant=document.getElementById("consultant").value;
	if(consultant=="")
	{
		document.getElementById("consultantEr").innerHTML="Select Consultant";
		return false;
	}

	var companydata= {
        "compayname":company_name,
        "branches":branches,
        "contact_person":contact_person,
        "email":email,
        "contact_number":phone,
        "address":address,
        "consultant":consultant
       };
	   if (Array.isArray(cartdata) && cartdata.length == 0)
	   {
		  alert("add product details");
	   }
	   else
	   {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		   if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
			  if (xmlhttp.status == 200) {
				var resp = xmlhttp.responseText; 
				if(resp=='success')
				{
					//alert("successfully inserted");
					
					document.getElementById("company_names").value="";
					document.getElementById("branches").value="";
					document.getElementById("contact_person_names").value="";
					document.getElementById("emails").value="";
					document.getElementById("phone").value="";
					document.getElementById("addresss").value="";
					document.getElementById("company_logoo").value="";
					document.getElementById("consultant").value="";
					document.getElementById("company_name").innerHTML="";
					document.getElementById("contact_person_name").innerHTML="";
					document.getElementById("phone_numbers").innerHTML="";
					document.getElementById("addressEr").innerHTML="";
					document.getElementById("email").innerHTML="";
					document.getElementById("consultant").innerHTML="";
					document.getElementById("brachesEr").innerHTML="";
					document.getElementById("table1").style.display="none";
					
					client_list('success');
					
					
				}
				else
				{
					resp=(JSON.parse(xmlhttp.responseText));
                  if(resp.compayname)
                  {
                      document.getElementById("company_name").innerHTML=resp.compayname[0];
                  }
                  if(resp.contact_person)
                  {
                      document.getElementById("contact_person_name").innerHTML=resp.contact_person[0];
                  }
                  if(resp.contact_number)
                  {
                      document.getElementById("phone_numbers").innerHTML=resp.contact_number[0];
                  }
                  if(resp.address)
                  {
                      document.getElementById("addressEr").innerHTML=resp.address[0];
                  }
                  if(resp.email)
                  {
                      document.getElementById("email").innerHTML=resp.email[0];
                  }
				  if(resp.consultant)
                  {
                      document.getElementById("consultant").innerHTML=resp.consultant[0];
                  }
				  if(resp.branches)
                  {
                      document.getElementById("brachesEr").innerHTML=resp.branches[0];
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
	   var requestVariable = 'http://localhost/Laravel-lastTask/public/client/add_client';
	   xmlhttp.open("POST", requestVariable, true);
		var data = new FormData(); 
		data.append('logo',  document.getElementById("company_logoo").files[0]);
		data.append('client',  JSON.stringify({companydata}));
		data.append('product',  JSON.stringify({cartdata}));
	   xmlhttp.send(data);
	}

 }

 //Reset Form
 function reset_form()
 {
    document.getElementById("company_names").value="";
    document.getElementById("branches").value="";
    document.getElementById("contact_person_names").value="";
    document.getElementById("emails").value="";
    document.getElementById("phone").value="";
    document.getElementById("addresss").value="";
    document.getElementById("company_logoo").value="";
    document.getElementById("consultant").value="";
	document.getElementById("company_name").innerHTML="";
	document.getElementById("contact_person_name").innerHTML="";
	document.getElementById("phone_numbers").innerHTML="";
	document.getElementById("addressEr").innerHTML="";
	document.getElementById("email").innerHTML="";
	document.getElementById("consultant").innerHTML="";
	document.getElementById("brachesEr").innerHTML="";
	document.getElementById("table1").style.display="none";
	document.getElementById("table1").style.display='';


 }

 //client list
 function client_list(val)
 {
	var product_xmlhttp = new XMLHttpRequest();
	product_xmlhttp.onreadystatechange = function() {
	   if (product_xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
		  if (product_xmlhttp.status == 200) {
			var resp = xmlhttp.responseText;
                document.getElementById("MyDiv").innerHTML=resp; 
				if (val == 'success') {
					document.getElementById("success").innerHTML="successfully inserted";
				}
		  }
	   }
	};
	var requestVariable = 'http://localhost/Laravel-lastTask/public/client';
	product_xmlhttp.open("GET", requestVariable, true);
	product_xmlhttp.send();
	
 }
 

