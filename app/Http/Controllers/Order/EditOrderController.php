<?php

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class CreateOrderController extends Controller
{
    public function update(Request $request)
    {
        return Inertia::render('DetallePedido');
    }
}