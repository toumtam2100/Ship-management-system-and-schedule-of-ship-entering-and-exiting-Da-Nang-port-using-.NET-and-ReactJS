import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dropdown, Input, Space, Table, Typography } from 'antd';
import { MoreOutlined, SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnType, TableColumnsType } from 'antd';
import { FilterDropdownProps } from 'antd/lib/table/interface';
import { moreActionStyle, spaceBetweenItemStyle, titleStyle, searchInputStyle } from './ListTable.style';
import { Pagination } from '@app/api/table.api';
import { useMounted } from '@app/hooks/useMounted';
import ExportButton from '@app/components/buttons/ExportData/ExportShipDataButton';
import { useNavigate } from 'react-router-dom';
import ImportDataButton from '../buttons/ImportData/ImportDataButton';
import { PortHistoryTableRow, getPortHistoryData } from '@app/api/portHistory.api';
import MoreOptionMenuWithoutDelete from '../buttons/MoreOptionMenu/MoreOptionMenuWithoutDelete/MoreOptionMenuWithoutDelete';
import ItemTableText from './ItemTableText/ItemTableText';
import { getAllDeparture } from '@app/api/departure.api';
import { getAllArrival } from '@app/api/arrival.api';
const initialPagination: Pagination = {
  current: 1,
  pageSize: 6,
};

const { Title } = Typography;

const UncompleteTable: React.FC = () => {
  const idToken = localStorage.getItem('idToken');
  const [arrival, setArrivalData] = useState<any[]>([]);
  const [departure, setDepartureData] = useState<any[]>([]);
  const userRole = localStorage.getItem('role');
  const [combinedArrivalsAndDepartures, setCombinedArrivalsAndDepartures] = useState<any[]>([]);
  const userId = localStorage.getItem('userId'); 
  // console.log(userRole)
  // console.log(userId)
  // Function to combine arrays
  useEffect(() => {
    if (arrival.length > 0 || departure.length > 0) {
      // Combine arrivals and departures into one array
      // departure.map(a=>{console.log(a.ship.owner.id)})
      // departure.map(a=>{console.log(a.captainId)})
      const combinedArray = arrival
        .filter(arrival => arrival.isStart === false && arrival.approveStatus!=="Approved"&& (userRole === 'PortAuthority' || arrival?.ship?.ownerId === Number(userId) || arrival?.captain?.id === Number(userId)))
        .map(arrival => ({
          id: arrival.arrivalId,
          shipName: arrival.ship.name,
          actualTime: arrival.actualArrivalTime,
          shipType: arrival.ship.shipType,
          grossTonnage: arrival.ship.grossTonnage,
          approveStatus: arrival.approveStatus,
          status: 'Vào Cảng',
          registerNumber: arrival.ship.registerNumber,
        }))
        .concat(
          departure
            .filter(departure => departure.isStart === false &&  departure.approveStatus!=="Approved"&&(userRole === 'PortAuthority' || departure?.ship?.ownerId === Number(userId) || departure?.captainId === Number(userId)))
            .map(departure => ({
              id: departure.departureId,
              shipName: departure.ship.name,
              actualTime: departure.actualDepartureTime,
              shipType: departure.ship.shipType,
              grossTonnage: departure.ship.grossTonnage,
              approveStatus: departure.approveStatus,
              status: 'Rời Cảng',
              registerNumber: departure.ship.registerNumber,
            })),
        );

      // Update state with combined array
      setCombinedArrivalsAndDepartures(combinedArray);
      // console.log('cb',combinedArray);
    }
  }, [arrival, departure, userRole, userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllArrival(idToken);
        const arrival = response.result;

        setArrivalData(arrival);

        // Do something with the crew data
      } catch (error) {
        console.error('Error fetching arrival data:', error);
        // Handle the error
      }
    };

    fetchData(); // Call the function to fetch crew data when component mounts
  }, []); // Empty dependency array ensures the effect runs only once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllDeparture(idToken);
        const depart = response.result;

        setDepartureData(depart);

        // Do something with the crew data
      } catch (error) {
        console.error('Error fetching depart data:', error);
        // Handle the error
      }
    };

    fetchData(); 
  }, []); 
  // console.log('Departure data:', departure);
  // console.log('Arrival data:', arrival);

  const navigate = useNavigate();
  const searchInput = useRef<InputRef>(null);

  //Search Input Component
  const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: string) => {
    confirm();
  };

  const getSearch = (
    dataIndex: keyof PortHistoryTableRow,
    placeholder: string,
  ): TableColumnType<PortHistoryTableRow> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={searchInputStyle} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={placeholder}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          allowClear
        />
      </div>
    ),
    filterIcon: () => <SearchOutlined />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  //Data
  const [tableData, setTableData] = useState<{ data: PortHistoryTableRow[]; pagination: Pagination; loading: boolean }>(
    {
      data: [],
      pagination: initialPagination,
      loading: false,
    },
  );
  // console.log('tabledatane',tableData.data)
  const { isMounted } = useMounted();
  const fetch = useCallback(
    (pagination: Pagination) => {
      setTableData((combinedArrivalsAndDepartures) => ({ ...combinedArrivalsAndDepartures, loading: true }));
      getPortHistoryData(pagination).then((res) => {
        if (isMounted.current) {
          const filteredData = res.data.filter((item: any) => !item.isDocked);
          setTableData({ data: filteredData, pagination: res.pagination, loading: false });
        }
      });
    },
    [isMounted],
  );
  const formatTimestamp = (timestamp: any) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because it's zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day}- ${hours}:${minutes}`;
  };
  useEffect(() => {
    fetch(initialPagination);
  }, [fetch]);

  const handleTableChange = (pagination: Pagination) => {
    fetch(pagination);
  };

  const columns: TableColumnsType<any> = [
    {
      title: 'SỐ HIỆU',
      dataIndex: 'registerNumber',
      key: 'shipNumber',
      render: (text) => <a>{text ? <ItemTableText text={text} /> : null}</a>,
      ...getSearch('shipNumber', 'Tìm chủ tàu'),
    },
    {
      title: 'TÊN TÀU',
      dataIndex: 'shipName',
      key: 'shipName',
      render: (text) => <a>{text ? <ItemTableText text={text} /> : null}</a>,
      ...getSearch('shipName', 'Tìm tên tàu'),
    },

    {
      title: 'CHỨC NĂNG',
      dataIndex: 'shipType',
      key: 'purpose',
      align: 'center',
      filters: [
        { text: 'Chở cá', value: 'Chở cá' },
        { text: 'Bắt cá', value: 'Bắt cá' },
      ],
      onFilter: (value: string | number | boolean, record: PortHistoryTableRow) =>
        record.purpose.includes(value.toString()),
    },
    {
      title: 'TRỌNG TẢI',
      dataIndex: 'grossTonnage',
      key: 'power',
      align: 'center',
      sorter: (a, b) => a.power - b.power,
    },
    {
      title: 'THỜI GIAN',
      dataIndex: 'actualTime',
      key: 'departureDateTime',
      align: 'center',
      render: (text) => <a>{text ? <ItemTableText text={formatTimestamp(text)} /> : null}</a>,
    },
    {
      title: 'TRẠNG THÁI',
      // dataIndex: 'approveStatus',
      key: 'status',
      render: (text, record) => {
        switch (record.approveStatus) {
          case 'RejectedByPortAuthority':
            return 'Cảng vụ từ chối';
          case 'None':
            return 'Chờ cảng vụ duyệt';
          case 'ApprovedByPortAuthority':
            return 'Chờ biên phòng duyệt';
          case 'RejectedByMilitary':
            return 'Biên phòng từ chối';
          default:
            return '';
        }
      },
      filters: [
        { text: 'Cảng vụ từ chối', value: 'RejectedByPortAuthority' },
        { text: 'Chờ cảng vụ duyệt', value: 'None' },
        { text: 'Chờ biên phòng duyệt', value: 'ApprovedByPortAuthority' },
        { text: 'Biên phòng từ chối', value: 'RejectedByMilitary' },
      ],
      onFilter: (value, record) => record.approveStatus === value,
    },
    {
      title: 'RA/VÀO',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Vào Cảng', value: 'Vào Cảng' },
        { text: 'Rời Cảng', value: 'Rời Cảng' },
      ],
      onFilter: (value: any, record: any) => record.status.includes(value.toString()),
    },

    {
      title: '',
      key: '',
      width: 50,
      align: 'center',
      render: (record) => (
        <Dropdown overlay={() => menu(record)} trigger={['hover']}>
          <MoreOutlined style={moreActionStyle} />
        </Dropdown>
      ),
    },
  ];

  //Dropdown action
  const handleViewShipDetail = (record: any) => {
    const destination = record.status === 'Vào Cảng' ? 'arrival' : 'departure';
    navigate(`/approve-${destination}-ship-detail/${record.id}`);
  };

  const menu = (record: PortHistoryTableRow) => (
    <MoreOptionMenuWithoutDelete record={record} onViewDetail={handleViewShipDetail} />
  );
  return (
    <>
      <Title style={titleStyle}>{`Các đơn chưa/không được duyệt`}</Title>
      <Space style={spaceBetweenItemStyle}>
        <Space>
          <ExportButton />
          <ImportDataButton />
        </Space>
      </Space>
      <Table
        columns={columns}
        dataSource={combinedArrivalsAndDepartures}
        pagination={{
          ...tableData.pagination,
          size: 'small',
        }}
        loading={tableData.loading}
        onChange={handleTableChange}
        showSorterTooltip={false}
      />
    </>
  );
};

export default UncompleteTable;
