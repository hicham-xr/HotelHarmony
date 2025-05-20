<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Chambre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ChambreController extends Controller
{
    public function index()
{
    $chambres = Chambre::all()->map(function ($chambre) {
        $chambre->photo_url = $chambre->photo ? asset('storage/' . $chambre->photo) : null;
        return $chambre;
    });

    return response()->json($chambres);
}
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|string|max:255',
            'prix' => 'required|numeric|min:0',
            'nbMaxPersonne' => 'required|integer|min:1',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('photos', 'public');
            $validated['photo'] = $path;
        }

        $validated['id_admin'] = 1; // Ou mettre un id fixe si pas encore d'auth

        $chambre = Chambre::create($validated);
        $chambre->photo_url = asset('storage/' . $chambre->photo);

        return response()->json($chambre, 201);
    }

    public function update(Request $request, $id)
    {
        $chambre = Chambre::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'description' => 'sometimes|nullable|string',
            'type' => 'sometimes|string|max:255',
            'prix' => 'sometimes|numeric|min:0',
            'nbMaxPersonne' => 'sometimes|integer|min:1',
        ]);

        $chambre->update($validated);
        return response()->json($chambre);
    }

    public function destroy($id)
    {
        $chambre = Chambre::findOrFail($id);

        if ($chambre->photo) {
            Storage::disk('public')->delete($chambre->photo);
        }

        $chambre->delete();

        return response()->json(['message' => 'Chambre supprimée avec succès']);
    }
    public function show($id)
    {
        $chambre = Chambre::findOrFail($id);
        $chambre->photo_url = $chambre->photo ? asset('storage/' . $chambre->photo) : null;
        return response()->json($chambre);
    }
}
