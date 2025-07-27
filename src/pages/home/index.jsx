import React from 'react';
import { Container } from './elements/index.style';
import { VectorIcon } from '../../components/icon-components/index.style';
import { ReactComponent as Icon } from '../../assets/images/svg-raffle-icon5.svg';
// import { newTest } from  '../../utilities/testScrip'

function Index() {
	return (
		<Container>
			<VectorIcon
				width="40px"
				height="40px"
				vector={Icon}
				className=" ml-[30px] mt-[10px]"
			/>

			<div className="flex justify-around flex-wrap">
				<div className="box h-[200px] w-[200px] rounded-lg bg-mainBody-panel"></div>
				<div className="box h-[200px] w-[200px] rounded-lg bg-mainBody-panel"></div>
				<div className="box h-[200px] w-[200px] rounded-lg bg-mainBody-panel"></div>
			</div>
		</Container>
	);
}

export default Index;
