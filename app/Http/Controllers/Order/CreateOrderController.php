<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Domain\OrderStatus;
use Illuminate\Http\Request;
use App\Models\Order;
use Inertia\Inertia;

class CreateOrderController extends Controller
{
    public function create(Request $request)
    {
        return Inertia::render('NuevoPedido');
    }

    public function store(Request $request)
    {
        // Generate the order id
        $user_id = auth()->id();
        $username = auth()->user()->name;
        $time = time();
        $order_id = $user_id . $username . $time;


        // Create the order
        $order = Order::create([
            'order_id' => $order_id,
            'user_id' => $user_id,
            'username' => $username,
            'details' => [],
            'status' => OrderStatus::CREATING
        ]);

        return response()->json(['order' => $order], 201);
    }


}
