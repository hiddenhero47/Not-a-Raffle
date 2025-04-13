import React from 'react';
import { Container } from './elements/index.style';
// import { newTest } from  '../../utilities/testScrip'
import { useSelector, useDispatch } from 'react-redux';
import { connectWallet, disconnectWallet } from '../../store/slice/wallet';

function Index() {
	const dispatch = useDispatch();
	const { isConnected, pending, walletData, connectionError } = useSelector(
		(state) => state.wallet
	);

	const handleConnect = () => {
		dispatch(connectWallet());
	};

	const handleDisconnect = () => {
		dispatch(disconnectWallet());
	};

	return (
		<Container>
			<header className="p-4 border-b flex justify-between items-center">
				<h1 className="text-xl font-bold">🚀 Web3 Raffle</h1>
				<div className="flex gap-4 items-center">
					{pending ? (
						<p>Connecting...</p>
					) : isConnected ? (
						<>
							<p className="text-sm">
								{walletData?.account?.address.slice(0, 6)}...
								{walletData?.account?.address.slice(-4)}
							</p>
							<button
								onClick={handleDisconnect}
								className="bg-red-500 text-white px-3 py-1 rounded"
							>
								Disconnect
							</button>
						</>
					) : (
						<button
							onClick={handleConnect}
							className="bg-green-600 text-white px-3 py-1 rounded"
						>
							Connect Wallet
						</button>
					)}
				</div>
				{connectionError && (
					<p className="text-red-500 mt-2">❌ Connection failed</p>
				)}
			</header>
		</Container>
	);
}

export default Index;
