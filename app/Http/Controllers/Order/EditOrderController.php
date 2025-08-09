<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\DB;

class EditOrderController extends Controller
{
    public function update(Request $request)
{
    $orderId = $request->input('order_id');
    $details = $request->input('details');

    if (!is_string($details)) {
        $details = json_encode($details);
    }

    \Log::info('Updating order ID: ' . $orderId);
    \Log::info('Details JSON: ' . $details);

    DB::table('orders')
        ->where('order_id', $orderId)
        ->update(['details' => $details]);

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