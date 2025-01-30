/* eslint-disable react/prop-types */
import React, {
	useState,
	useRef,
	useImperativeHandle,
	forwardRef,
} from 'react';
// import PropTypes from 'prop-types';
import { ModalLeftWrapper } from '../index_modal.style';
import { useElementDimensions } from '../../../utilities/dimensions';

function ModalLeft(
	{ children, onClose, onOpen, width, animation, maxWidth },
	ref
) {
	const [isOpen, setIsOpen] = useState(false);
	const useGetSize = useElementDimensions;
	const modalRef = useRef(null);

	useImperativeHandle(
		ref,
		() => {
			return {
				open() {
					openModal();
				},
				close() {
					closeModal();
				},
			};
		},
		[]
	);

	function closeModal() {
		onClose();
		setIsOpen(false);
		(() => {
			modalRef.current.close();
		})();
	}

	function openModal() {
		onOpen();
		setIsOpen(true);
		(() => {
			modalRef.current.showModal();
		})();
	}

	function handelClose(event) {
		if (event && !event.target.contains(modalRef.current)) {
			return;
		}
		closeModal();
	}

	return (
		<ModalLeftWrapper
			open={isOpen}
			onClose={closeModal}
			onClick={handelClose}
			ref={modalRef}
			$isOpen={isOpen}
			width={width}
			$maxWidth={maxWidth}
			$animation={animation}
			$sizeX={useGetSize(modalRef).width}
		>
			{children}
		</ModalLeftWrapper>
	);
}

// ModalLeft.propTypes = {
// 	children: PropTypes.node,
// 	onClose: PropTypes.func,
// 	onOpen: PropTypes.func,
// 	width: PropTypes.string,
// 	maxWidth: PropTypes.string,
// 	animation: PropTypes.bool,
// };

export default forwardRef(ModalLeft);
