import styled from 'styled-components';

export const SidebarShell = styled.div`
	width: 100%;
	height: 100%;
	padding-block: 25px;
	border-radius: inherit;
	display: flex;

	.container {
		width: 100%;
		height: 100%;
		overflow-y: auto;

		&::-webkit-scrollbar {
			width: 3.5px;
		}
		&::-webkit-scrollbar-thumb {
			background-color: rgb(166, 171, 183, 0.7);
			border-radius: 40px;
		}
		&::-webkit-scrollbar-track {
			background-color: transparent;
		}
	}

	.wrapper {
		flex: 1;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: fit-content;
	}
`;

export const RoutersBox = styled.ul`
	width: 84%;
	height: fit-content;
	max-height: 799px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-bottom: 2px solid #51587b;
	padding-bottom: 5px;

	&::-webkit-scrollbar {
		width: 6px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: rgb(166, 171, 183, 0.7);
		border-radius: 40px;
	}
	&::-webkit-scrollbar-track {
		background-color: transparent;
	}
	gap: 5px;
`;

export const Options = styled.li`
	width: 100%;
	margin: 0;
	list-style: none;

	a {
		width: 100%;
		height: 56px;
		padding-block: 2px;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		text-decoration: none;
		border-radius: 5px;
		transition: all 0.3s;
		gap: 2px;
		font-family: Outfit;
		font-size: 11.3px;
		font-weight: 700;
		line-height: 18px;
		letter-spacing: 0em;
		text-align: center;
		color: ${({ $isActive, theme }) =>
			$isActive ? theme.sidebar.textActive : theme.sidebar.text};
		background-color: ${({ $isActive, theme }) =>
			$isActive ? theme.sidebar.bgActive : ''};

		&:hover {
			color: ${({ $isActive, theme }) =>
				$isActive ? '' : theme.sidebar.textHover};
		}
	}
`;

export const RoutersBoxFoot = styled.ul`
	margin-top: 10px;
	width: 84%;
	max-height: 144px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const OptionsFoot = styled.li`
	width: 100%;
	margin: 0;
	list-style: none;
	margin-bottom: 12px;

	a {
		width: 100%;
		height: 56px;
		padding-block: 2px;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		text-decoration: none;
		border-radius: 5px;
		transition: all 0.3s;
		gap: 2px;
		font-family: Outfit;
		font-size: 11.3px;
		font-weight: 700;
		line-height: 18px;
		letter-spacing: 0em;
		text-align: center;
		color: ${({ $isActive, theme }) =>
			$isActive ? theme.sidebar.textActive : theme.sidebar.text};
		background-color: ${({ $isActive, theme }) =>
			$isActive ? theme.sidebar.bgActive : ''};

		&:hover {
			color: ${({ $isActive, theme }) =>
				$isActive ? '' : theme.sidebar.textHover};
		}
	}

	button {
		width: 100%;
		height: 56px;
		padding-block: 2px;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		text-decoration: none;
		border-radius: 5px;
		transition: all 0.3s;
		gap: 2px;
		font-family: Outfit;
		font-size: 11.3px;
		font-weight: 700;
		line-height: 18px;
		letter-spacing: 0em;
		text-align: center;
		color: ${({ $isActive, theme }) =>
			$isActive ? theme.sidebar.textActive : theme.sidebar.text};
		background-color: ${({ $isActive, theme }) =>
			$isActive ? theme.sidebar.bgActive : ''};

		&:hover {
			color: ${({ $isActive, theme }) =>
				$isActive ? '' : theme.sidebar.textHover};
		}
	}
`;
