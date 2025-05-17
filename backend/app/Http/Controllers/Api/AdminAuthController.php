<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        // Validation des champs
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Recherche de l'admin
        $admin = Admin::where('email', $credentials['email'])->first();

        // Vérification du mot de passe
        if ($admin && Hash::check($credentials['password'], $admin->password)) {
            // Création du token avec Sanctum
            $token = $admin->createToken('admin-token')->plainTextToken;

            return response()->json([
                'token' => $token,
                'user' => $admin,
                'role' => 'admin'
            ]);
        }

        // Identifiants incorrects
        return response()->json(['message' => 'Identifiants invalides'], 401);
    }

    public function logout(Request $request)
    {
        // Révoque le token de l'utilisateur connecté
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnexion réussie']);
    }
}
