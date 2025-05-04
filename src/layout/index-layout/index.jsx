import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { colors } from '../../utilities/colors';
import { useSelector } from 'react-redux';
import ScrollToTop from '../scroll-to-top';
import {
	LayoutWrapper,
	LayoutContainer,
	SidebarWrapper,
	PageCard,
	SideMenuWrapper,
} from './index.style';
import Sidebar from '../sidebars/sidebar';
import EthereumListeners from '../../features/web3-services/web3-ethereum-listeners';

function IndexLayout() {
	const { theme } = useSelector((state) => state.themes);

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

	const active = true;
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

					<PageCard>
						<Outlet />
					</PageCard>

					<SideMenuWrapper $isActive={Boolean(active)}></SideMenuWrapper>
				</LayoutContainer>
			</LayoutWrapper>
		</ThemeProvider>
	);
}

export default IndexLayout;
