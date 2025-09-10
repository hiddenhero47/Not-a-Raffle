import React, { useState, useEffect } from 'react';
import {
	WalletMenuWrapper,
	WalletMenuContainer,
	Header,
	ConnectionPanel,
	MyConnectButton,
	DotBox,
	DropdownWrapper,
} from './side-menu.style';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/loaders/spinners/Spinner';
import {
	connectWallet,
	disconnectWallet,
	connectWalletGlobal,
	walletTypes,
} from '../../store/slice/wallet';
import { SiOpenbadges } from 'react-icons/si';
import { HiOutlineX } from 'react-icons/hi';
import { truncateHex } from '../../utilities/basicFunctions';
import { LuArrowDownNarrowWide } from 'react-icons/lu';

import { GiFox } from 'react-icons/gi';
import { SiWalletconnect } from 'react-icons/si';

function WalletMenu({ closeModal }) {
	const dispatch = useDispatch();
	const { address, isConnected, pending, message, menuIsActive, walletType } =
		useSelector((state) => state.wallet);

	const [dropdown, setDropdown] = useState(false);
	const [connectMethod, setConnectMethod] = useState(
		walletType ?? walletTypes.Type1
	);

	const handleConnect = () => {
		dispatch(
			connectMethod === walletTypes.Type1
				? connectWallet()
				: connectWalletGlobal()
		);
	};

	const handleDisconnect = () => {
		const isInjected = Boolean(walletType === walletTypes.Type1);
		dispatch(disconnectWallet({ isInjected }));
	};

	const setMethod = (string) => {
		setConnectMethod(string);
	};

	useEffect(() => {
		if (!menuIsActive) {
			setDropdown(false);
		}
	}, [menuIsActive]);

	return (
		<WalletMenuWrapper>
			<WalletMenuContainer>
				<Header $connect={isConnected}>
					<div id="titleConnect">
						<i>
							<SiOpenbadges />
						</i>
						<h3 className="flex flex-col leading-none gap-[3px]">
							Wallet
							<span className="text-[11.6px]">
								{!isConnected ? 'disconnected' : 'connected'}
							</span>
						</h3>
					</div>
					<button>
						<HiOutlineX />
					</button>
				</Header>

				<ConnectionPanel
					$connect={isConnected}
					$dropdown={dropdown}
					style={{ transitionBehavior: 'allow-discrete' }}
				>
					<div className="flex justify-between w-full items-center">
						<div className="flex gap-[5px] items-center">
							<div id="circleBox" />{' '}
							<span id="textAddress">
								{truncateHex({ hexString: address, len: 15 })}
								{address ? '' : 'xxxxxxx'}
							</span>
						</div>

						{!isConnected ? (
							<MyConnectButton onClick={handleConnect}>connect</MyConnectButton>
						) : (
							<MyConnectButton onClick={handleDisconnect}>
								cancel
							</MyConnectButton>
						)}
					</div>

					<div className="w-[92%] h-[1px] line mx-[auto] my-[10px]" />

					<div className="w-[90%] flex items-center mx-[auto]">
						<span className="text-[#b3b6cb] text-[13px] font-[700]">
							{connectMethod === walletTypes.Type1 && 'Local Wallet'}
							{connectMethod === walletTypes.Type2 && 'External Wallet'}
						</span>
						<DotBox $isOn={connectMethod === walletType} />

						<div className="h-[100%] min-h-[25px] w-[1.3px] line ml-[auto] mr-[15px]" />

						<button
							id="buttonWalletTypes"
							className={dropdown && 'rotate-[-180deg]'}
							onClick={() => setDropdown(!dropdown)}
						>
							<LuArrowDownNarrowWide />
						</button>
					</div>

					<DropdownWrapper
						$dropdown={dropdown}
						className={dropdown ? 'open' : ''}
					>
						<div
							className={
								connectMethod === walletTypes.Type1
									? 'option selected'
									: 'option'
							}
							onClick={() => setMethod(walletTypes.Type1)}
						>
							<i className="mr-[5px] ml-[8px] text-[14px]">
								<GiFox />
							</i>
							Local Wallet
						</div>

						<div
							className={
								connectMethod === walletTypes.Type2
									? 'option selected'
									: 'option'
							}
							onClick={() => setMethod(walletTypes.Type2)}
						>
							<i className="mr-[5px] ml-[8px] text-[14px]">
								<SiWalletconnect />
							</i>
							External Wallet
						</div>
					</DropdownWrapper>
				</ConnectionPanel>

				{message && (
					<p className="text-[#D93E39] text-[13px] ml-[2px]">
						Error: {message}
					</p>
				)}
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
