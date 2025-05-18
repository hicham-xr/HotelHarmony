<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Chambre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::with('client')->get();
        return response()->json($reservations);
    }

    /**
     * Mise à jour du statut d'une réservation et de l'état de la chambre associée
     */
    public function updateStatus(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $reservation = Reservation::findOrFail($id);
            $reservation->etat = $request->etat;
            $reservation->save();

            // Si la réservation est confirmée (etat = 1), on met la chambre en indisponible
            if ($request->etat == 1) {
                $chambre = Chambre::findOrFail($reservation->id_chambre);
                $chambre->etat = 1; // Indisponible
                $chambre->save();
            }

            DB::commit();
            return response()->json(['message' => 'Statut mis à jour et chambre marquée comme indisponible']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Erreur lors de la mise à jour: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Supprime une réservation
     */
    public function destroy($id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();

        return response()->json(['message' => 'Réservation supprimée avec succès']);
    }

    /**
     * Affiche les détails d'une réservation spécifique
     */
    public function show($id)
    {
        $reservation = Reservation::with('client')->findOrFail($id);
        return response()->json($reservation);
    }

    /**
     * Crée une nouvelle réservation
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_client' => 'required|exists:clients,id',
            'id_chambre' => 'required|exists:chambres,id',
            'dateArrive' => 'required|date',
            'dateDepart' => 'required|date|after:dateArrive',
            'etat' => 'sometimes|integer',
        ]);

        $reservation = Reservation::create($validated);
        return response()->json($reservation, 201);
    }
}
