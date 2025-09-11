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
			color: #646d97;
		}

		h3 {
			font-size: 14px;
			color: #6b719a;
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
		background: #282d57;
		border-radius: 9999px;
	}

	#circleBox {
		width: 9px;
		height: 9px;
		border-radius: 9999px;
		border: 2px solid ${(props) => (props.$connect ? '#eeebfa' : '#6b719a')};
		box-shadow: ${(props) => (props.$connect ? '0px 0px 20px #eeebfa' : '')};
	}

	#textAddress {
		font-size: 11.5px;
		color: #b3b6cb;
		font-family: Outfit;
		font-weight: 700;
	}

	#buttonWalletTypes {
		padding: 3px;
		border: 1px solid ${({ theme }) => theme?.mainBody?.boxBorder};
		display: flex;
		border-radius: 5px;
		font-size: 19px;
		color: #6b719a;
		transition: transform 0.4s;
		transition-timing-function: ease-in-out;
	}
`;

export const DotBox = styled.div`
	border: 2px solid #a2ddaf;
	border: 2px solid ${(props) => (props.$isOn ? '#a2ddaf' : '#ffce80')};
	margin-top: 3px;
	border-radius: 9999px;
	margin-left: 5px;
	transition: border 0.4s;
	transition-timing-function: ease-in-out;
`;

export const MyConnectButton = styled.button`
	padding: 6px;
	border-radius: 5px;
	background-color: #2f3051;
	color: #b3b6cb;
	border: 1px solid #383961;
	font-size: 12.5px;
	font-family: Inter;
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
		background: #222447;
		height: ${(props) => (props.$isMobile ? '30px' : '25px')};
		width: 100%;
		border-radius: 4px;
		display: flex;
		align-items: center;
		font-size: 12px;
		font-family: Inter;
		color: #868bac;
		font-weight: 700;
		cursor: pointer;
		border: 1px solid #282d57;
	}

	.option.selected {
		color: #c7c2d6;
		background: #2f3051;
	}
`;
