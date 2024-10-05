@extends('admin.adminLayout')

@php  @endphp

@section('title')
    Observaciones
@endsection

@section('sidebar')
@endsection

@section('content')
    <table>
        <thead>
            @foreach($result->first() as $key => $value)
                <th>{{$key}}</th>
            @endforeach
        </thead>
        <tbody>
            @foreach($result as $observation)
                <tr>
                    @foreach($observation as $value)
                        <td>{{$value}}</td>
                    @endforeach
                        <td>
                            <a href="observation/{{$observation->id}}">
                                <button type="submit">Editar</button>
                            </a>
                        </td>
                        <td>
                            <a href="observation/{{$observation->id}}">
                                <button type="submit">Editar</button>
                            </a>
                        </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection
