import React, { useRef } from 'react';
import { toast } from "react-toastify";
import Modal from '../../components/modal/index_modal';

function Index() {
	const modalRef = useRef(null);

	// Open the modal
	const openModal = () => {
		if (modalRef.current) {
			modalRef.current.open();
		}
	};

	// Close the modal
	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.close();
		}
	};

  toast.success("good");
	return (
		<div className="text-blue-50">
      <button onClick={openModal}>open</button>
			<Modal.Center
				refName={modalRef}
				onOpen={() => {}}
				onClose={() => {}}
				width={'450px'}
				max-width="90%"
			>
				<div className=' w-full bg-black'>dddd</div>
			</Modal.Center>
		</div>
	);
}

export default Index;
