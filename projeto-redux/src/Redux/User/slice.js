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

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser: createUserFunc,
        logoutUser: logoutUserFunc,
    }
});

export const { createUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;