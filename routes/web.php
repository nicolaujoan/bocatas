<?php

use App\Http\Controllers\Order\CreateOrderController;
use App\Http\Controllers\Order\ListOrdersController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Listar pedidos
Route::get('/pedidos', [ListOrdersController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('pedidos');

// Crear pedido
Route::get('/pedidos/create', [CreateOrderController::class, 'create'])
    ->middleware(['auth', 'verified'])
    ->name('pedidos/create');

Route::post('pedidos/store', [CreateOrderController::class, 'store'])
    ->middleware(['auth', 'verified'])
    ->name('pedidos/store');

// Detalle pedido
Route::get('/pedidos/{id}', [ListOrdersController::class, 'show'])
    ->middleware(['auth', 'verified'])
    ->name('pedidos.show');

require __DIR__ . '/auth.php';
