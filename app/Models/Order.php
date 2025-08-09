<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id', 'user_id', 'name', 'details', 'status', 'phone_number', 'team_id'
    ];

    protected $casts = [
        'details' => 'json',  
    ];
}
