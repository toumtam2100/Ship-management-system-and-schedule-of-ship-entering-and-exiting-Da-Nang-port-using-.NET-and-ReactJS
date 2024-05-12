import '@app/components/forms/DepartureRegisterForm/formCrew.css';
import { Input } from 'antd';
import { DatePicker, Space } from 'antd';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { Select } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { message } from 'antd';
import { getAllCrew } from '@app/api/crew.api';
import { getAllShips } from '@app/api/ships.api';
import { getAllUsers } from '@app/api/allUsers.api';
import { generatePDFArrival } from '@app/components/pdf/PDFArrival';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { retrieveImageFromS3 } from '@app/api/user.api';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';



interface SubmitRegistry {
  shipId: any;
  departureTime: any;
  captainId: any;
  expectedTimeArrivalTime: any;
  purpose: any;
  crew: any;
}
interface CrewTableProp {
  crewd: any;
  onDelete: any;
}

interface Crew {
  id: number;
  fullName: string;
  country: string;
  cardID: string;
  yearExperience: number;
  phone: string;
}

const ArrivalRegisterPage = () => {
  const idToken = localStorage.getItem('idToken');
  const role = localStorage.getItem('role');
  const approveStatus = { role: role === 'PortAuthority' ? 'ApprovedByPortAuthority' : 'None' };
  // console.log('role: ', role);
  // console.log('aAprroveStatus', approveStatus);
  const statusString = approveStatus.role;
  // console.log(statusString);
  const [crewdata, setCrewData] = useState<any[]>([]);
  const [crewdataorigin, setCrewDataOrigin] = useState<any[]>([]);
  const [isModalShipOpen, setIsModalShipOpen] = useState(false);
  const [selectedShip, setSelectedShip] = useState<any | null>(null);
  const [selectedCaptain, setSelectedCaptain] = useState<any | null>(null);
  const [selectedCrew, setSelectedCrew] = useState<Crew | null>(null);
  const [submitRegistry, setSubmitRegistry] = useState<any>({
    shipId: null,
    arrivalTime: null,
    captainId: null,
    // expectedTimeArrivalTime: null,
    purpose: 214983902,
    crew: null,
    ownerName: null,
    grossTonnage: null,
    captainName: null,
    registerNumber: null,
    shipName: null,
  });
  const [searchShip, setSearchShip] = useState<string>('');
  const [searchCaptain, setSearchCaptain] = useState<string>('');
  const [searchCrew, setSearchCrew] = useState<string>('');
  const [crewTable, setCrewTable] = useState<any>(null);
  const [shipData, setShipData] = useState<any[]>([]);
  const [userData, setUserData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCrew(idToken);
        const crewData1 = response.result;
        // console.log('Crew data:', crewData1);
        setCrewData(crewData1);
        setCrewDataOrigin(crewData1);
        // Do something with the crew data
      } catch (error) {
        console.error('Error fetching crew data:', error);
        // Handle the error
      }
    };

    fetchData(); // Call the function to fetch crew data when component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  useEffect(() => {
    const fetchData = async () => {
      if (idToken) {
        try {
          const ships = await getAllShips();
          // console.log('Ships with images:', ships);
          setShipData(ships);
          // setCrewDataOrigin(crewData1);
          // Do something with the crew data
        } catch (error) {
          console.error('Error fetching crew data:', error);
          // Handle the error
        }
      }
    };

    fetchData(); // Call the function to fetch crew data when component mounts
  }, [idToken]); // Empty dependency array ensures the effect runs only once

  // useEffect(() => {
  //   const fetchImagesAndTransformShips = async () => {
  //     const shipsWithImages = await Promise.all(
  //       shipData.map(async (ship) => {
  //         const imageUrl = ship.imagePath
  //           ? await retrieveImageFromS3(ship.imagePath)
  //           : 'https://plus.unsplash.com/premium_photo-1663050763676-82ff02c5e02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // Default image link
  //         return {
  //           id: ship.id,
  //           shipNum: ship.registerNumber,
  //           shipName: ship.name,
  //           shipLength: parseFloat(ship.length),
  //           power: ship.totalPower + ' DWT',
  //           ownerPhone: ship.owner.phoneNumber,
  //           ownerName: ship.owner.fullName,
  //           img: imageUrl,
  //         };
  //       }),
  //     );
  //     setTransformedShips(shipsWithImages);
  //   };

  //   if (shipData.length > 0) {
  //     fetchImagesAndTransformShips();
  //   }
  // }, [shipData]);

  useEffect(() => {
    const fetchData = async () => {
      if (idToken) {
        try {
          const users = await getAllUsers(idToken);
          // console.log('Users with avatars:', users);
          setUserData(users);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Handle the error
        }
      }
    };

    fetchData(); // Call the function to fetch crew data when component mounts
  }, [idToken]); // Empty dependency array ensures the effect runs only once

  const transformUser = userData
    .filter((user) => user.role === 'User')
    .map(({ id, fullName, country, nationalId, phoneNumber, email, avatar }) => ({
      id,
      fullName: fullName || 'Chưa cập nhập tên',
      country,
      cardId: nationalId,
      yearExperience: null,
      phoneNumber,
      image:
        avatar !== 'string'
          ? avatar
          : 'https://img.freepik.com/free-psd/3d-illustration-bald-person-with-glasses_23-2149436184.jpg', // Default image link if avatar is null
      email,
    }));

  // console.log('transformUser' + transformUser);

  const transformedShips = shipData.map((ship) => {
    return {
      id: ship.id,
      shipNum: ship.registerNumber,
      shipName: ship.name,
      shipLength: parseFloat(ship.length),
      power: ship.totalPower + ' DWT', // Assuming 'totalPower' is in DWT
      ownerPhone: ship.owner.phoneNumber,
      ownerName: ship.owner.fullName,
      grossTonnage: ship.grossTonnage,
      registerNumber: ship.registerNumber,
      img: ship.imagePath,
    };
  });

  // console.log('transformedship:', transformedShips);

  const registerArrivalUser = async (
    shipId: any,
    portId: any,
    captainId: any,
    attachment: any,
    crewIds: any,
    approveStatus: any,
    arrivalTime: any,
    actualArrivalTime: any,
    isStart: any,
  ) => {
    try {
      const token = localStorage.getItem('idToken');
      const url = `https://cangcadanang.asia/backend/api/Registration/arrival`; // Replace 'https://example.com/api/user/register/arrival' with your actual API endpoint
      const response = await fetch(url, {
        method: 'POST', // Use POST method
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shipId: shipId,
          portId: portId,
          captainId: captainId,
          attachment: attachment,
          crewIds: crewIds,
          approveStatus: approveStatus,
          arrivalTime: arrivalTime,
          actualArrivalTime: actualArrivalTime,
          isStart: isStart,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register arrival user');
      }

      const data = await response.json();
      // console.log('Registered arrival user:', data);
      return data; // If you need to use the response data in your application
    } catch (error) {
      console.error('Error registering arrival user:', error);
      throw error;
    }
  };

  const showModalShip = () => {
    setIsModalShipOpen(true);
  };

  const handleOkShip = () => {
    setIsModalShipOpen(false);
  };

  const handleCancelShip = () => {
    setIsModalShipOpen(false);
  };

  const [isModalCaptainOpen, setIsModalCaptainOpen] = useState(false);

  const showModalCaptain = () => {
    setIsModalCaptainOpen(true);
  };

  const handleOkCaptain = () => {
    setIsModalCaptainOpen(false);
  };
  const handleCancelCaptain = () => {
    setIsModalCaptainOpen(false);
  };
  const [isModalCrewOpen, setIsModalCrewOpen] = useState(false);

  const showModalCrew = () => {
    setIsModalCrewOpen(true);
  };

  const handleOkCrew = () => {
    setIsModalCrewOpen(false);
  };
  const handleCancelCrew = () => {
    setIsModalCrewOpen(false);
  };
  const handleDelete = (id: any) => {
    // console.log('idne' + id);
    setCrewTable((prevCrewTable: any) => {
      return prevCrewTable?.filter((item: any) => item.id !== id);
    });
    setSubmitRegistry((prevState: any) => ({
      ...prevState,
      crew: prevState && prevState.crew ? prevState.crew.filter((crewId: any) => crewId !== id) : [],
    }));
    const newCrewMember = crewdataorigin?.find((crewMember) => crewMember.id === id);
    if (newCrewMember) {
      // Update 'crewdata' state by adding the new crew member to the existing array
      setCrewData((prevCrewData) => [...(prevCrewData || []), newCrewMember]);
    }
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Prevent the default form submission
    // console.log('submitregistr', submitRegistry);

    try {
      const arrivalTimeISO = new Date(submitRegistry.arrivalTime).toISOString();

      //Get PDF key
      const attachmentKey = await generatePDFArrival(submitRegistry);

      // Call registerArrivalUser with form data
      await registerArrivalUser(
        submitRegistry.shipId,
        submitRegistry.purpose,
        submitRegistry.captainId,
        attachmentKey,
        submitRegistry.crew,
        statusString,
        arrivalTimeISO,
        '2024-04-01T06:48:48.680Z',
        false,
      );
      setSelectedShip(null);
      setCrewTable(null);
      setCrewData(crewdataorigin);
      setSubmitRegistry({
        shipId: null,
        arrivalTime: null,
        captainId: null,
        // expectedTimeArrivalTime: null,
        purpose: 347719738,
        crew: null,
      });
      message.success('Bạn đã đăng kí vào cảng thành công !');
      /* Other form field values */
      // shipId:any, portId:any, captainId:any, crewIds:any, approveStatus:any, arrivalTime:any, actualArrivalTime:any, isStart:any
    } catch (error) {
      console.error('Error registering arrival user:', error);
      message.error('Đăng kí không thành công, vui lòng kiểm tra thông tin và thử lại !');
    }
  };
  const handleSearchShip = (value: string) => {
    setSearchShip(value);
  };
  const handleSearchCrew = (value: string) => {
    setSearchCrew(value);
  };
  const handleSearchCaptain = (value: string) => {
    setSearchCaptain(value);
  };
  // console.log;
  // console.log('trannsfrom'+ transformedShips);
  const filteredShipData = transformedShips.filter(
    (item) =>
      item?.ownerName?.toLowerCase().includes(searchShip?.toLowerCase()) ||
      item?.ownerPhone?.toLowerCase().includes(searchShip?.toLowerCase()),
  );
  const filteredCaptainData = transformUser.filter(
    (item) =>
      item?.fullName?.toLowerCase().includes(searchCaptain?.toLowerCase()) ||
      item?.phoneNumber?.toLowerCase().includes(searchCaptain?.toLowerCase()),
  );
  const filteredCrewData = crewdata?.filter(
    (item) =>
      item?.fullname?.toLowerCase().includes(searchCrew?.toLowerCase()) ||
      item?.relativePhoneNumber?.toLowerCase().includes(searchCrew?.toLowerCase()),
  );
  const { RangePicker } = DatePicker;
  const onChange = (value: DatePickerProps['value'], dateString: string) => {
    // console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
    setSubmitRegistry(
      (prevState: any) =>
        ({
          ...prevState,
          arrivalTime: dateString,
        } as SubmitRegistry),
    );
    // console.log('ngay ne'+ typeof(submitRegistry.arrivalTime) + submitRegistry.arrivalTime)
  };

  const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    // console.log('onOk: ', value);
  };
  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current <= moment().endOf('day').subtract(1, 'days');
  };
const navigate = useNavigate()
  return (
    <>
      <PageTitle>Đăng kí tàu vào cảng</PageTitle>
      <div className="mainContent">
        {/* <MyCombobox /> */}
        <form className="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <h2>Đăng kí tàu vào cảng</h2>
          <div className="shipInformation">
            <div className="formField">
              <label htmlFor="shipRegistry" style={{ textDecoration: 'underline' }}>
                <strong>Tàu vào cảng:</strong>
              </label>
              <div className="buttonSelectShipContain">
                <Button type="default" onClick={showModalShip} className="buttonSelectShip">
                  Chọn Tàu
                </Button>
              </div>
              <Modal
                title="Chọn Tàu Vào Cảng"
                open={isModalShipOpen}
                onOk={handleOkShip}
                onCancel={handleCancelShip}
                footer={[]}
              >
                <Input.Search
                  placeholder="Tìm bẳng tên hoặc số điện thoại"
                  onChange={(e) => handleSearchShip(e.target.value)}
                  style={{ marginBottom: '8px' }}
                  allowClear
                />
                <div style={{ maxHeight: '51.5vh', overflowY: 'auto' }}>
                  {filteredShipData.map((item) => (
                    // eslint-disable-next-line react/jsx-key
                    <div
                      className="shipDataFilterDeparture"
                      onClick={() => {
                        // console.log(item.id);
                        setSelectedShip(item);
                        setIsModalShipOpen(false);
                        setSubmitRegistry(
                          (prevState: any) =>
                            ({
                              ...prevState,
                              shipId: item.id,
                              ownerName: item.ownerName,
                              grossTonnage: item.grossTonnage,
                              registerNumber: item.registerNumber,
                              shipName: item.shipName,
                            } as SubmitRegistry),
                        );
                      }}
                    >
                      <div className="shipImgDeparture">
                        {' '}
                        <img src={item.img} alt="Ship Image" style={{ objectFit: 'cover' }} />
                      </div>
                      <div>
                        <div className="otherInforDeparture">
                          <span className="ownerName"> {item.ownerName} </span>
                          <span className="shipNumDeparture"> {item.shipNum}</span>
                        </div>

                        <div className="ownerPhoneDeparture">{item.ownerPhone}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Modal>
            </div>
            <div className="formField">
              <label htmlFor="shipNumber">
                <strong>Số Hiệu:</strong>
              </label>
              <Input id="shipNumber" value={selectedShip?.shipNum} disabled />
            </div>
            <div className="formField">
              <label htmlFor="shipRegistry">
                <strong>Tên tàu:</strong>
              </label>
              <Input value={selectedShip?.shipName} disabled />
            </div>

            <div className="formField LengthPower">
              <div>
                <label htmlFor="shipLength">
                  <strong>Chiều dài:</strong>
                </label>
                <Input id="shipLength" value={selectedShip?.shipLength} disabled />
              </div>
              <div>
                <label htmlFor="shipPower">
                  <strong>Trọng tải :</strong>
                </label>
                <Input id="shipPower" value={selectedShip?.power} disabled />
              </div>
            </div>

            <div className="formField LengthPower">
              <div className="customAntPicker">
                <label htmlFor="shipRegistryNum">
                  <strong>Thời gian vào cảng</strong>
                </label>
                <Space direction="vertical" size={12}>
                  <DatePicker
                    showTime={{ format: 'HH:mm' }}
                    onChange={onChange}
                    onOk={onOk}
                    disabledDate={disabledDate}
                    //  disabledTime={disabledDateTime}
                  />
                </Space>
              </div>
            </div>
            <div className="formField">
              <label htmlFor="shipDateOfDeparture">
                <strong>Chọn cảng vào</strong>
              </label>
              <div className="customVHSelect">
                <Select
                  defaultValue={214983902}
                  style={{ width: 165 }}
                  onChange={(e) => {
                    // console.log(e);
                    setSubmitRegistry(
                      (prevState: any) =>
                        ({
                          ...prevState,
                          purpose: e,
                        } as SubmitRegistry),
                    );
                  }}
                  options={[
                    {
                      value: 214983902,
                      label: 'Thọ Quang',
                    },
                    {
                      value: 748717826,
                      label: 'Tiên Sa ',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="crewLabel">
            <div>
              {' '}
              <label htmlFor="crewList" style={{ textDecoration: 'underline' }}>
                <strong>Danh sách thành viên</strong>
              </label>
            </div>
            <div className="selectCrewPart">
              {' '}
              <div>
                <Button type="default" onClick={showModalCaptain} className="buttonSelectShip">
                  + Thuyền Trưởng
                </Button>
                <Modal
                  title="Chọn Thuyền Trưởng"
                  open={isModalCaptainOpen}
                  onOk={handleOkCaptain}
                  onCancel={handleCancelCaptain}
                  footer={[]}
                >
                  <Input.Search
                    placeholder="Tìm bẳng tên hoặc số điện thoại"
                    onChange={(e) => handleSearchCaptain(e.target.value)}
                    style={{ marginBottom: '16px' }}
                    allowClear
                  />
                  <div style={{ maxHeight: '51.5vh', overflowY: 'auto' }}>
                    {filteredCaptainData.map((item) => (
                      // eslint-disable-next-line react/jsx-key
                      <div
                        className="shipDataFilterDeparture"
                        onClick={() => {
                          // console.log(item.id);
                          setSelectedCaptain(item);
                          setIsModalCaptainOpen(false);
                          setSubmitRegistry(
                            (prevState: any) =>
                              ({
                                ...prevState,
                                captainId: item.id,
                                captainName: item.fullName,
                              } as SubmitRegistry),
                          );

                          // Update crewTable state
                          setCrewTable((prevCrewTable: any) => {
                            prevCrewTable = prevCrewTable || [];
                            const index: number = prevCrewTable.findIndex((item: any) => item.id === -1);

                            if (index !== -1) {
                              // If an item with id = -1 exists, remove it
                              crewTable?.splice(index, 1);
                            }

                            if (prevCrewTable === null) {
                              // If previous state is null, initialize as an empty array
                              return [
                                {
                                  id: -1,
                                  fullname: item.fullName,
                                  countries: item.country, // Add more fields if needed
                                  nationalId: item.cardId,
                                  yearExperience: 5,
                                  relativePhoneNumber: item.phoneNumber,
                                },
                              ];
                            } else {
                              // If previous state is an array, append the new item
                              return [
                                {
                                  id: -1,
                                  fullname: item.fullName,
                                  countries: item.country, // Add more fields if needed
                                  nationalId: item.cardId,
                                  yearExperience: 5,
                                  relativePhoneNumber: item.phoneNumber,
                                },
                                ...prevCrewTable,
                              ];
                            }
                          });
                        }}
                      >
                        <div className="shipImgDeparture">
                          {' '}
                          <img src={item.image} alt="Ship Image" />{' '}
                        </div>
                        <div>
                          <div className="otherInforDeparture">
                            <span className="ownerName"> {item.fullName} </span>
                            <span className="shipNumDeparture"> {item.phoneNumber}</span>
                          </div>

                          <div className="ownerPhoneDeparture">{item.email}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Modal>
              </div>
              <div>
                <Button type="default" onClick={showModalCrew} className="buttonSelectShip">
                  + Thuyền viên
                </Button>
                <Modal
                  title=" Chọn Thuyền Viên"
                  open={isModalCrewOpen}
                  onOk={handleOkCrew}
                  onCancel={handleCancelCrew}
                  footer={[]}
                >
                  <Input.Search
                    placeholder="Tìm bẳng tên hoặc số điện thoại"
                    onChange={(e) => handleSearchCrew(e.target.value)}
                    style={{ marginBottom: '16px' }}
                    allowClear
                  />
                  <div style={{ maxHeight: '51.5vh', overflowY: 'auto' }}>
                    {filteredCrewData.map((item) => (
                      // eslint-disable-next-line react/jsx-key
                      <div
                        className="CrewDataFilter"
                        onClick={() => {
                          // console.log(item.id);
                          setSelectedCrew(item);
                          setIsModalCrewOpen(false);
                          setCrewTable((pre: any) => {
                            if (pre === null) {
                              return [item]; // If previous state is null, return an array with the new item
                            } else {
                              return [...pre, item]; // If previous state is an array, append the new item
                            }
                          });
                          setSubmitRegistry(
                            (prevState: any) =>
                              ({
                                ...prevState,
                                crew: prevState && prevState.crew ? [...prevState.crew, item.id] : [item.id],
                              } as SubmitRegistry),
                          );
                          setCrewData((prev) => prev.filter((p) => p.id !== item.id));
                        }}
                      >
                        <div className="crewPhoneName">
                          <div>{item.fullname}</div>

                          <div className="crewPhone"> {item.relativePhoneNumber}</div>
                        </div>
                        <div>
                          <span className="crewYear">{`${item.yearExperience} years`}</span>
                        </div>
                        <div className="crewCountry">{item.countries}</div>
                      </div>
                    ))}
                  </div>
                </Modal>
              </div>
            </div>
          </div>
          {/* Consider using Input components for other parts of the form */}
          <CrewTable crewd={crewTable} onDelete={handleDelete} />
          <div className="AllButton">
            <button className="submitbutton" type="submit">
              Đăng Kí
            </button>
          </div>
        </form>
      </div>
    </>
  );
  {
  }
};
const handleButtonClick = () => {
  null;
};

const CrewTable: React.FC<CrewTableProp> = ({ crewd, onDelete }) => {
  const columns = [
    {
      title: 'Tên thành viên',
      dataIndex: 'fullname',
      key: 'fullname',
      render: (text: string, record: Crew, index: number) => (
        <>
          {text}
          {record.id === -1 ? <div style={{ color: '#0063be' }}>( Thuyền trưởng )</div> : null}
        </>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'relativePhoneNumber',
      key: 'relativePhoneNumber',
    },
    {
      title: 'CCCD',
      dataIndex: 'nationalId',
      key: 'nationalId',
    },
    {
      title: 'Năm Kinh Nghiệm',
      dataIndex: 'yearExperience',
      key: 'yearExperience',
      render: (text: string | number) => <span>{text} năm</span>,
    },
    {
      title: 'Quốc Tịch',
      dataIndex: 'countries',
      key: 'countries',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Crew) => (
        <Space size="middle">
          {record.id !== -1 ? <a onClick={() => onDelete(record.id)}>Delete</a> : <span></span>}
        </Space>
      ),
    },
    //... other columns
  ];

  return (
    <Table
      dataSource={crewd ?? []}
      columns={columns}
      rowKey={(record) => record.id}
      pagination={{
        pageSize: 3, // Set the maximum number of records per page to 3
        size: 'small', // Set the size of the pagination component to small
      }}
    />
  );
};

export default ArrivalRegisterPage;
