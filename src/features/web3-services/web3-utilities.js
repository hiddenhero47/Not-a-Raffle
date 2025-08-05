import { updateAccount, updateChain, disconnectWallet } from '../../store/slice/wallet';

export const initWcProviderEvents = (wcProvider, dispatch) => {
	if (!wcProvider) return;

    wcProvider.removeAllListeners?.();

	wcProvider.on('accountsChanged', (accounts) => {
		if (accounts?.length > 0) {
			dispatch(updateAccount(accounts[0]));
		}
	});

	wcProvider.on('chainChanged', (chainId) => {
		dispatch(updateChain(Number(chainId)));
	});

	wcProvider.on('disconnect', () => {
		dispatch(disconnectWallet());
	});
};
