import { useState, useEffect } from 'react';
import { Input } from 'antd';
import './searchLocation.css';
import { Pagination } from 'antd';
import { UpdateLocation } from './UpdateLocation';

export function SearchLocation({ ships, setMapPosition, setZoom, setMarkers, position }) {
  const [searchShip, setSearchShip] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [filteredShipData, setFilteredShipData] = useState([]);
  const role = localStorage.getItem('role');
  useEffect(() => {
    // Filter ship data based on search criteria
    const filteredData = ships.filter(
      (item) =>
        item.full_name.toLowerCase().includes(searchShip.toLowerCase()) ||
        item.phone_number.toLowerCase().includes(searchShip.toLowerCase()),
    );
    setFilteredShipData(filteredData);
  }, [searchShip, ships, currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
    setFilteredShipData([]);
  };

  const handleSearchShip = (value) => {
    setSearchShip(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredShipData.slice(indexOfFirstItem, indexOfLastItem);
  const handleShipClick = (position1) => {
    setMapPosition(position1);
    setZoom(8);
    // setIsPopupOpen(false);
  };

  return (
    <>
      <button className="customDPMButton" onClick={() => setIsPopupOpen(true)}>
        <span className="buttonText">DPM Control</span>
        <img src="/msb-dnp.ico" alt="" className="logo customMapLogo" />
      </button>
      {isPopupOpen && (
        <div className="popupContainerSearch">
          <div className="popupContent">
            <div className="popupHeader">
              <h3>Danh sách tàu thuộc DPM </h3>
              <span style={{ fontSize: '12px', color: '#61A5C2', marginTop: '4px', marginRight: '10px', textDecoration: 'underline' }}>5/27 tàu đang ra khơi</span>
              <span
                className="closeIcon"
                onClick={() => {
                  setIsPopupOpen(false);
                  setSearchShip('');
                }}
              >
                x
              </span>
            </div>

            <Input.Search
              placeholder="Tìm bẳng tên hoặc số điện thoại"
              onChange={(e) => handleSearchShip(e.target.value)}
              style={{ marginBottom: '8px' }}
              allowClear
            />
            <div className="shipList">
              {currentItems.map((item) => (
                <div className="shipDataFilterSearch" key={item.id}>
                  <div className="shipImgSearch">
                    <img src={item.img} alt="Ship Image" />
                  </div>
                  <div className="otherInfo">
                    <div className="searchLocation_NameNum">
                      <span className="shipNum">{item.register_number} | </span>
                      <span className="ownerName" style={{ color: '#' }}>
                        {item.name}
                      </span>
                    </div>
                    <div className="searchLocation_Description">
                      <p>
                        Tàu <span style={{ color: '#' }}>{item.name}</span>, thuộc sở hữu của{' '}
                        <span style={{ color: '#' }}>{item.full_name}</span>. Cần liên hệ, hãy gọi đến sđt: {' '}
                        {item.phone_number}
                      </p>
                    </div>
                    <div className="locationAndEdit">
                      <div
                        className="searchLocation_Position"
                        onClick={() => {
                          // const mn = document.querySelectorAll('.plugin-menu');
                          // if (mn.length > 1) {
                          //   mn.forEach((element, index) => {
                          //     if (index > 0) {
                          //       element.style.display = 'none'; // Set display property to 'none' to hide the element
                          //     }
                          //   });
                          // }
                          if (item.position[0] === position[0] && item.position[1] === position[1]) {
                            const newPosition = [position[0], position[1] + 0.00001];
                            handleShipClick(newPosition);
                          } else {
                            handleShipClick(item.position);
                          }
                        }}
                      >
                        <span className="custom-svg-container">
                          <svg
                            className="custom-svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                              <path
                                className="icon-path"
                                d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                                stroke="#000000"
                                strokeWidth="1.056"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                className="icon-path"
                                d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                                stroke="#000000"
                                strokeWidth="1.056"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </g>
                          </svg>
                          <span>{`Vĩ độ: ${item.position[0].toFixed(2)} | Kinh độ: ${item.position[1].toFixed(
                            2,
                          )}`}</span>
                        </span>
                      </div>

                      <div className="updatePositionButon">
                        {' '}
                        {role == 'PortAuthority' ? <UpdateLocation
                          shipId={item.id}
                          setMarkers={setMarkers}
                          setMapPosition={setMapPosition}
                          shipNum={item.register_number}
                        ></UpdateLocation> : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="customPagination">
                <Pagination
                  className="pagination"
                  current={currentPage}
                  pageSize={itemsPerPage}
                  total={filteredShipData.length}
                  // total={50}
                  // defaultCurrent={4}
                  showLessItems={true}
                  size="small"
                  onChange={onPageChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
