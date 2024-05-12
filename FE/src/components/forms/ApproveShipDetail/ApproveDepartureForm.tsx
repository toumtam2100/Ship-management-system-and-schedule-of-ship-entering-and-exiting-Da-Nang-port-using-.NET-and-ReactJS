import React, { useEffect, useState } from 'react';
import { Button, Col, Descriptions, Row, Space, Table, TableColumnsType, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import {Pagination} from '@app/api/portHistory.api';
import Title from 'antd/lib/typography/Title';
import ApproveAndCancelButton from '@app/components/buttons/ApproveAndCancel/ApproveAndCancelButton';
import { getSingleDeparture } from '@app/api/departureSingle.api';
import { handleDownloadPdf, openPdf } from './pdfHandler';

const formatTimestamp = (timestamp:any) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because it's zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day} - ${hours}:${minutes}`;
  };
const initialPagination: Pagination = {
  current: 1,
  pageSize: 8,
};
const approve = async (token: any, id: any, role: any) => {
  try {
    const baseUrl = 'https://cangcadanang.asia/backend/api/';
    const roleUrl = role === 'PortAuthority' ? 'PortAuthority/depart/approve' : 'Military/depart/approve';
    const url = baseUrl + roleUrl;
    // console.log(url);
    const response = await fetch(url, {
      method: 'POST', // Use PATCH method
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        departureId: id,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to approve');
    }
  } catch (error) {
    console.error('Error approve:', error);
    throw error;
  }
};
const finish = async (token: any, id: any) => {
  try {
    const url = 'https://cangcadanang.asia/backend/api/Registration/departure/update-ship-status';

    const response = await fetch(url, {
      method: 'POST', // Use PATCH method
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        departureId: id,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to approve');
    }
  } catch (error) {
    console.error('Error approve:', error);
    throw error;
  }
};
const reject = async (token: any, id: any, role: any) => {
  try {
    const baseUrl = 'https://cangcadanang.asia/backend/api/';
    const roleUrl = role === 'PortAuthority' ? 'PortAuthority/depart/reject' : 'Military/depart/reject';
    const url = baseUrl + roleUrl;
    // console.log(url);
    const response = await fetch(url, {
      method: 'POST', // Use PATCH method
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        departureId: id,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to approve');
    }
  } catch (error) {
    console.error('Error approve:', error);
    throw error;
  }
};
const ApproveDepartureForm: React.FC = () => {
  const role = localStorage.getItem('role');
  const [single, setSingle] = useState<any>({});
// console.log(single)
  const { id } = useParams<{ id: string }>();
  const idToken = localStorage.getItem('idToken');
  const [isApproveVisible, setIsApprovesVisible] = useState<boolean>(false);
  const [isPDF, setIsPDF] = useState<boolean>(false);
  const [attachmentKey, setAttachmentKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSingleDeparture(idToken, id);
        const arrival = response.result; // Assuming response.result is a single arrival object

        setSingle(arrival);
        setAttachmentKey(response.result.attachment);
        // console.log(single);
        // Do something with the arrival data
      } catch (error) {
        console.error('Error fetching single data:', error);
        // Handle the error
      }
    };

    fetchData(); // Call the function to fetch arrival data when component mounts
  }, [id, idToken]); // Empty depdency array ensures the effect runs only once
  useEffect(() => {
    // Check if approval status allows rendering Approves
    if ((single.approveStatus==='None'&&role === 'PortAuthority') || role === 'Military') {
      setIsApprovesVisible(single.approveStatus !== 'Approved');
    }
  }, [single.approveStatus, role]);
  useEffect(() => {
    // Check if approval status allows rendering Approves
    if (role === 'PortAuthority' || role === 'User') {
      setIsPDF(single.approveStatus === 'Approved' && single.isStart === false);
    }
  }, [single.approveStatus, role, single.isStart]);
  const navigate = useNavigate();

  const renderTableTitle = (): React.ReactNode => {
    return (
      <Title style={{ margin: 0 }} level={4}>
        Danh sách thuyền viên{' '}
      </Title>
    );
  };

    const columns: TableColumnsType<any> = [
        {
            title: 'TÊN THÀNH VIÊN',
            dataIndex: 'fullname',
            key: 'memberName',
            width: 210,
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'SỐ ĐIỆN THOẠI',
            dataIndex: 'relativePhoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'CĂN CƯỚC CÔNG DÂN',
            key: 'CCCD',
            dataIndex: 'nationalId',
        },
        {
            title: 'KINH NGHIỆM (năm)',
            dataIndex: 'yearExperience',
            key: 'yearExperience',
            align: 'center',
        },
        {
            title: 'QUỐC TỊCH',
            dataIndex: 'countries',
            key: 'country',
            align: 'center',
        },
    ];
    const handleApprove = () => {
        // console.log('ssss' + single.departureId);
    
        // Logic for approval
        approve(idToken, single.departureId,role)
            .then(() => {
                navigate('/approve-departure-ship-management');
                message.success('Đơn được duyệt thành công !');
            })
            .catch(error => {
                console.error('Error approving:', error);
                // Handle error here
            });
    };
    
    const handleFinish = () => {
      // console.log('ssss' + single.departureId);
  
      // Logic for approval
      finish(idToken, single.departureId)
          .then(() => {
              navigate('/nextjourney');
              message.success('Cập nhật thành công !');
          })
          .catch(error => {
              console.error('Error approving:', error);
              // Handle error here
          });
  };
  
    const handleDeny = () => {
        reject(idToken, single.departureId,role)
            .then(() => {
                navigate('/approve-departure-ship-management');
                message.success('Đã từ chối đơn !');
            })
            .catch(error => {
                console.error('error', error);
                // Handle error here
            });
    };
    return (
        <>
          {   Object.keys(single).length > 0&&( <>
            { single.approveStatus === 'Approved' && single.isStart=== true?<Title>Lịch sử rời cảng của tàu</Title>:single.approveStatus === 'Approved' && single.isStart=== false? <Title>Chi tiết đơn rời cảng </Title>: role !=='User'?(
            <Title>Duyệt tàu xin rời cảng</Title>
          ): <Title>Chi tiết đơn</Title>}
          <Row style={{marginLeft:'1rem'}}>
                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 8 }}>
                    <Descriptions labelStyle={{ fontWeight: 'bold' }} column={1}>
                        <Descriptions.Item label="Số hiệu tàu">{single?.ship?.registerNumber}</Descriptions.Item>
                        <Descriptions.Item label="Tên tàu">{single?.ship?.name}</Descriptions.Item>
                      
                        <Descriptions.Item label="Loại tàu">{single?.ship?.shipType}</Descriptions.Item>
                        <Descriptions.Item label="Trọng tải">{single?.ship?.grossTonnage}</Descriptions.Item>
                        <Descriptions.Item label="Cảng rời">{single?.port?.name}</Descriptions.Item>
                        {/* <Descriptions.Item label="Công suất">{shipDetails.power}</Descriptions.Item> */}
                    </Descriptions>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 8 }}>
                    <Descriptions labelStyle={{ fontWeight: 'bold' }} column={1}>
                        <Descriptions.Item label="Thuyền trưởng">{single?.captain?.fullName}</Descriptions.Item>
                        <Descriptions.Item label="CCCD">{single?.captain?.nationalId}</Descriptions.Item>
                        <Descriptions.Item label="SĐT">{single?.captain?.phoneNumber}</Descriptions.Item>
                        <Descriptions.Item label="Thời gian rời cảng">{formatTimestamp(single?.departureTime)}</Descriptions.Item>
                        <Descriptions.Item label="Thời gian vào cảng dự kiến">{formatTimestamp(single?.guessTimeArrival)}</Descriptions.Item>
                     
                        {/* <Descriptions.Item label="Email">123@gmail.com</Descriptions.Item> */}
                    </Descriptions>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 8 }}>
                    {/* {shipDetails.isDocked ? (
        <Descriptions labelStyle={{ fontWeight: 'bold' }} column={1}>
            <Descriptions.Item label="Mục đích">Đánh cá</Descriptions.Item>
            <Descriptions.Item label="Thời gian ra cảng">01/02/2024</Descriptions.Item>
            <Descriptions.Item label="Thời gian dự kiến vào cảng">01/03/2024</Descriptions.Item>
        </Descriptions>
    ) : (
        <Descriptions labelStyle={{ fontWeight: 'bold' }} column={1}>
            <Descriptions.Item label="Mục đích">Đánh cá</Descriptions.Item>
            <Descriptions.Item label="Thời gian vào cảng">01/02/2024</Descriptions.Item>
        </Descriptions>
    )} */}
            </Col>
          </Row>
          <Row style={{ marginLeft: -6 }}>
            <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
              <Table
                title={renderTableTitle}
                columns={columns}
                dataSource={single?.crews}
                pagination={{
                  // ...hideOnSinglePage.crews.pagination,
                  size: 'small',
                }}
                // loading={tableData.loading}
                showSorterTooltip={false}
              />
            </Col>
          </Row>
          <Row gutter={[32, 8]} style={{ margin: 0, paddingBottom: 10 }}>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
              {/* <ReviewInput /> */}
            </Col>
            <Space>
              <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
                {isApproveVisible ? <ApproveAndCancelButton onApprove={handleApprove} onDeny={handleDeny} /> : null}
                {isPDF ? (
                  <>
                    <div style={{ marginTop:'1rem',marginLeft:'20rem',display: 'flex', gap: '1rem' }}>
                      {' '}
                      <Button
                        onClick={() => {
                          openPdf(attachmentKey);
                        }}
                      >
                        Xem trước PDF
                      </Button>
                      <Button
                        onClick={() => {
                          handleDownloadPdf(attachmentKey);
                        }}
                      >
                        Tải về PDF
                      </Button>
                      <Button
                        onClick={() => {
                          handleFinish();
                        }}
                      >Đã ra khơi</Button>
                    </div>
                  </>
                ) : null}
              </Col>
            </Space>
          </Row>
        </>
      )}
    </>
  );
};

// const DepartureButton = () => {
//   return <Button>Đã Ra Khơi</Button>;
// };

export default ApproveDepartureForm;
