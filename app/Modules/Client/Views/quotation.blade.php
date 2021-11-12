@include('header')

<main>
  @include('menu')

    <div class="right-main">
    @include('topBar')
        <div class="main-wrapper client-detaiils">
            <div class="row page-head">
                <div class="col-md-8 page-name">
                    <h4>Client Details</h4>
                </div>

            </div>

            <div class="row wrapper">
                <div class="col-lg-3 basic-info">
                @foreach($clients as $client)
                <img src="{{asset('uploads/'.$client->company_logo)}}" alt="img" class="logo img-fluid">
                  
                    <h6>{{$client->company_name}}</h6>
                    <div class="colum-row">
                        Phone
                        @foreach($client->client_phones as $value)      
                        <span>{{$value->contact_number}}</span> @endforeach
                    </div>
                    <div class="colum-row">
                    Email
                        <span>{{$client->email}}</span>
                    </div>
                    <div class="colum-row">
                        Address
                        <span>{{$client->address}}</span>
                    </div>

                    <div class="colum-row">
                        Company branches
                        @foreach($client->client_branches as $value)      
                        <span>{{$value->branches}}</span> @endforeach
                    </div>
                    <div class="colum-row">
                   Product
                   @foreach($client->client_cart_products as $value)
                        <span>{{$value->products['product_name']}}</span> 
                        @endforeach
                    </div>
                    
                    <div class="colum-row">
                    Customization Description
                        @foreach($client->client_cart_products as $value)  
                        <span>{{$value->customization_description}}</span>
                    </div>
                    <div class="colum-row">
                    Customization Amount
                        <span>{{$value->customization_amount}}</span>
                    </div>
                    <div class="colum-row">
                    Start_date
                        <span>{{$value->start_date}}</span>
                    </div>
                    <div class="colum-row">
                    Expiry_date
                        <span>{{$value->expiry_date}}</span>
                    </div>
                    <div class="colum-row">
                    Number of license
                        <span>{{$value->no_of_licences}}</span>
                    </div>
                    <div class="colum-row">
                    License Amount
                        <span>{{$value->license_amount}}</span>
                    </div>
                    <div class="colum-row">
                    Platform Charge
                        <span>{{$value->platform_charge}}</span> @endforeach
                    </div>
                   

                    
                    
                    
                  
                    <div class="colum-row">
                        Consultant
                        <span>{{$client->users['name']}}</span>
                    </div>
                   
                   

                    @endforeach
                </div>
                
                <div class="col-lg-9 tab-section">
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Quatation</button>
                            <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Invoice</button>
                            <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">History</button>
                          
                        </div>
                    </nav>

                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">

                            <div class="col text-end mt-15 mb-15">
                                <button type="button" class="primary-btn custom-btn add" data-bs-toggle="modal" data-bs-target="#generateQuotation">Generate Quotation</button>
                            </div>
                            <table class="table table-striped table-hover mt-15">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </table>
                        </div>
                        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"><table class="table table-striped table-hover mt-15">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                 
                                </tbody>
                            </table></div>
                        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab"><table class="table table-striped table-hover mt-15">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   
                                </tbody>
                            </table></div>
                   
                    <div class="tab-pane fade show active" id="nav-licence" role="tabpanel" aria-labelledby="nav-home-tab">

                           
                        
                        </div>
                     </div>
                </div>

            </div>

        </div>
    </div>
</main>

<!-- Modal -->
<div class="modal fade" id="generateQuotation" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Generate Quatation</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row gx-4 gy-3">
                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="form-label">xxx</label>
                        <input type="text" class="form-control" placeholder="" aria-label="First name">
                    </div>

                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="form-label">xxx</label>
                        <input type="text" class="form-control" placeholder="" aria-label="First name">
                    </div>

                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="form-label">xxx</label>
                        <input type="text" class="form-control" placeholder="" aria-label="First name">
                    </div>

                    <div class="col-md-6">
                        <label for="exampleFormControlInput1" class="form-label">xxx</label>
                        <input type="text" class="form-control" placeholder="" aria-label="First name">
                    </div>

                </div>
            </div>
            <div class="modal-footer">

                <button type="button" class="custom-btn save primary-btn">Save</button>
            </div>
        </div>
    </div>
</div>




@include('footer')
