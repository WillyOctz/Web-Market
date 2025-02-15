import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    
    email : "",
    firstname : "",
    image : "",
    lastname : "",
    _id : ""
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRedux : (state,action) => {
            const { _id, firstname, lastname, email, image } = action.payload.data;
            state._id = _id
            state.firstname = firstname
            state.lastname = lastname
            state.image = image
            state.email = email
        },
        logoutRedux : (state) => {
            state._id = ""
            state.firstname = ""
            state.lastname = ""
            state.image = ""
            state.email = ""
        }
    }
});

export const { loginRedux, logoutRedux } = userSlice.actions


export default userSlice.reducer;