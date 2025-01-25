import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';


interface AuthState {
  token: string;
  decodedToken: {
    uuid: string,
    username: string,
    exp: number,
    iat: number,
  };
}

const initialState: AuthState = {
  token: localStorage.getItem('token') || "",
  decodedToken: localStorage.getItem('decodedToken') ? JSON.parse(localStorage.getItem('decodedToken') || "") : {
    uuid: '',
    username: 'guest',
    exp: 0,
    iat: 0,
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction(state, action) {
      try {
        const token: string = action.payload;
        state.token = token;
        localStorage.setItem('token', state.token);

        state.decodedToken = jwtDecode(token);
        localStorage.setItem('decodedToken', JSON.stringify(state.decodedToken));
      } catch (error) {
        console.error('Error storing token in localStorage:', error);
      }
    },

    logoutAction(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('decodedToken');
      state.token = "";
      state.decodedToken = {
        uuid: '',
        username: 'guest',
        exp: 0,
        iat: 0,
      }
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;