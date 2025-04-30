import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { connect, disconnect } from '@wagmi/core';
import wagmiConfig from '../../features/web3-services/connector-config';

const initialState = {
	walletData: null,
	menuIsActive: false,
	pending: false,
	isConnected: false,
	connectionError: false,
	message: '',
};

// Async thunk to connect wallet
export const connectWallet = createAsyncThunk(
	'wallet/connect',
	async (_, thunkAPI) => {
		try {
			const connector = wagmiConfig.connectors[0];
			const wallet = await connect({ connector });
			return wallet;
		} catch (error) {
			const message = error?.message || error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Async thunk to disconnect wallet
export const disconnectWallet = createAsyncThunk(
	'wallet/disconnect',
	async (_, thunkAPI) => {
		try {
			await disconnect();
			return true;
		} catch (error) {
			const message = error?.message || error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

const walletSlice = createSlice({
	name: 'wallet',
	initialState,
	reducers: {
		resetWalletState: (state) => {
			state.pending = false;
			state.isConnected = false;
			state.connectionError = false;
			state.message = '';
		},
		activateMenu: (state, action) => {
			state.menuIsActive = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// connect wallet
			.addCase(connectWallet.pending, (state) => {
				state.pending = true;
			})
			.addCase(connectWallet.fulfilled, (state, action) => {
				state.pending = false;
				state.isConnected = true;
				state.connectionError = false;
				state.walletData = action.payload;
			})
			.addCase(connectWallet.rejected, (state, action) => {
				state.pending = false;
				state.connectionError = true;
				state.message = action.payload;
				state.walletData = null;
			})

			// disconnect wallet
			.addCase(disconnectWallet.fulfilled, (state) => {
				state.isConnected = false;
				state.walletData = null;
			})
			.addCase(disconnectWallet.rejected, (state, action) => {
				state.connectionError = true;
				state.message = action.payload;
			});
	},
});

export const { resetWalletState, activateMenu } = walletSlice.actions;
export default walletSlice.reducer;
