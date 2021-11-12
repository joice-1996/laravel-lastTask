<?php

namespace App\Modules\Client\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $table="clients";
    public function users()
    {
        return $this->belongsTo('App\User','user_id','id');
    }

    public function client_branches()
    {
        return $this->hasMany('App\Modules\Client\Models\ClientBranch','client_id','id');
    }
    public function client_phones()
    {
        return $this->hasMany('App\Modules\Client\Models\ClientContact','client_id','id');
    }
    public function client_cart_products()
    {
        return $this->hasMany('App\Modules\Client\Models\ClientProductCart','client_id','id');
    }

}
