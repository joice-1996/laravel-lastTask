<?php

namespace App\Modules\Client\Models;

use Illuminate\Database\Eloquent\Model;

class ClientProductCart extends Model
{
    protected $table="client_product_carts";
    
    public function products()
    {
        return $this->belongsTo('App\Modules\Client\Models\Product','product_id','id');
    }
}
