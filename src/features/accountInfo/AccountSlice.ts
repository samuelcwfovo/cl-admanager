import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import request from 'api/request';
import { toast } from 'react-toastify';


interface Account {
    name: string;
    id: number;
    timezoneLabel: string;
    timezoneValue: string;
    businessName: string;
    industry: string;
    region: string;
    url: string;
    notificationEmail: {
        rejected: boolean;
        suspended: boolean;
        soonEnd: boolean;
        billed: boolean;
    }
}


const initialState: Account = {
    name: '',
    id: 0,
    timezoneLabel: '',
    timezoneValue: '',
    businessName: '',
    industry: '',
    region: '',
    url: '',
    notificationEmail: {
        rejected: false,
        suspended: false,
        soonEnd: false,
        billed: false
    }
}

export const fetchAccount = createAsyncThunk(
    'account/fetch',
    async (args, thunkAPI) => {
        try {
            const response = await request.get(
                'account'
            )

            if (response.status === 200) {
                return response.json()
            }
            return thunkAPI.rejectWithValue(await response.json())
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
)


type BasicInfoData = {
    accountName?: string;
    timezoneLabel?: string;
    timezoneValue?: string;
    timezoneOffset?: number;
    logo?: File,

    cb?: () => void;
}

export const submitBasicInfo = createAsyncThunk(
    'account/submitBasicInfo',
    async (data: BasicInfoData, thunkAPI) => {
        const submiteData = new FormData();
        submiteData.append('accountName', data.accountName || '');
        submiteData.append('timezoneLabel', data.timezoneLabel || '');
        submiteData.append('timezoneValue', data.timezoneValue || '');
        submiteData.append('timezoneOffset', String(data.timezoneOffset || ''));
        submiteData.append('logo', data.logo as any);

        try {
            const response = await request.post(
                'account',
                submiteData,
                'multipart/form-data'
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


type BusinessInfoData = {
    businessName?: string;
    industry?: string;
    region?: string;
    url?: string;

    cb?: () => void;
}

export const submitBusinessInfo = createAsyncThunk(
    'account/submitBusinessInfo',
    async (data: BusinessInfoData, thunkAPI) => {
        try {
            const response = await request.post(
                'account',
                JSON.stringify(data),
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

type NotificationData = {
    rejected: boolean;
    suspended: boolean;
    soonEnd: boolean;
    billed: boolean;

    cb: () => void;
}

export const submitNotification = createAsyncThunk(
    'account/sumbitNotification',
    async (data: NotificationData, thunkAPI) => {
        try {
            const response = await request.post(
                'account',
                JSON.stringify(data),
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

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccount.fulfilled, (state, { payload }) => {
                state.id = payload.accountId;
                state.name = payload.accountName;
                state.timezoneLabel = payload.timezoneLabel;
                state.timezoneValue = payload.timezoneValue;
                state.businessName = payload.businessName;
                state.industry = payload.industry;
                state.region = payload.region;
                state.url = payload.url;
                state.notificationEmail.rejected = payload.notificationEmail.rejected;
                state.notificationEmail.suspended = payload.notificationEmail.suspended;
                state.notificationEmail.soonEnd = payload.notificationEmail.soonEnd;
                state.notificationEmail.billed = payload.notificationEmail.billed;

            })
            .addCase(fetchAccount.rejected, (state, action) => {
                console.log('fetch account rejected,', action);
                if ((action.payload as any).errorMsg) {
                    toast.error('Fail to get account data. Error: ' + (action.payload as any).errorMsg);
                }
            })
            .addCase(submitBasicInfo.rejected, (state, action) => {
                console.log('submitBasicInfo rejected,', action);
                if ((action.payload as any).errorMsg) {
                    toast.error('Fail to submit basic info. Error: ' + (action.payload as any).errorMsg);
                }
            })
            .addCase(submitBusinessInfo.rejected, (state, action) => {
                console.log('submitBusinessInfo rejected,', action);
                if ((action.payload as any).errorMsg) {
                    toast.error('Fail to submit business info. Error: ' + (action.payload as any).errorMsg);
                }
            })
            .addCase(submitNotification.rejected, (state, action) => {
                console.log('submitNotification rejected,', action);
                if ((action.payload as any).errorMsg) {
                    toast.error('Fail to submit notification setting. Error: ' + (action.payload as any).errorMsg);
                }
            })

    }
})

export const accountSelector = (state: RootState) => state.account;

export default accountSlice.reducer;