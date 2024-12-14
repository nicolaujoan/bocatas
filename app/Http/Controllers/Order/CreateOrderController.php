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
        // get the order from the request data
        $details = $request->all()[0];

        // Generate the order id
        $user_id = auth()->id();
        $time = time();
        $order_id = sha1($user_id . $time);

        // Create the order
        $order = Order::create([
            'order_id' => $order_id,
            'user_id' => $user_id,
            'details' => $details,
            'status' => OrderStatus::CREATING
        ]);

        return response()->json(['order' => $order], 201);
    }


}
