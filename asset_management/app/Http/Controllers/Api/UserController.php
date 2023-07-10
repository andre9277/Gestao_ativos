<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        //$this->authorize('create-delete-users');
        $users = User::with('roles:id,name')
            ->orderBy('id', 'desc')
            ->paginate(20);

        return UserResource::collection($users);
    }

    //Displays all users fromthe current database
    public function indexAll()
    {
        $users = User::with('roles:id,name')
            ->orderBy('id', 'desc')
            ->get();

        return UserResource::collection($users);
    }

    public function usersAllocations()
    {
        $users = User::select(['id', 'name'])->get();

        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $this->authorize('create-delete-users');
        //Dados validados através do request
        $data = $request->validated();

        // Verifica se foi fornecido um PIN
        if (isset($data['pin'])) {
            // Update a PIN encriptada
            $data['pin'] = bcrypt($data['pin']);
        }

        //Update a password encriptada
        $data['password'] = bcrypt($data['password']);

        //Criamos o User
        $user = User::create($data);

        //retonna o utilizador 
        return response(new UserResource($user), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $this->authorize('create-delete-users');
        //retornamos o UserResource
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateUserRequest $request
     * @param \App\Models\User                     $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $this->authorize('create-delete-users');
        $data = $request->validated();

        // Verifica se foi fornecido um PIN
        if (isset($data['pin'])) {
            // Update a PIN encriptada
            $data['pin'] = bcrypt($data['pin']);
        }

        // Verifica se foi fornecida uma nova password
        if (isset($data['password'])) {
            // Update a password encriptada
            $data['password'] = bcrypt($data['password']);
        }

        // Realiza o update do usuário atual
        $user->update($data);

        // Retorna o novo UserResource 
        return new UserResource($user);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->authorize('create-delete-users');
        $user = User::find($id);
        $user->delete();
    }
}
