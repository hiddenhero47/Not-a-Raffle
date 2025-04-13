import { configureChains, createConfig } from 'wagmi';
import { mainnet, polygon, arbitrum, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
// import { metaMask, injected, walletConnect } from '@wagmi/connectors'

export const { chains, publicClient } = configureChains(
	[mainnet, polygon, arbitrum, sepolia],
	[
		jsonRpcProvider({
			rpc: () => ({
				http: 'https://chaotic-side-mansion.ethereum-hoodi.quiknode.pro/2655d3bb6f60f2303ec24e3d8ec87367ea55541b/',
			}),
		}),
		publicProvider(),
	]
);

export const metamaskConnector = new MetaMaskConnector({ chains });

export const walletConnectConnector = new WalletConnectConnector({
	chains,
	options: {
		qrcode: true,
	},
});

export const injectedConnector = new InjectedConnector({
	chains,
	options: {
		name: 'Injected',
		shimDisconnect: true,
	},
});

const { connectors } = getDefaultWallets({
	appName: 'Not A Raffle',
	projectId: 'a05f89c1a1925d672b4462bb4091c2ff', // Go to cloud.walletconnect.com to get one
	chains,
});

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
});

export default wagmiConfig;
