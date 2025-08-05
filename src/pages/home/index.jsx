import React from 'react';
import { Container } from './elements/index.style';
import { ReactComponent as Icon } from '../../assets/images/svg-raffle-icon4.svg';
import myImage from '../../assets/images/svg-raffle-icon4.svg';
import { VectorIcon } from '../../components/icon-components/index.style';
// import { newTest } from  '../../utilities/testScrip'

function Index() {
	return (
		<Container>
			<div>
				<VectorIcon width="100px" height="100px" vector={Icon} />

				<div className=" h-[300px] w-[300px]">
					<div className="imageHolder">
						<img src={myImage} alt="" />
					</div>
				</div>
			</div>
		</Container>
	);
}

export default Index;
