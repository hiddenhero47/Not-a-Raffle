import styled from 'styled-components';

export const LayoutWrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	/* background-image: radial-gradient(circle at top center, #1c244c, #0c0f27); */
	background-image:
		radial-gradient(
			circle at 63% 12%,
			${({ theme }) => theme?.mainBody?.bgPattern} 0%,
			${({ theme }) => theme?.mainBody?.bgPattern} 5%,
			transparent 5%,
			transparent 95%
		),
		radial-gradient(
			circle at 22% 57%,
			${({ theme }) => theme?.mainBody?.bgPattern} 0%,
			${({ theme }) => theme?.mainBody?.bgPattern} 5%,
			transparent 5%,
			transparent 95%
		),
		radial-gradient(
			circle at 17% 63%,
			${({ theme }) => theme?.mainBody?.bgPattern} 0%,
			${({ theme }) => theme?.mainBody?.bgPattern} 6%,
			transparent 6%,
			transparent 94%
		),
		radial-gradient(
			circle at 49% 89%,
			${({ theme }) => theme?.mainBody?.bgPattern} 0%,
			${({ theme }) => theme?.mainBody?.bgPattern} 6%,
			transparent 6%,
			transparent 94%
		),
		radial-gradient(
			circle at 82% 10%,
			${({ theme }) => theme?.mainBody?.bgPattern} 0%,
			${({ theme }) => theme?.mainBody?.bgPattern} 6%,
			transparent 6%,
			transparent 94%
		),
		radial-gradient(
			circle at 2% 34%,
			${({ theme }) => theme?.mainBody?.bgPattern} 0%,
			${({ theme }) => theme?.mainBody?.bgPattern} 6%,
			transparent 6%,
			transparent 94%
		),
		radial-gradient(
			circle at 75% 60%,
			${({ theme }) => theme?.mainBody?.bgPattern} 0%,
			${({ theme }) => theme?.mainBody?.bgPattern} 4%,
			transparent 4%,
			transparent 96%
		),
		radial-gradient(
			circle at 87% 43%,
			${({ theme }) => theme?.mainBody?.bgPattern} 0%,
			${({ theme }) => theme?.mainBody?.bgPattern} 4%,
			transparent 4%,
			transparent 96%
		),
		radial-gradient(
			circle at 30% 49%,
			${({ theme }) => theme?.mainBody?.bgPattern} 0%,
			${({ theme }) => theme?.mainBody?.bgPattern} 4%,
			transparent 4%,
			transparent 96%
		),
		radial-gradient(
			circle at 26% 78%,
			${({ theme }) => theme?.mainBody?.bgPattern} 0%,
			${({ theme }) => theme?.mainBody?.bgPattern} 4%,
			transparent 4%,
			transparent 96%
		),
		radial-gradient(
			circle at top center,
			${({ theme }) => theme?.mainBody?.backgroundLight},
			${({ theme }) => theme?.mainBody?.backgroundDark}
		);
`;

export const LayoutContainer = styled.div`
	width: 90%;
	max-width: 1296px;
	height: 86.66%;
	min-height: fit-content;
	max-height: 887.4px;
	display: flex;
	/* flex-wrap: wrap; */
	justify-content: center;
	align-items: center;
	position: relative;
`;

export const SidebarWrapper = styled.div`
	height: 90%;
	width: 0.625%;
	min-width: 72px;
	max-width: 75px;
	border-radius: 20px 0px 0px 20px;
	background-color: ${({ theme }) => theme.sidebar?.background};

	@media (max-width: 635px) {
		width: 0px;
		min-width: unset;
		max-width: unset;
		display: none;
	}
`;

export const GlassMenuWrapper = styled.div`
	width: 100%;
	height: 70px;
	border-radius: 20px;
	padding: 1px;
	background-color: ${({theme}) => theme?.sidebar?.bgGlass};
	border: 1px solid transparent;
	background-image: radial-gradient(
		circle at 50% 258%,
		${({theme}) => theme?.sidebar?.bgGlassSb},
		${({theme}) => theme?.sidebar?.bgGlass}
	);
`;

export const MenuButton = styled.button`
	display: none;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	top: calc(100% + 10px);

	@media (max-width: 635px) {
		padding: 5px;
		display: flex;
		background: ${({ theme }) => theme?.sidebar?.background};
		color: ${({ theme }) => theme?.mainBody?.sbText};
		border-radius: 9999px;
		font-size: 20px;
	}
`;

export const PageFrame = styled.div`
	flex-grow: 1;
	flex-basis: 0;
	min-width: 500px;
	height: 100%;
	border-radius: 20px;
	background-color: ${({ theme }) => theme.mainBody?.frameBg};
	border-width: 0px 2px 2px 0px;
	border-style: solid;
	border-color: ${({ theme }) => theme.mainBody?.frameBorder};
	background-image: linear-gradient(
		195deg,
		${({ theme }) => theme.mainBody?.frameLight} 0%,
		${({ theme }) => theme.mainBody?.frameDark} 90%
	);
	color: ${({ theme }) => theme?.mainBody?.text};
	z-index: 5;
	transition: all 0.4s;
	transition-timing-function: ease-in-out;

	@media (max-width: 635px) {
		width: 100%;
		min-width: unset;
		flex-grow: unset;
		flex-basis: unset;
	}
`;

export const SideMenuWrapper = styled.div`
	height: 90%;
	width: ${(props) => (props.$isActive ? '20%' : '0px')};
	min-width: ${(props) => (props.$isActive ? '216px' : 'unset')};
	max-width: ${(props) => (props.$isActive ? '240px' : 'unset')};
	display: ${(props) => (props.$isActive ? 'flex' : 'none')};
	border-radius: 0px 20px 20px 0px;
	background-color: ${({ theme }) => theme.sideMenu?.background};
	transition: all 0.2s;
	transition-timing-function: ease-in-out;

	div {
		visibility: ${(props) => (props.$isActive ? 'visible' : 'hidden')};
	}

	@media (max-width: 1150px) {
		display: none;
		width: 0px;
		min-width: unset;
		max-width: unset;
	}
`;

export const NavBar = styled.nav`
	width: 100%;
	height: fit-content;
	min-height: 10px;
	display: flex;
	position: relative;
	padding-inline: clamp(0px, 4.5%, 48px);
	padding-top: 15px;
	font-family: Outfit;
	align-items: center;

	#walletButton {
		margin-left: auto;
		padding: 3px;
		height: fit-content;
		border-radius: 5px;
		font-size: 20px;
		background-color: ${({theme}) => theme?.mainBody?.boxBgLight};
		color: ${({theme}) => theme?.mainBody?.icon};
		border: 1px solid ${({theme}) => theme?.mainBody?.boxBorder};
	}

	#navContainer {
		border-bottom: 1px solid ${({theme}) => theme?.mainBody?.boxBorder};
		padding-bottom: 13px;
	} 
`;