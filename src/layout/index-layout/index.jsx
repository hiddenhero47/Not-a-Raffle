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

function IndexLayout() {
	const { theme } = useSelector((state) => state.themes);

	const active = true;
	return (
		<ThemeProvider
			theme={theme === 'light' ? colors?.dayMode : colors?.nightMode}
		>
			<ScrollToTop />
			<LayoutWrapper>
				<LayoutContainer>
					<SidebarWrapper></SidebarWrapper>
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
