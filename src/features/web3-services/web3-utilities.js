import {
	updateAccount,
	updateChain,
	disconnectWallet,
} from '../../store/slice/wallet';
// import SignClient from "@walletconnect/sign-client";

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

export const createConnectionTimeout = (ms = 10000) =>
	new Promise((_, reject) => {
		setTimeout(() => {
			reject(
				new Error(
					'Connection timed out. Please check your network or use a VPN.'
				)
			);
		}, ms);
	});

export const clearWcSessions = () => {
	if (typeof localStorage !== 'undefined') {
		const excludeKeys = ['persist:root', 'appThemes'];

		Object.keys(localStorage)
			.filter((key) => !excludeKeys.includes(key)) // keep only safe keys
			.forEach((key) => {
				localStorage.removeItem(key);
			});
	}
};

// export const clearWcSessions = async () => {
// 	try {
// 		// Graceful disconnect (remote)
// 		const client = await SignClient.init({
// 			projectId: process.env.REACT_APP_WC_PROJECT_ID,
// 		});

// 		const sessions = client.session.getAll();
// 		for (const session of sessions) {
// 			await client.disconnect({
// 				topic: session.topic,
// 				reason: { code: 6000, message: "User disconnected" },
// 			});
// 		}

// 		// Local cleanup (force remove WC cache only)
// 		if (typeof localStorage !== "undefined") {
// 			Object.keys(localStorage)
// 				.filter((key) => key.startsWith("wc@2:"))
// 				.forEach((key) => localStorage.removeItem(key));
// 		}

// 		console.log("[WC] Sessions cleared successfully");
// 	} catch (error) {
// 		console.error("[WC] Clear Sessions Error:", error);
// 	}
// };
