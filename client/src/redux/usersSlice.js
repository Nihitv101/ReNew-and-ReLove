import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:"users",
    initialState:{
        user:null,
    },
    reducers:{
        setUser(state , action){
            state.user = action.payload;
        }
    }
})

// export reducer and function (actions)

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
