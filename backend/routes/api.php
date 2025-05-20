<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\ClientAuthController;
use App\Http\Controllers\Api\ChambreController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\MesReservationController;

Route::prefix('auth')->group(function () {
    Route::post('/admin/login', [AdminAuthController::class, 'login']);
    Route::post('/client/register', [ClientAuthController::class, 'register']);
    Route::post('/client/login', [ClientAuthController::class, 'login']);
    Route::get('/test', function () {
        return response()->json(['message' => 'API test']);
    });
});

Route::get('/chambres/test', [ChambreController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [ClientAuthController::class, 'user']);
    Route::apiResource('chambres', ChambreController::class);
    Route::get('/users', [UserController::class, 'index']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::get('/client/profile', [ClientController::class, 'profile']);
    Route::get('/reservations', [ReservationController::class, 'index']);
    Route::post('/reservations', [ReservationController::class, 'store']);
    Route::put('/reservations/{id}', [ReservationController::class, 'updateStatus']);
    Route::get('/mes-reservations', [MesReservationController::class, 'index']);
    Route::delete('/mes-reservations/{id}', [MesReservationController::class, 'destroy']);
});
