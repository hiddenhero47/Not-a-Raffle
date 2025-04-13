import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import wagmiConfig, { chains } from './features/web3-services/connector-config';
// import './index.css';
import IndexLayout from './layout/index-layout/index';
import AppToast from './layout/toast';
import Home from './pages/home';
import AboutUs from './pages/about-us';
import Settings from './pages/settings';
import NotFound from './pages/not-found';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<WagmiProvider config={wagmiConfig}>
				<RainbowKitProvider chains={chains}>
					<Router>
						<div className="containerBody">
							<Routes>
								<Route element={<IndexLayout />}>
									<Route path="/" element={<Home />} />
									<Route path="/about-us" element={<AboutUs />} />
									<Route path="/settings" element={<Settings />} />
								</Route>
								<Route path="*" element={<NotFound />} />
							</Routes>
						</div>
					</Router>
					<AppToast />
				</RainbowKitProvider>
			</WagmiProvider>
		</QueryClientProvider>
	);
}

export default App;
