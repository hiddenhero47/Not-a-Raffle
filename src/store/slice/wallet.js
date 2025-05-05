import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { ethers } from 'ethers';
import EthereumProvider from '@walletconnect/ethereum-provider';
import { initWcProviderEvents } from '../../features/web3-services/web3-utilities';

const ethers = require("ethers")

const chains = [1, 137, 56]; // Add more supported chains if needed

const wcProviderModule = async () => {
	const provider = await EthereumProvider.init({
		projectId: 'YOUR_PROJECT_ID',
		chains,
		showQrModal: true,
		rpcMap: {
			1: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
			137: 'https://polygon-rpc.com',
			56: 'https://bsc-dataseed.binance.org/',
		},
	});
	return provider;
};

const initialState = {
	address: null,
	chainId: null,
	walletData: null, // address, provider, signer
	menuIsActive: true,
	pending: false,
	isConnected: false,
	connectionError: false,
	walletType: null,
	message: '',
};

let wcProvider = null;

// Async thunk to connect non-injected wallet using ethers.js
export const connectWalletGlobal = createAsyncThunk(
	'wallet/connectNonInjected',
	async (_, thunkAPI) => {
		try {
			wcProvider = await wcProviderModule();
			await wcProvider.connect();
			initWcProviderEvents(wcProvider, thunkAPI.dispatch);

			const provider = new ethers.providers.Web3Provider(wcProvider);
			const signer = provider.getSigner();
			const address = await signer.getAddress();
			const network = await provider.getNetwork();

			return {
				address,
				provider,
				signer,
				chainId: network.chainId,
			};
		} catch (error) {
			const message = error?.message || String(error);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Async thunk to reconnect non-injected wallet using ethers.js
export const reconnectWallet = createAsyncThunk(
	'wallet/reconnectWalletConnect',
	async (_, thunkAPI) => {
		try {
			if (!wcProvider) {
				wcProvider = await wcProviderModule();
			}

			if (
				wcProvider &&
				wcProvider.session &&
				wcProvider.session?.acknowledged
			) {
				initWcProviderEvents(wcProvider, thunkAPI.dispatch);

				const provider = new ethers.providers.Web3Provider(wcProvider);
				const signer = provider.getSigner();
				const address = await signer.getAddress();
				const network = await provider.getNetwork();
				return {
					address,
					provider,
					signer,
					chainId: network.chainId,
				};
			}

			return thunkAPI.rejectWithValue('No active WalletConnect session');
		} catch (err) {
			return thunkAPI.rejectWithValue(err.message);
		}
	}
);

// Async thunk to connect injected wallet using ethers.js
export const connectWallet = createAsyncThunk(
	'wallet/connect',
	async (_, thunkAPI) => {
		try {
			if (!window.ethereum) throw new Error('MetaMask not detected');

			await window.ethereum.request({ method: 'eth_requestAccounts' });

			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const address = await signer.getAddress();
			const network = await provider.getNetwork();

			return {
				address,
				provider,
				signer,
				chainId: network.chainId,
			};
		} catch (error) {
			const message = error?.message || error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Async thunk to disconnect wallet (manually clear state)
export const disconnectWallet = createAsyncThunk(
	'wallet/disconnect',
	async ({ isInjected = false } = {}, thunkAPI) => {
		try {
			if (isInjected) {
				console.log(
					'[Wallet] Injected wallet disconnect — clearing state only'
				);
				return true;
			}

			if (wcProvider && wcProvider.disconnect) {
				console.log('[Wallet] WalletConnect disconnecting...');
				if (wcProvider.removeAllListeners) wcProvider.removeAllListeners();
				await wcProvider.disconnect();
				wcProvider = null;
			}

			return true;
		} catch (error) {
			const message = error?.message || String(error);
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
		updateAccount: (state, action) => {
			if (state.walletData) {
				state.walletData.address = action.payload;
			}
			state.address = action.payload;
		},
		updateChain: (state, action) => {
			if (state.walletData) {
				state.walletData.chainId = action.payload;
			}
			state.chainId = action.payload;
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
				state.walletType = 'injected';
				state.walletData = action.payload;
				state.address = action?.payload?.address;
				state.chainId = action?.payload?.chainId;
			})
			.addCase(connectWallet.rejected, (state, action) => {
				state.pending = false;
				state.connectionError = true;
				state.message = action.payload;
				state.walletData = null;
			})

			// connect non-injected wallet
			.addCase(connectWalletGlobal.pending, (state) => {
				state.pending = true;
			})
			.addCase(connectWalletGlobal.fulfilled, (state, action) => {
				state.pending = false;
				state.isConnected = true;
				state.connectionError = false;
				state.walletType = 'walletconnect';
				state.walletData = action.payload;
				state.address = action.payload.address;
				state.chainId = action.payload.chainId;
			})
			.addCase(connectWalletGlobal.rejected, (state, action) => {
				state.pending = false;
				state.connectionError = true;
				state.message = action.payload;
				state.walletData = null;
			})

			// reconnect non-injected wallet
			.addCase(reconnectWallet.pending, (state) => {
				state.pending = true;
			})
			.addCase(reconnectWallet.fulfilled, (state, action) => {
				state.pending = false;
				state.isConnected = true;
				state.connectionError = false;
				state.walletType = 'walletconnect';
				state.walletData = action.payload;
				state.address = action.payload.address;
				state.chainId = action.payload.chainId;
			})
			.addCase(reconnectWallet.rejected, (state, action) => {
				state.pending = false;
				state.connectionError = true;
				state.message = action.payload;
				state.walletData = null;
			})

			// disconnect wallet
			.addCase(disconnectWallet.fulfilled, (state) => {
				state.isConnected = false;
				state.walletData = null;
				state.walletType = null;
				state.address = null;
				state.chainId = null;
				state.message = '';
			})
			.addCase(disconnectWallet.rejected, (state, action) => {
				state.connectionError = true;
				state.message = action.payload;
			});
	},
});

export const { resetWalletState, activateMenu, updateAccount, updateChain } =
	walletSlice.actions;
export default walletSlice.reducer;
