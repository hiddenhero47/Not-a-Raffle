import { createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum, sepolia } from 'wagmi/chains';
import { injected, walletConnect, metaMask, coinbaseWallet } from 'wagmi/connectors';

// Chain list
const chains = [mainnet, polygon, arbitrum, sepolia];

// Custom RPC endpoint
const transports = {
	[mainnet.id]: http('https://mainnet.infura.io/v3/YOUR_KEY'),
	[polygon.id]: http(),
	[arbitrum.id]: http(),
	[sepolia.id]: http(
		'https://chaotic-side-mansion.ethereum-hoodi.quiknode.pro/2655d3bb6f60f2303ec24e3d8ec87367ea55541b/'
	),
};

const wagmiConfig = createConfig({
	chains,
	transports,
	connectors: [
		injected({ chains }),
		metaMask({ chains }),
		coinbaseWallet({ appName: 'Not A Raffle' }),
		walletConnect({
			chains,
			options: {
				projectId: 'your_project_id',
				showQrModal: true,
			},
		}),
	],
	ssr: false,
	autoConnect: true,
});

export default wagmiConfig;
