<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Order;
use Request;

class EditOrderController extends Controller
{
    public function update(Request $request)
    {
        return Inertia::render('DetallePedido');
    }

    public function show($id)
    {
        $order = Order::where('order_id', $id)->firstOrFail();

        return Inertia::render('DetallePedido', [
            'order' => $order,
        ]);
    }
}