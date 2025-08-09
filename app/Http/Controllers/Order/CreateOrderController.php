<?php

namespace App\Http\Controllers\Order;

use App\Domain\OrderStatus;
use App\Http\Controllers\Controller;
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
        $details = $request->all();

        // Generate the order id
        $user_id = auth()->id();
        $time = time();
        $order_id = sha1($user_id . $time);

        \Log::info('Creating order with team: ' . auth()->user()->team_id);

        // Create the order
        Order::create([
            'order_id' => $order_id,
            'user_id' => $user_id,
            'details' => $details,
            'status' => OrderStatus::CREATED,
            'team_id' => auth()->user()->team_id,
        ]);

        return redirect()->route('pedidos.show', ['id' => $order_id]);
    }


}
