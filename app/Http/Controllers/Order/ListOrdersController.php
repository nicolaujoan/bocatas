<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;

class ListOrdersController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::latest()->take(10)->get();

        return Inertia::render('Pedidos', [
            'pedidos' => $orders,
        ]);
    }

    public function show($id)
    {
        $order = Order::where('order_id', $id)->firstOrFail();

        return Inertia::render('DetallePedido', [
            'order' => $order,
        ]);
    }
}
