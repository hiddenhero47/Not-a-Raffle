import styled from 'styled-components';

export const WalletMenuWrapper = styled.div`
	width: 100%;
	height: 100%;
	max-height: 100%;
	overflow-y: auto;
	position: relative;
	border-radius: inherit;
	font-family: Outfit;

	#WalletLoader {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		background-color: rgb(34, 37, 42, 0.4);
		border-radius: inherit;
		z-index: 30;
		top: 0;
		left: 0;

		.loader_box {
			margin: auto;
		}
	}
`;

export const WalletMenuContainer = styled.div`
	width: 100%;
	height: fit-content;
	display: flex;
	flex-direction: column;
	padding-inline: 7px;
`;

export const Header = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: 17px;

	#titleConnect {
		width: fit-content;
		display: flex;
		align-items: center;
		gap: 5px;

		i {
			font-size: 26px;
			color: ${({ theme }) => theme?.sideMenu?.iconColor};
		}

		h3 {
			font-size: 14px;
			color: ${({ theme }) => theme?.sideMenu?.textSb};
			font-family: Inter;
		}

		span {
			font-family: Hanken Grotesk;
			font-weight: 900;
			color: ${(props) => (props.$connect ? '#0088E8' : '#D93E39')};
		}
	}
`;

export const ConnectionPanel = styled.div`
	width: 100%;
	height: fit-content;
	min-height: ${(props) => (props.$dropdown ? '160px' : '100px')};
	background-color: #1b1f42;
	margin-top: 25px;
	margin-bottom: 10px;
	border-radius: 10px;
	padding: 7px;
	padding-bottom: 10px;
	transition: ${(props) => (props.$dropdown ? '' : 'min-height 0.4s')};
	transition-timing-function: ease-in-out;

	.line {
		background: ${({ theme }) => theme?.sideMenu?.line};
		border-radius: 9999px;
	}

	#circleBox {
		width: 9px;
		height: 9px;
		border-radius: 9999px;
		border: 2px solid
			${(props) =>
				props.$connect
					? props.theme?.sideMenu.circleBox
					: props.theme?.sideMenu.circleBoxSb};
		box-shadow: ${(props) =>
			props.$connect && `0px 0px 20px ${props.theme?.sideMenu.circleBox}`};
		margin-left: 5px;
	}

	#textAddress {
		font-size: 11.5px;
		color: ${({ theme }) => theme?.sideMenu?.text};
		font-family: Outfit;
		font-weight: 700;
	}

	#buttonWalletTypes {
		padding: 3px;
		border: 1px solid ${({ theme }) => theme?.mainBody?.boxBorder};
		display: flex;
		border-radius: 5px;
		font-size: 19px;
		color: ${({ theme }) => theme?.sideMenu?.textSb};
		transition: transform 0.4s;
		transition-timing-function: ease-in-out;
	}
`;

export const DotBox = styled.div`
	border: 2px solid #a2ddaf;
	border: 2px solid
		${(props) =>
			props.$isOn
				? props.theme?.sideMenu.statusGreen
				: props.theme?.sideMenu.statusYellow};
	margin-top: 3px;
	border-radius: 9999px;
	margin-left: 5px;
	transition: border 0.4s;
	transition-timing-function: ease-in-out;
`;

export const MyConnectButton = styled.button`
	padding: 6px;
	border-radius: 5px;
	background-color: ${({ theme }) => theme?.sideMenu?.btnBg};
	color: ${({ theme }) => theme?.sideMenu?.text};
	border: 1px solid ${({ theme }) => theme?.sideMenu?.btnBorder};
	font-size: 12.5px;
	font-family: Inter;
	margin-right: 3px;
`;

export const DropdownWrapper = styled.div`
	width: 90%;
	display: ${(props) => (props.$dropdown ? 'flex' : 'none')};
	flex-direction: column;
	gap: 5px;
	align-items: center;
	margin: 10px auto 0;

	position: relative;
	animation-duration: 0.4s;
	animation-timing-function: ease-in-out;
	animation-fill-mode: forwards;

	@keyframes opening-y-animation {
		from {
			opacity: 0;
			transform: scaleY(0);
		}
		to {
			opacity: 1;
			transform: scaleY(1);
		}
	}

	&.open:nth-child(n) {
		z-index: calc(50 - (n - 1));
		animation-name: opening-y-animation;
	}

	.option {
		background: ${({ theme }) => theme?.sideMenu?.boxSb};
		height: ${(props) => (props.$isMobile ? '30px' : '25px')};
		width: 100%;
		border-radius: 4px;
		display: flex;
		align-items: center;
		font-size: 12px;
		font-family: Inter;
		color: ${({ theme }) => theme?.sideMenu?.boxSbText};
		font-weight: 700;
		cursor: pointer;
		border: 1px solid ${({ theme }) => theme?.sideMenu?.boxBorder};
	}

	.option.selected {
		color: ${({ theme }) => theme?.sideMenu?.boxText};
		background: ${({ theme }) => theme?.sideMenu?.box};
	}
`;
