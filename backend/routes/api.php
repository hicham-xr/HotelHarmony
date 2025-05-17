<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\ClientAuthController;
use App\Http\Controllers\Api\ChambreController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ReservationController;

Route::prefix('auth')->group(function () {
    Route::post('/admin/login', [AdminAuthController::class, 'login']);
    Route::post('/client/register', [ClientAuthController::class, 'register']);
    Route::post('/client/login', [ClientAuthController::class, 'login']);
    Route::get('/test', function () {
        return 'API test';
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/chambres', [ChambreController::class, 'index']);
    Route::post('/chambres', [ChambreController::class, 'store']);
    Route::put('/chambres/{id}', [ChambreController::class, 'update']);
    Route::delete('/chambres/{id}', [ChambreController::class, 'destroy']);

    Route::get('/users', [UserController::class, 'index']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    Route::get('/reservations', [ReservationController::class, 'index']);
    Route::put('/reservations/{id}/status', [ReservationController::class, 'updateStatus']);
});