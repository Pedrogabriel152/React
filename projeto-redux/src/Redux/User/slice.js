import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    users: [], 
    loading: false
};

const createUserFunc = (state, action) => {
    console.log(action.payload)
    return { ...state,
        user: {
            name: action.payload.name,
            email: action.payload.email,
            address: null 
        }
    }
}

const logoutUserFunc = (state) => {
    return {
        ...state,
        user: null
    }
}

const deleteAddress = (state) => {
    if(!state.user){
        alert("Faça o login para cadastrar o endereço")
        return { ...state };
    }

    return{
        ...state,
        user:{
            ...state.user,
            address: null
        }
    }
}

const createAddress = (state, action) => {
    if(!action.payload.location || !action.payload.number){
        alert('PREENÇA TODOS OS CAMPOS');
        return { ...state };
    }

    if(!state.user){
        alert("Faça o login para cadastrar o endereço")
        return { ...state };
    }

    return {
        ...state,
        user:{
            ...state.user,
            address:{
                location: action.payload.location,
                number: action.payload.number
            }
        }
    }
}

const sourceUsers = (state, action) => {
    state.loading = true;
}

const sourceUsersSuccess = (state, action) => {
    state.users = action.payload;
    state.loading = false;
}

const sourceUsersFailed = (state, ation) => {
    console.log("Deu erro")
    console.log(ation.payload)
    state.loading = false;
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser: createUserFunc,
        logoutUser: logoutUserFunc,
        addAddress: createAddress,
        removeAddress: deleteAddress,
        fetchUsers: sourceUsers,
        fetchUsersSuccess: sourceUsersSuccess,
        fetchUsersFailed: sourceUsersFailed
    }
});

export const { createUser, logoutUser, addAddress, removeAddress, fetchUsers, fetchUsersSuccess, fetchUsersFailed } = userSlice.actions;

export default userSlice.reducer;