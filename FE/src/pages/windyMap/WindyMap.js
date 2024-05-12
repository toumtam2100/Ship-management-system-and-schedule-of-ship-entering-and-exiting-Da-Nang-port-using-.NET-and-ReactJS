import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';
import speedboatIcon from './speedboat.png';
import { renderToString } from 'react-dom/server';

import eezGeoJSON from './eez.json';

var Leaflet = L.noConflict();

// console.log(L.version);

const customIcon = new Leaflet.Icon({
  iconUrl: speedboatIcon,
  iconSize: [28, 28],
});

export function WindyMap({ markers, position, zoom, setMapPosition }) {
  useEffect(() => {
    const options = {
      key: 'mmEUFG26kTMEFUTCbaT013ahWIuFDR6L',
      verbose: true,
      // zoom: zoom,
      // lat: position[0] + 0.2,
      // lon: position[1] + 1,
      // lat: 14.3,
      // lon: 111.3
    };
    if (markers.length > 0) {

      // Load Leaflet script
      const leafletScript = document.createElement('script');
      leafletScript.src = 'https://unpkg.com/leaflet@1.4.0/dist/leaflet.js';
      leafletScript.async = true;
      document.body.appendChild(leafletScript);

      // Load Windy API script
      const windyScript = document.createElement('script');
      windyScript.src = 'https://api.windy.com/assets/map-forecast/libBoot.js';
      windyScript.async = true;
      document.body.appendChild(windyScript);

      // Initialize Windy API and Leaflet map
      leafletScript.onload = () => {
        document.body.appendChild(windyScript);
      };
      if (window.windyAPI) {
        window.windyAPI.stop();
        delete window.windyAPI;
      }
      windyScript.onload = () => {
        window.windyInit(options, (windyAPI) => {
          const { map } = windyAPI;

        const geojsonFeature = {
          type: 'FeatureCollection',
          features: eezGeoJSON.features,
        };
   
        const leafletPolygons = L.geoJSON(geojsonFeature, {
          style: {
            fillColor: 'transparent',
            color: '#bebfbd',
            weight: 1.8,
          },
        });

          leafletPolygons.addTo(map);
          // Add markers to the Leaflet map with popup form
          // console.log(markers)

          markers.forEach((marker) => {
            const popupContentString = renderToString(
              <div className="popUpContainer">
                <div className="popUpContainer">
                  <div className="imgInfor">
                    <div className="shipImg">
                      <img src={marker.img} alt="Ship" />
                    </div>
                    <div className="shipInfo">
                      <div className="nameNum">
                        <span>
                          {marker.name} | {marker.register_number}
                        </span>
                      </div>
                      <div className="position">
                        <span>
                          <label>Tọa độ: </label>
                          <div></div>
                          {`${marker?.position[0]},${marker?.position[1]}`}
                        </span>
                        <span>
                          <label>Chủ tàu: </label>
                          <div></div>
                          {marker.full_name}
                        </span>
                      </div>
                      <div className="lengthPower">
                        <span>
                          <label>Chiều dài: </label>
                          {marker.length}m
                        </span>
                        <span>
                          <label>Trọng tải: </label>
                          {marker.gross_tonnage}DWT
                        </span>
                      </div>
                      <div className="ownerNote">
                        <label>Cập nhập vào: </label>
                        <span>{new Date(marker.updated_at).toLocaleString()}</span>

                      </div>
                    </div>
                  </div>
                  <div className="ButtonPart">
                    <a href={`/nearbyShip/${marker.id}`} className="popupButton nearby">
                      Tàu lân cận
                    </a>
                    <a href={`/ship-detail/${marker.id}`} className="popupButton detail">
                      Chi tiết tàu
                    </a>
                  </div>
                </div>
              </div>,
            );

            const container = document.createElement('div');
            container.innerHTML = popupContentString;
            // (marker.position[0] === position[0] && (marker.position[1] <= position[1] + 0.0001)) ?
            //   Leaflet.marker(marker.position, { icon: customIcon }).addTo(map).bindPopup(container).openPopup() :
            //   Leaflet.marker(marker.position, { icon: customIcon }).addTo(map).bindPopup(container);

            // Append the container element to the Leaflet popup
            if (
              (marker.position[0] === position[0] && marker.position[1] === position[1]) ||
              (marker.position[0] === position[0] && marker.position[1] + 0.0001 >= position[1])
            ) {
              Leaflet.marker(marker.position, { icon: customIcon }).addTo(map).bindPopup(container).openPopup();
            } else {
              Leaflet.marker(marker.position, { icon: customIcon }).addTo(map).bindPopup(container);
            }
            // if ((marker.position[1] === position[1]) ||
            //   (marker.position[0] === position[0] && marker.position[1] >= position[1] && marker.position[1] <= position[1] + 0.001)) {
            //   Leaflet.marker(marker.position, { icon: customIcon }).addTo(map).bindPopup(container).openPopup();
            // } else {
            //   Leaflet.marker(marker.position, { icon: customIcon }).addTo(map).bindPopup(container);
            // }
          });

          const newPosition = [position[0] + 0.2, position[1] + 1];
          map.setView(newPosition, zoom);
        });
      };
      return () => {
        document.body.removeChild(windyScript);
        document.body.removeChild(leafletScript);
      };
    }
  }, [markers, position, zoom]);

  return (
    <div>
      <div id="windy"></div>
    </div>
  );
}
