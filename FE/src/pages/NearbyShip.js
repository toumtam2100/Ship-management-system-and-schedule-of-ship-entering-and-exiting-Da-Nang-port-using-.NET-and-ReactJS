
import React from 'react';

import { Table } from 'antd';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllShipsForMap } from '@app/api/ships.api'

const columns = [
  {
    title: 'TÊN TÀU',
    dataIndex: 'name',
    key: 'shipName',
  },
  {
    title: 'SỐ HIỆU',
    dataIndex: 'register_number',
    key: 'shipNum',
  },
  {
    title: 'TRỌNG TẢI',
    dataIndex: 'gross_tonnage',
    key: 'power',
    render: (text) => (
      <span>{text}dwt</span>
    ),
  },
  {
    title: 'CHIỀU DÀI',
    dataIndex: 'length',
    key: 'shipLength',
    render: (text) => (
      <span>{text}m</span>
    ),
  },
  {
    title: 'SĐT CHỦ TÀU',
    dataIndex: 'phone_number',
    key: 'ownerPhone',
  },
  {
    title: 'KHOẢNG CÁCH',
    dataIndex: 'distance',
    key: 'distance',
    render: (text) => (
      <span>{(text / 1000).toFixed(2)} km</span>
    ),
  },
  {
    title: 'TỌA ĐỘ',
    dataIndex: 'position',
    key: 'position',
    render: (text) => (
      <span>{`${text[0]} , ${text[1]}`}</span>
    ),
  },
];


function NearbyShip() {

  const [arrayTwo, setArrayTwo] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const shipData = await getAllShipsForMap();
        // console.log('Ship data at map:', shipData);
        const arr = shipData.result.map(item => ({
          full_name: item.owner.fullName,
          gross_tonnage: item.grossTonnage,
          id: item.id,
          img: item.imagePath ? item.imagePath : 'https://plus.unsplash.com/premium_photo-1663050763676-82ff02c5e02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          length: item.length,
          name: item.name,
          owner_id: item.ownerId,
          phone_number: item.owner.phoneNumber,
          position: item.position,
          register_number: item.registerNumber,
          ship_status: item.shipStatus,
          ship_type: item.shipType,
          updated_at: item.updatedAt,
        }));

        setArrayTwo(arr);
      } catch (error) {
        console.error('Error fetching ship data:', error);
      }
    };
    fetchData();
  }, []);
  // console.log(arrayTwo)
  const { id } = useParams();
  // console.log(id);

  const findPositionById = (markerId) => {
    const marker = arrayTwo?.find(marker => marker.id === parseInt(markerId));
    return marker ? marker.position : null;
  };

  const calculateDistance = (coord1, coord2) => {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;

    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // in metres
    return distance;
  };
  const handleNearbyShips = (id) => {
    const currentPosition = findPositionById(id);

    if (!currentPosition) {
      console.error('Marker position not found for ID:', id);
      return;
    }

    const nearbyMarkers = arrayTwo?.map(marker => {
      if (marker.id !== parseInt(id)) {
        const distance = calculateDistance(currentPosition, marker.position);
        if (distance <= 100000) return { ...marker, distance }; // 100km in meters
      }
      return null;
    }).filter(Boolean);

    // console.log('Nearby markers:', nearbyMarkers);
    return nearbyMarkers;
  };
  const data = handleNearbyShips(id);

  // console.log('data:', data);
  return (
    <div className=''>
      <h2>Các Tàu Lân Cận Trong Bán Kính 100km</h2>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
export default NearbyShip;
