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

        //verifica se existe uma password disponível
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']); //e encrypt a password
        }

        //realiza o update do atual user
        $user->update($data);

        //Novo user resource 
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
