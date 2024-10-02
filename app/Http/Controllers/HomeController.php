<?php

namespace App\Http\Controllers;

use App\Jobs\SendMessage;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    
    public function index() {
        $accountId = Auth::id();

        $user = User::where('id', $accountId)->select([
            'id', 'name', 'email',
        ])->first();

        return Inertia::render('Dashboard', [
            'user' => $user,
        ]);
    }

    public function getUserData() {
        $accountId = Auth::id();
        
        $user = User::where('id', $accountId)->select(['id', 'name', 'email'])->first();
    
        return response()->json([
            'user' => $user,
        ]);
    }

    public function messages(): JsonResponse {
        $messages = Message::with('user')->get()->append('time');

        return response()->json($messages);
    }

    public function message(Request $request): JsonResponse {
        $accountId = Auth::id();

        $message = Message::create([
            'user_id' => $accountId,
            'text' => $request->get('text'),
        ]);
        SendMessage::dispatch($message);

        return response()->json([
            'success' => true,
            'message' => "Message created and job dispatched.",
        ]);
    }
}
