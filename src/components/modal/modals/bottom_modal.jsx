/* eslint-disable react/prop-types */
import React, {
	useState,
	useRef,
	useImperativeHandle,
	forwardRef,
} from 'react';
// import PropTypes from 'prop-types';
import { ModalBottomWrapper } from '../index_modal.style';
import { useElementDimensions } from '../../../utilities/dimensions';

function ModalBottom({ children, onClose, onOpen, height, animation }, ref) {
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
		<ModalBottomWrapper
			open={isOpen}
			onClose={closeModal}
			onClick={handelClose}
			ref={modalRef}
			$isOpen={isOpen}
			height={height}
			$animation={animation}
			$sizeY={useGetSize(modalRef).height}
		>
			{children}
		</ModalBottomWrapper>
	);
}

// ModalBottom.propTypes = {
// 	children: PropTypes.node,
// 	onClose: PropTypes.func,
// 	onOpen: PropTypes.func,
// 	height: PropTypes.string,
// 	animation: PropTypes.bool,
// };

export default forwardRef(ModalBottom);
