import React from 'react';
import { WalletMenuWrapper, WalletMenuContainer } from './side-menu.style';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/loaders/spinners/Spinner';
import { connectWallet, disconnectWallet } from '../../store/slice/wallet';

function WalletMenu({ closeModal }) {
	const dispatch = useDispatch();
	const { address, isConnected, pending, message } = useSelector(
		(state) => state.wallet
	);

	const handleConnect = () => {
		dispatch(connectWallet());
	};

	const handleDisconnect = () => {
		dispatch(disconnectWallet({ isInjected: true }));
	};

	return (
		<WalletMenuWrapper>
			<WalletMenuContainer>
				<div className="p-4">
					{!isConnected ? (
						<button
							onClick={handleConnect}
							disabled={pending}
							className="bg-blue-600 text-white px-4 py-2 rounded"
						>
							{pending ? 'Connecting...' : 'Connect Injected Wallet'}
						</button>
					) : (
						<div>
							<p className="text-green-600">Connected Address: {address}</p>
							<button
								onClick={handleDisconnect}
								className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
							>
								Disconnect
							</button>
						</div>
					)}
					{message && <p className="text-red-500 mt-2">Error: {message}</p>}
				</div>
			</WalletMenuContainer>

			{pending && (
				<div id="WalletLoader">
					<Spinner thin="30px" />
				</div>
			)}
		</WalletMenuWrapper>
	);
}

export default WalletMenu;
