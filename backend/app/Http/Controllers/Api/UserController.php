<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = Client::select('id', 'nom', 'prenom', 'email')->get();
        return response()->json($users);
    }

    public function destroy($id)
    {
        $user = Client::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Utilisateur supprimé']);
    }
}