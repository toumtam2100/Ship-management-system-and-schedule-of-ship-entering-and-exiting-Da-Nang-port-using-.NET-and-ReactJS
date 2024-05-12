import React, { useState, useEffect } from 'react';
import './windyMap/map.css';
import { WindyMap } from './windyMap/WindyMap';
import { SearchLocation } from './windyMap/SearchLocation';
import { getAllShips, getAllShipsForMap } from '@app/api/ships.api'
import { retrieveImageFromS3 } from '@app/api/user.api';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

function MapLocationPage() {

  const [arrayTwo, setArrayTwo] = useState([])
  const [position, setMapPosition] = useState([13.8, 111.8]);
  const [zoom, setZoom] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shipData = await getAllShipsForMap();  // Assuming that this returns the response containing the 'result' array
        const arrPromises = shipData.result.map(async (item) => ({
          full_name: item.owner.fullName,
          gross_tonnage: item.grossTonnage,
          id: item.id,
          img: await retrieveImageFromS3(item.imagePath),  // Wait for the Promise to resolve
          length: item.length,
          name: item.name,
          owner_id: item.ownerId,
          phone_number: item.owner.phoneNumber,
          position: item.position,
          register_number: item.registerNumber,
          ship_status: item.shipStatus,
          ship_type: item.shipType,
          updated_at: item.updatedAt
        }));

        // Resolve all promises before setting the state
        const resolvedArr = await Promise.all(arrPromises);
        setArrayTwo(resolvedArr);
      } catch (error) {
        console.error('Error fetching ship data:', error);
      }
    };
    fetchData();
  }, []);

  console.log('Array two response:', arrayTwo);


  return (
    <>
      <PageTitle>Giám sát vị trí tàu</PageTitle>
      <div className="mapContainer">
        {arrayTwo !== null && (
          <>
            <div className="leafletMap">
              <WindyMap
                markers={arrayTwo}
                setMarkers={setArrayTwo}
                position={position}
                zoom={zoom}
                setMapPosition={setMapPosition}
              />
            </div>
            <div className="searchLocation">
              <SearchLocation
                ships={arrayTwo}
                setMapPosition={setMapPosition}
                setZoom={setZoom}
                setMarkers={setArrayTwo}
                position={position}
              />
            </div>
          </>
        )}
      </div>
    </>

  );

}
export default MapLocationPage;

