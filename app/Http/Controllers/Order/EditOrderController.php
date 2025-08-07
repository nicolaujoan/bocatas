<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Order;

class EditOrderController extends Controller
{
    public function update(Request $request)
{
    $orderId = $request->input('order_id');
    $details = $request->input('details');

    \Log::info('Updating order ID: ' . $orderId);
    \Log::info('Details:', $details);

    $order = Order::where('order_id', $orderId)->firstOrFail();

    $order->details = $details; // Assuming $details is array, and cast to array is set in model
    $order->save();

    return redirect()->route('pedidos.show', $orderId)
        ->with('success', 'Pedido actualizado correctamente.');
}

    public function show($id)
    {
        $order = Order::where('order_id', $id)->firstOrFail();

        return Inertia::render('DetallePedido', [
            'order' => $order,
        ]);
    }
}