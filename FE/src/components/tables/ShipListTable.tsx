import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dropdown, Input, Space, Table, Typography, message } from 'antd';
import { MoreOutlined, SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnType, TableColumnsType } from 'antd';
import { FilterDropdownProps } from 'antd/lib/table/interface';
import { moreActionStyle, spaceBetweenItemStyle, titleStyle, searchInputStyle } from './ListTable.style';
import { Pagination } from '@app/api/table.api';
import { ShipTableRow, getShipTableData } from '@app/api/shipTable.api';
import ExportButton from '@app/components/buttons/ExportData/ExportShipDataButton';
import { useNavigate } from 'react-router-dom';
import RegisterButton from '@app/components/buttons/RegisterButton/RegisterButton';
import MoreOptionMenu from '@app/components/buttons/MoreOptionMenu/MoreOption/MoreOptionMenu';
import DeleteConfirmModal from '../modal/DeleteConfirmModal';
import StatusBadge from '../badges/ActiveStatus/StatusBadge';
import ItemTableText from './ItemTableText/ItemTableText';
import ImportDataButton from '../buttons/ImportData/ImportDataButton';

const initialPagination: Pagination = {
  current: 1,
  pageSize: 10,
};

const { Title } = Typography;

const ShipListTable: React.FC = () => {
  const navigate = useNavigate();

  const searchInput = useRef<InputRef>(null);

  const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: string) => {
    confirm();
  };
  const handleRegisterShip = () => {
    navigate('/register-new-ship');
  };

  const getSearch = (dataIndex: keyof ShipTableRow, placeholder: string): TableColumnType<ShipTableRow> => ({
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
  const [tableData, setTableData] = useState<{ data: ShipTableRow[]; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: initialPagination,
    loading: true,
  });

  const fetchTableData = useCallback(async () => {
    try {
      const pagination = { current: initialPagination.current, pageSize: initialPagination.pageSize };
      const shipData = await getShipTableData(pagination);
      setTableData({
        data: shipData.data,
        pagination: shipData.pagination,
        loading: false,
      });
    } catch (error) {
      message.error('Tải dữ liệu thuyền không thành công.');
      setTableData({
        data: [],
        pagination: initialPagination,
        loading: false,
      });
    }
  }, []);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  // const handleTableChange = (pagination: Pagination) => {
  //     fetch(pagination);
  // };

  const columns: TableColumnsType<ShipTableRow> = [
    {
      title: 'SỐ PHÂN CẤP',
      dataIndex: 'classNumber',
      key: 'classNumber',
      width: 170,
      render: (text, record) => (
        <a onClick={() => handleViewShipDetail(record)}>
          <ItemTableText text={text} />
        </a>
      ),
      ...getSearch('classNumber', 'Tìm theo số hiệu'),
    },
    {
      title: 'ĐĂNG KIỂM',
      dataIndex: 'registerNumber',
      key: 'registerNumber',
      width: 170,
      render: (text, record) => (
        <a onClick={() => handleViewShipDetail(record)}>
          <ItemTableText text={text} />
        </a>
      ),
      ...getSearch('registerNumber', 'Tìm theo số đăng kiểm'),
    },
    {
      title: 'TÊN TÀU',
      dataIndex: 'shipName',
      key: 'shipName',
      render: (text) => <ItemTableText text={text} />,
      ...getSearch('shipName', 'Tìm theo tên tàu'),
    },
    {
      title: 'CHỦ TÀU',
      dataIndex: 'shipOwner',
      key: 'shipOwner',
      render: (text) => <ItemTableText text={text} />,
      ...getSearch('shipOwner', 'Tìm theo họ và tên chủ tàu'),
    },
    {
      title: 'CHỨC NĂNG',
      dataIndex: 'shipType',
      key: 'shipType',
      align: 'center',
      filters: [
        { text: 'Đánh Bắt Thủy Sản', value: 'Fishing' },
        { text: 'Vận Chuyển Hàng Hóa', value: 'Carrying' },
        { text: 'Khác', value: 'Other' },
      ],
      onFilter: (value: string | number | boolean, record: ShipTableRow) => record.shipType.includes(value.toString()),
    },
    // {
    //     title: 'HẠN ĐĂNG KIỂM',
    //     key: 'deadlineRegistration',
    //     dataIndex: 'deadlineRegistration',
    //     align: 'center',
    //     filters: [
    //         { text: 'Còn hạn', value: 'green' },
    //         { text: 'Sắp hết hạn', value: 'yellow' },
    //         { text: 'Đã hết hạn', value: 'red' },
    //     ],
    //     onFilter: (value: string | number | boolean, record: ShipTableRow) => filterFunction(value, record),
    //     render: (_, { deadlineRegistration }) => (
    //         <RegistrationTag deadlineRegistration={deadlineRegistration} />
    //     ),
    // },
    {
      title: 'TRẠNG THÁI',
      key: 'isLocked',
      dataIndex: 'isLocked',
      align: 'center',
      filters: [
        { text: 'Hoạt động', value: false },
        { text: 'Đã khóa', value: true },
      ],
      onFilter: (value: string | number | boolean, record: ShipTableRow) => record.isDisabled === value,
      render: (text) => <StatusBadge text={text} />,
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

  //Action to view
  const handleViewShipDetail = (record: ShipTableRow) => {
    navigate(`/ship-detail/${record.id}`);
  };
  //Delete Modal
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [selectedDeleteRecord, setSelectedDeleteRecord] = useState<ShipTableRow | null>(null);
  const showDeleteModal = (record: ShipTableRow) => {
    setSelectedDeleteRecord(record);
    setDeleteModalVisible(true);
  };
  const handleDeleteModalCancel = () => {
    setDeleteModalVisible(false);
  };
  const handleDeleteModalConfirm = () => {
    //Add function later
    setDeleteModalVisible(false);
  };

  const menu = (record: ShipTableRow) => (
    <MoreOptionMenu record={record} onViewDetail={handleViewShipDetail} onDeleteClick={() => showDeleteModal(record)} />
  );
  return (
    <>
      <Title style={titleStyle}>Quản Lý Tàu</Title>
      <Space style={spaceBetweenItemStyle}>
        <Space>
          <ExportButton />
          <ImportDataButton />
        </Space>
        <RegisterButton onClick={handleRegisterShip} buttonText=" Đăng ký tàu" />
      </Space>
      <Table
        columns={columns}
        dataSource={tableData.data}
        pagination={{
          ...tableData.pagination,
          size: 'small',
        }}
        loading={tableData.loading}
        // onChange={handleTableChange}
        showSorterTooltip={false}
      />
      {selectedDeleteRecord && (
        <DeleteConfirmModal
          visible={deleteModalVisible}
          record={selectedDeleteRecord}
          onCancel={handleDeleteModalCancel}
          onConfirm={handleDeleteModalConfirm}
          getTitle={(record: ShipTableRow | null) => record?.classNumber || ''}
        />
      )}
    </>
  );
};

export default ShipListTable;
