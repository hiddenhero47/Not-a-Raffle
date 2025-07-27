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
} from './index.style';
import Sidebar from '../sidebars/sidebar';
import EthereumListeners from '../../features/web3-services/web3-ethereum-listeners';
import Modal from '../../components/modal/index_modal';
import { activateMenu } from '../../store/slice/wallet';
import WalletMenu from '../side-menu/side-menu';

function IndexLayout() {
	const dispatch = useDispatch();
	const { theme } = useSelector((state) => state.themes);
	const { menuIsActive } = useSelector((state) => state.wallet);

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
		const isMobile = window.matchMedia('(max-width: 500px)').matches;

		if (isMobile && menuIsActive) {
			openModal();
			return false;
		}

		if (!isMobile && menuIsActive) {
			return true;
		}

		return false;
	}, [menuIsActive]);

	console.log(walletMenuActive, menuIsActive);

	return (
		<ThemeProvider
			theme={theme === 'light' ? colors?.dayMode : colors?.nightMode}
		>
			<ScrollToTop />
			<EthereumListeners />
			<LayoutWrapper>
				<LayoutContainer>
					<SidebarWrapper>
						<Sidebar />
					</SidebarWrapper>

					<PageFrame>
						<Outlet />
					</PageFrame>

					<SideMenuWrapper $isActive={Boolean(walletMenuActive)}>
						<WalletMenu closeModal={closeModal} />
					</SideMenuWrapper>

					<Modal.Center
						width="512px"
						maxWidth="90%"
						refName={modalRef}
						onClose={() => dispatch(activateMenu(false))}
						onOpen={() => {}}
					>
						<div>
							<WalletMenu closeModal={closeModal} />
						</div>
					</Modal.Center>
				</LayoutContainer>
			</LayoutWrapper>
		</ThemeProvider>
	);
}

export default IndexLayout;
