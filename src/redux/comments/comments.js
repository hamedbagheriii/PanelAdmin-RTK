import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    loading : false ,
    isFetching : false ,
    comments : [],
    error : ''
}


export const getComments = createAsyncThunk('Comments/GetComments' , async ()=>{
    const res = await axios.get('https://jsonplaceholder.typicode.com/comments');
    return (await res.data.splice(0,20))
})


const CommentsSlice = createSlice({
    name : 'CommentsSlice',
    initialState,
    extraReducers : (builder)=>{
        builder.addCase(getComments.pending , (state , action)=>{
            if(state.comments.length > 0){
                state.isFetching = true;
            }
            else{
                state.isFetching = true;
                state.loading = true;
            }
        });

        builder.addCase(getComments.fulfilled , (state , action)=>{
            state.comments = action.payload;
            state.isFetching = false;
            state.loading = false;
        })
        
        builder.addCase(getComments.rejected , (state , action)=>{
            state.comments = [];
            state.error = action.error.message;
            state.isFetching = false;
            state.loading = false;
        })
    }
})



export default CommentsSlice.reducer;