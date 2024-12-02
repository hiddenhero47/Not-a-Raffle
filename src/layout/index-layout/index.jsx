import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { colors } from '../../utilities/colors';
import { useSelector } from 'react-redux';
import ScrollToTop from '../scroll-to-top';

function IndexLayout() {
	const { theme } = useSelector((state) => state.themes);
	return (
		<ThemeProvider
			theme={theme === 'light' ? colors?.dayMode : colors?.nightMode}
		>
			<ScrollToTop />
			<div>
				<Outlet />
			</div>
		</ThemeProvider>
	);
}

export default IndexLayout;
