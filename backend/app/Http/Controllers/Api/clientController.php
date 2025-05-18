<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Support\Facades\Auth;
class clientController extends Controller
{
    // Récupérer le profil du client authentifié
    public function profile()
    {

        return response()->json(Auth::user());
    }
}
