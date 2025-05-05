import styled from 'styled-components';

export const WalletMenuWrapper = styled.div`
	width: 100%;
	height: 100%;
	max-height: 100%;
	overflow-y: auto;
	position: relative;
    border-radius: inherit;

	#WalletLoader {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
        background-color: rgb(34, 37, 42, 0.4);
        border-radius: inherit;
		z-index: 30;

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
`;
