/* eslint-disable react/prop-types */
import React, {
	useState,
	useRef,
	useImperativeHandle,
	forwardRef,
} from 'react';
// import PropTypes from 'prop-types';
import { ModalCenterDialog, ModalContent } from '../index_modal.style';

function ModalCenter(
	{
		children,
		onClose,
		onOpen,
		width,
		maxWidth,
		mediaQuery,
		queryWidth,
		borderPaddingY,
	},
	ref
) {
	const [isOpen, setIsOpen] = useState(false);
	const modalRef = useRef(null);
	const ModalContentRef = useRef(null);

	useImperativeHandle(ref, () => {
		return {
			open() {
				openModal();
			},
			close() {
				closeModal();
			},
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function closeModal() {
		onClose();
		setIsOpen(false);
		// (() => {
		// 	modalRef.current.close();
		// })();
	}

	function openModal() {
		onOpen();
		setIsOpen(true);
		// (() => {
		// 	modalRef.current.showModal();
		// })();
	}

	function handelClose(event) {
		if (event && !event.target.contains(ModalContentRef.current)) {
			return;
		}
		closeModal();
	}

	return (
		<ModalCenterDialog open={isOpen} onClick={handelClose} ref={modalRef}>
			<ModalContent
				open={isOpen}
				onClose={closeModal}
				ref={ModalContentRef}
				$isOpen={isOpen}
				width={width}
				$maxWidth={maxWidth}
				$mediaQuery={mediaQuery}
				$queryWidth={queryWidth}
				$borderPaddingY={borderPaddingY}
			>
				{children}
			</ModalContent>
		</ModalCenterDialog>
	);
}

// ModalCenter.propTypes = {
// 	children: PropTypes.node,
// 	onClose: PropTypes.func,
// 	onOpen: PropTypes.func,
// 	width: PropTypes.string,
// 	maxWidth: PropTypes.string,
// };

export default forwardRef(ModalCenter);
