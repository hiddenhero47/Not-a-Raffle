import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	disconnectWallet,
	updateAccount,
	updateChain,
	reconnectWallet,
	refresh,
} from '../../store/slice/wallet';

const EthereumListeners = () => {
	const dispatch = useDispatch();
	const { isConnected, walletType } = useSelector((state) => state.wallet);
	const triedReconnect = useRef(false);

	const data = useSelector((state) => state.wallet);

	console.log(data);
	

	useEffect(() => {
		if (
			!triedReconnect.current &&
			walletType &&
			isConnected &&
			walletType !== 'injected'
		) {
			dispatch(reconnectWallet());
		}
		dispatch(refresh());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!window.ethereum || !isConnected) return;

		const handleDisconnect = () => {
			console.log('[Ethereum] Wallet disconnected');
			dispatch(disconnectWallet({ isInjected: true }));
		};

		const handleAccountsChanged = (accounts) => {
			if (accounts.length === 0) {
				console.log('[Ethereum] No accounts — disconnected');
				dispatch(disconnectWallet({ isInjected: true }));
			} else {
				console.log('[Ethereum] Account changed:', accounts[0]);
				dispatch(updateAccount(accounts[0]));
			}
		};

		const handleChainChanged = (chainIdHex) => {
			const chainId = parseInt(chainIdHex, 16);
			console.log('[Ethereum] Chain changed to:', chainId);
			dispatch(updateChain(chainId));
		};

		// Add listeners
		window.ethereum.on('disconnect', handleDisconnect);
		window.ethereum.on('accountsChanged', handleAccountsChanged);
		window.ethereum.on('chainChanged', handleChainChanged);

		// Clean up
		return () => {
			window.ethereum.removeListener('disconnect', handleDisconnect);
			window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
			window.ethereum.removeListener('chainChanged', handleChainChanged);
		};
	}, [dispatch, isConnected]);

	return null; // No UI
};

export default EthereumListeners;
