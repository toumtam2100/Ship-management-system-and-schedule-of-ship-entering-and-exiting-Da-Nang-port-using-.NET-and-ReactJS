import React, { useState } from 'react';
import { Button, Modal, Typography, Card, message, Alert } from 'antd';
import ShipOwnerMiniTable from '@app/components/tables/ShipOwnerMiniTable';
import { Link } from 'react-router-dom';

interface ShipOwnerSelectProps {
  onChange?: (selectedShipOwner: any) => void;
}

const ShipOwnerSelect: React.FC<ShipOwnerSelectProps> = ({ onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShipOwner, setSelectedShipOwner] = useState<any | null>(null);
  //const [modalInteracted, setModalInteracted] = useState(false);


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleShipOwnerSelect = (shipOwner: any) => {
    setSelectedShipOwner(shipOwner);
    console.log(shipOwner);
    setIsModalOpen(false);
    if (onChange) {
      onChange(shipOwner);
    }
  };
  const handleAddShipOwner = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Typography style={{ color: '#01509A' }}>Chủ tàu</Typography>
      {selectedShipOwner && (
        <Card
          style={{
            marginBottom: '10px',
            width: '340px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            border: '1px solid rgba(190,192,198,255)',
          }}
        >
          <span>{selectedShipOwner.fullName}</span>
        </Card>
      )}
      <Button
        onClick={handleAddShipOwner}
      >
        {selectedShipOwner ? 'Thay đổi chủ tàu' : 'Chọn chủ tàu'}
      </Button>
      <Modal
        title="Danh sách chủ tàu"
        visible={isModalOpen}
        //onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
        centered
        footer={[
          <div key="footerDiv" style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
            <Typography style={{ marginRight: '10px' }}>Chủ tàu không có trong danh sách?</Typography>
            <Link to="/register-new-ship-owner">
              <Button type="primary">Thêm mới</Button>
            </Link>
          </div>,
        ]}
      >
        <ShipOwnerMiniTable
          onSelect={handleShipOwnerSelect}
          selectedOwners={selectedShipOwner ? [selectedShipOwner] : []}
        />
      </Modal>
    </>
  );
};

export default ShipOwnerSelect;
