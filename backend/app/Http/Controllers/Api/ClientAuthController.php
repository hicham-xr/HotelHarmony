<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ClientAuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $client = Client::where('email', $credentials['email'])->first();

        if ($client && Hash::check($credentials['password'], $client->password)) {
            $token = $client->createToken('client-token')->plainTextToken;

            return response()->json([
                'token' => $token,
                'user' => $client,
                'role' => 'client',
            ]);
        }

        return response()->json(['message' => 'Identifiants invalides'], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnexion réussie']);
    }
    
    public function register(Request $request)
{
    $validatedData = $request->validate([
        'nom' => 'required|string|max:255',
        'prenom' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:clients',
        'password' => 'required|string|min:6|confirmed',
    ]);

    $client = Client::create([
        'nom' => $validatedData['nom'],
        'prenom' => $validatedData['prenom'],
        'email' => $validatedData['email'],
        'password' => Hash::make($validatedData['password']),
    ]);

    $token = $client->createToken('client-token')->plainTextToken;

    return response()->json([
        'token' => $token,
        'user' => $client,
        'role' => 'client',
    ], 201);
}


}