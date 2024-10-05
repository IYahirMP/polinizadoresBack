<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ObservationController extends Controller
{
    public function index(Request $request){
        $result = DB::table('observations')->orderBy('id');

        if($request->has('time')){
            $result = $result->where('time_id', $request->input('time'));
        }

        if($request->has('begin')){
            $result = $result->where('detection_begin', '>', $request->input('begin'));
        }

        $result = $result->limit(20)->get();

         return view('admin.observation.index', compact('result'));
    }

    public function show(Request $request, $id){
        if($request->time){
            return response()->
                json(DB::table('observations')
                    ->where('id', $id)
                    ->where('time_id', $request->time)
                    ->first());
        }


        $observation = DB::table('observations')->find($id);
        return response()->json($observation);
    }

    public function create(){

    }


    public function store(Request $request){

    }

    public function edit(){

    }

    public function update(){

    }

    public function destroy(){

    }
}
