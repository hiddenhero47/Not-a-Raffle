import React from 'react';
import { WalletMenuWrapper, WalletMenuContainer } from './side-menu.style';
import { useSelector } from 'react-redux';
import Spinner from '../../components/loaders/spinners/Spinner';

function WalletMenu({ closeModal }) {
	const { pending } = useSelector((state) => state.wallet);
	return (
		<WalletMenuWrapper>
			<WalletMenuContainer>
				<div></div>
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
