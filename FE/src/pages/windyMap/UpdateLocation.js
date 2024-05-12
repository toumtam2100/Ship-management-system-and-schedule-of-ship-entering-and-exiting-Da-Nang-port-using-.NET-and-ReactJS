import React, { useState } from 'react';
import { Input } from 'antd';
import './map.css';
import { Modal, message } from 'antd';
import './update.css';
const idToken = localStorage.getItem('idToken');
const updatePosition = async (shipId, newPosition) => {
  try {
    // const token = 'idToken';
    const url = `https://cangcadanang.asia/backend/api/Ship/update/position`;
    const response = await fetch(url, {
      method: 'PATCH', // Use PATCH method
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        id: shipId,
        position: newPosition,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update position');
    }

    const data = await response.json();
    // console.log('Updated position:', data);
    return data; // If you need to use the updated data in your application
  } catch (error) {
    console.error('Error updating position:', error);
    throw error;
  }
};
export function UpdateLocation({ setMarkers, shipId, setMapPosition, shipNum }) {
  // console.log(setMarkers);
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

  // const options = ship.map(item => ({ value: item.shipNum }));
  const [inputPosition, setInputPosition] = useState('');
  const handlePositionChange = (e) => {
    const { value } = e.target;
    // Remove non-numeric characters except commas and periods
    const cleanedValue = value.replace(/[^0-9.,-]/g, '');
    setInputPosition(cleanedValue);
    // console.log(inputPosition);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredPosition = inputPosition.split(',').map(Number);
    // console.log('Enter' + enteredPosition);
    // console.log('ShipId' + shipId);
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) => {
        if (marker.id === shipId) {
          return {
            ...marker,
            position: enteredPosition,
          };
        }
        return marker;
      }),
    );
    setMapPosition(enteredPosition);
    setIsModalOpen(false);
    setInputPosition('');
    message.success('Cập nhập tọa độ thành công !');
    updatePosition(shipId, enteredPosition);
  };

  return (
    <>
      <button className="updatePositionButton" onClick={showModal}>
        Cập nhật
      </button>

      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        className="modalStyle"
        mask={false}
        closable={false}
      >
        <div className="logoAtUpdate">
          {' '}
          <img src="/msb-dnp.ico" alt="" className="logo customMapLogo" />
        </div>
        <form onSubmit={handleSubmit} className="formtotal">
          <h2>{shipNum} !</h2>
          <label className="formfield toadotext">
            Tọa Độ:
            <Input
              style={{ width: '197px', height: '35px' }}
              type="text"
              name="position"
              value={inputPosition}
              onChange={handlePositionChange}
            />
          </label>
          <button className="customUpdateLocationButton" type="submit">
            Cập Nhập
          </button>
        </form>
      </Modal>
    </>
  );
}
