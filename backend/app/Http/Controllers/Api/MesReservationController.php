<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Chambre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MesReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::with('chambre')
            ->where('id_client', Auth::id())
            ->get();
        return response()->json($reservations);
    }

    public function destroy($id)
    {
        $reservation = Reservation::where('id_client', Auth::id())->findOrFail($id);
        $chambre = Chambre::findOrFail($reservation->id_chambre);

        DB::beginTransaction();
        try {
            if ($reservation->etat) {
                $chambre->etat = 0;
                $chambre->save();
            }

            $reservation->delete();
            DB::commit();
            return response()->json(['message' => 'Réservation supprimée avec succès']);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Reservation deletion failed: ' . $e->getMessage());
            return response()->json(['message' => 'Erreur lors de la suppression: ' . $e->getMessage()], 500);
        }
    }
}
