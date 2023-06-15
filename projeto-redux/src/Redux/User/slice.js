import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
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

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser: createUserFunc,
        logoutUser: logoutUserFunc,
        addAddress: createAddress
    }
});

export const { createUser, logoutUser, addAddress } = userSlice.actions;

export default userSlice.reducer;