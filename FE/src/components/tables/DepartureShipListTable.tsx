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
const initialPagination: Pagination = {
  current: 1,
  pageSize: 6,
};

const { Title } = Typography;

const DepartureShipListTable: React.FC = () => {
  const idToken = localStorage.getItem('idToken');
  const [arrival, setArrivalData] = useState<any[]>([]);
  const userRole = localStorage.getItem('role');

  const newArrivals = arrival
    .map((arrival) => {
      const condition =
        userRole === 'Military'
          ? arrival.approveStatus === 'ApprovedByPortAuthority'
          : userRole === 'PortAuthority'
          ? arrival.approveStatus === 'None'
          : false;

      return condition
        ? {
            arrivalId: arrival.departureId,
            arrivalTime: arrival.departureTime,
            guessTimeArrival: arrival.guessTimeArrival,
            grossTonnage: arrival.ship.grossTonnage,
            shipName: arrival.ship.name,
            shipType: arrival.ship.shipType,
            captainFullName: arrival.captain.fullName,
            registerNumber: arrival.ship.registerNumber,
          }
        : null;
    })
    .filter((arrival) => arrival !== null);

  // console.log(newArrivals);
  
  // console.log(newArrivals);
  const formatTimestamp = (timestamp:any) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because it's zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day}- ${hours}:${minutes}`;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllDeparture(idToken);
        const arrival = response.result;

        setArrivalData(arrival);

        // Do something with the crew data
      } catch (error) {
        console.error('Error fetching crew data:', error);
        // Handle the error
      }
    };

    fetchData(); // Call the function to fetch crew data when component mounts
  }, []); // Empty dependency array ensures the effect runs only once
  // console.log('Departure data:', arrival);
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
  console.log('tabledatane', tableData.data);
  const { isMounted } = useMounted();
  const fetch = useCallback(
    (pagination: Pagination) => {
      setTableData((tableData) => ({ ...tableData, loading: true }));
      getPortHistoryData(pagination).then((res) => {
        if (isMounted.current) {
          const filteredData = res.data.filter((item: any) => !item.isDocked);
          setTableData({ data: filteredData, pagination: res.pagination, loading: false });
        }
      });
    },
    [isMounted],
  );

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
      title: 'THUYỀN TRƯỞNG',
      dataIndex: 'captainFullName',
      key: 'captainName',
      render: (text) => <ItemTableText text={text} />,
      ...getSearch('captainName', 'Tìm họ và tên (Có dấu)'),
    },
    {
      title: 'THỜI GIAN RỜI CẢNG',
      dataIndex: 'arrivalTime',
      key: 'departureDateTime',
      align: 'center',
      render: (text) => <a>{text ? <ItemTableText text={formatTimestamp(text)} /> : null}</a>,
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
    navigate(`/approve-departure-ship-detail/${record.arrivalId}`);
  };

  const menu = (record: PortHistoryTableRow) => (
    <MoreOptionMenuWithoutDelete record={record} onViewDetail={handleViewShipDetail} />
  );
  return (
    <>
      <Title style={titleStyle}>{`Danh sách tàu rời cảng chờ ${
        userRole === 'PortAuthority' ? 'cảng vụ' : 'biên phòng'
      } duyệt`}</Title>
      <Space style={spaceBetweenItemStyle}>
        <Space>
          <ExportButton />
          <ImportDataButton />
        </Space>
      </Space>
      <Table
        columns={columns}
        dataSource={newArrivals}
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

export default DepartureShipListTable;
