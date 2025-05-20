<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Client;
use Illuminate\Support\Facades\Hash;

class ClientAuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::guard('client')->attempt($credentials)) {
            $client = Auth::guard('client')->user();
            $token = $client->createToken('client_token')->plainTextToken;
            return response()->json(['token' => $token, 'client' => $client]);
        }

        return response()->json(['message' => 'Identifiants incorrects'], 401);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:clients',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $client = Client::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $client->createToken('client_token')->plainTextToken;

        return response()->json(['token' => $token, 'client' => $client], 201);
    }

    public function user(Request $request)
    {
        return response()->json($request->user('client'));
    }
}
