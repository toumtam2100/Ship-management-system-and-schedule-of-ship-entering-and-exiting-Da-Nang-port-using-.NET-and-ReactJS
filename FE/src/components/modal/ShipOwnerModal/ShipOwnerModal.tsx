import { Modal } from 'antd';
import React, { useState } from 'react';

const ShipOwnerModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal title="Danh sách chủ tàu" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>Item</p>
      <p>Item</p>
      <p>Item</p>
    </Modal>
  );
};

export default ShipOwnerModal;
