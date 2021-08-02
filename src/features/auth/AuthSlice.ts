import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import request from 'api/request';

/**
 * active = logged in user
 * pending = ad account not setted up user
 */
interface User {
    name: string;
    iconUrl: string;
    status: 'active' | 'pending' | 'deleted';
}

export interface AuthState {
    user: User | null;
    status: 'idle' | 'loading';
    errorMessage: string;
}

const initialState: AuthState = {
    user: null,
    status: 'idle',
    errorMessage: ''
}

interface LoginData {
    email: string;
    password: string;
    cb?: () => void;
}

export const login = createAsyncThunk(
    'auth/login',
    async (data: LoginData, thunkAPI) => {
        try {
            const response = await request.post(
                'auth/login',
                JSON.stringify({
                    email: data.email,
                    password: data.password
                }),
            )

            if (response.status === 200) {
                if (data.cb) data.cb()
                return response.json()
            }
            return thunkAPI.rejectWithValue(await response.json());

        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
)

export const autoLogin = createAsyncThunk(
    'auth/autoLogin',
    async (args, thunkAPI) => {
        try {
            const response = await request.get(
                'auth/autoLogin'
            )
            if (response.status === 200) {
                return response.json()
            }
            return thunkAPI.rejectWithValue(await response.json());
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
)

interface SetupData {
    accountName: string;
    timezoneLabel: string;
    timezoneValue: string;
    timezoneOffset: number;
    businessName: string;
    industry: string;
    region: string;
    logo?: File;
    url: string;
}

export const setup = createAsyncThunk(
    'auth/setup',
    async (data: SetupData, thunkAPI) => {
        try {
            const response = await request.post(
                'auth/setup',
                JSON.stringify(data)
            )
            if (response.status === 200) {
                return response.json()
            }
            return thunkAPI.rejectWithValue(await response.json());
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetErrorMsg: (state) => {
            state.errorMessage = '';
        },
        logout: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // login reducers
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.status = 'idle';
                state.user = {
                    name: payload.name,
                    status: payload.status,
                    iconUrl: payload.iconUrl
                }
            })
            .addCase(login.rejected, (state, action: any) => {
                state.status = 'idle';
                state.errorMessage = action.payload?.errorMsg || action.error.message;
            })

            //setup reducers
            .addCase(setup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(setup.fulfilled, (state, { payload }) => {
                state.status = 'idle';
                if (state.user) state.user.status = payload.status;
            })
            .addCase(setup.rejected, (state, action: any) => {
                state.status = 'idle';
                state.errorMessage = action.payload?.errorMsg || action.error.message;
            })

            //autoLogin
            .addCase(autoLogin.fulfilled, (state, { payload }) => {
                state.user = {
                    name: payload.name,
                    status: payload.status,
                    iconUrl: payload.iconUrl
                }
            })
            .addCase(autoLogin.rejected, (state, action) => {
                console.log('autoLogin rejected,', action);
            })
    }
})

export const { resetErrorMsg, logout } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
