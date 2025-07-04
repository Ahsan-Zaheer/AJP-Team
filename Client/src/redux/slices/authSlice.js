import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    isSidebarOpen: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
        toggleSidebar: (state, action) => {
            state.isSidebarOpen = action.payload;
        },
    },

})

export const {setCredentials, logout, toggleSidebar} = authSlice.actions;

export default authSlice.reducer;