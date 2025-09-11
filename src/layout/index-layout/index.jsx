import React, { useMemo, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { colors } from '../../utilities/colors';
import { useSelector, useDispatch } from 'react-redux';
import ScrollToTop from '../scroll-to-top';
import {
	LayoutWrapper,
	LayoutContainer,
	SidebarWrapper,
	PageFrame,
	SideMenuWrapper,
	NavBar,
	MenuButton,
	GlassMenuWrapper,
} from './index.style';
import Sidebar from '../sidebars/sidebar';
import EthereumListeners from '../../features/web3-services/web3-ethereum-listeners';
import Modal from '../../components/modal/index_modal';
import { activateMenu } from '../../store/slice/wallet';
import WalletMenu from '../side-menu/side-menu';
import { TbGridDots } from 'react-icons/tb';
import { BiSolidWalletAlt } from 'react-icons/bi';
import { ReactComponent as Icon } from '../../assets/images/svg-raffle-icon5.svg';
import { VectorIcon } from '../../components/icon-components/index.style';

function IndexLayout() {
	const dispatch = useDispatch();
	const { theme } = useSelector((state) => state.themes);
	const { menuIsActive } = useSelector((state) => state.wallet);

	const isMobile = () => window.matchMedia('(max-width: 1150px)').matches;

	(() => {
		const bodyElement = document.querySelector('body');
		const htmlElement = document.querySelector('html');

		if (bodyElement) {
			bodyElement.classList.add('bg-dashboardBg');
		}
		if (htmlElement) {
			htmlElement.classList.add(theme === 'dark' ? 'nightMode' : 'dayMode');
		}
	})();

	const MenuRef = useRef(null);
	// Open the modal
	const openSidebar = () => {
		if (MenuRef.current) {
			MenuRef.current.open();
		}
	};

	// Close the modal
	const closeSidebar = () => {
		if (MenuRef.current) {
			MenuRef.current.close();
		}
	};

	const modalRef = useRef(null);
	// Open the modal
	const openModal = () => {
		if (modalRef.current) {
			modalRef.current.open();
		}
	};

	// Close the modal
	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.close();
		}
	};

	const walletMenuActive = useMemo(() => {
		if (isMobile() && menuIsActive) {
			openModal();
			return false;
		}

		if (!isMobile() && menuIsActive) {
			return true;
		}

		return false;
	}, [menuIsActive]);

	const walletMenuSwitch = () =>
		isMobile() ? openModal() : dispatch(activateMenu(!menuIsActive));

	return (
		<ThemeProvider
			theme={theme === 'light' ? colors?.dayMode : colors?.nightMode}
		>
			<ScrollToTop />
			<EthereumListeners />
			<LayoutWrapper>
				<LayoutContainer>
					<SidebarWrapper
						className="intro-x"
						onAnimationStart={closeSidebar}
						style={{ transitionBehavior: 'allow-discrete' }}
					>
						<Sidebar />
					</SidebarWrapper>

					<PageFrame>
						<NavBar>
							<div className="basis-0 flex-grow min-w-0 flex" id="navContainer">
								<div className="flex items-end gap-[5px]">
									<VectorIcon width="38px" height="38px" vector={Icon} />
									<span className="text-[22px] font-[900] text-mainBody-text">
										Not A{' '}
										<i className="text-mainBody-yellow not-italic text-[20px]">
											Raffle
										</i>
									</span>
								</div>

								<button id="walletButton" onClick={walletMenuSwitch}>
									<BiSolidWalletAlt />
								</button>
							</div>
						</NavBar>

						<Outlet />

						<MenuButton onClick={openSidebar}>
							<TbGridDots />
						</MenuButton>
					</PageFrame>

					<SideMenuWrapper
						className="-intro-x"
						$isActive={Boolean(walletMenuActive)}
						style={{ transitionBehavior: 'allow-discrete' }}
						onAnimationStart={closeModal}
					>
						<WalletMenu closeModal={closeModal} />
					</SideMenuWrapper>

					<Modal.Center
						width="340px"
						maxWidth="90%"
						refName={modalRef}
						onClose={() => dispatch(activateMenu(!isMobile()))}
						onOpen={() => dispatch(activateMenu(true))}
					>
						<div className="w-full min-h-[600px] bg-sideMenu-background rounded-[20px] px-[10px]">
							<WalletMenu closeModal={closeModal} isMobile={true} />
						</div>
					</Modal.Center>

					<Modal.Bottom
						refName={MenuRef}
						width="80%"
						height="auto"
						onClose={() => {}}
						onOpen={() => {}}
					>
						<GlassMenuWrapper></GlassMenuWrapper>
					</Modal.Bottom>
				</LayoutContainer>
			</LayoutWrapper>
		</ThemeProvider>
	);
}

export default IndexLayout;
