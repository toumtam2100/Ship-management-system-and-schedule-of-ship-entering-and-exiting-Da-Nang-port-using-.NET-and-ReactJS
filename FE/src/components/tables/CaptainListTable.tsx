import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dropdown, Input, Space, Table, Tag, message } from 'antd';
import { MoreOutlined, SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnType, TableColumnsType } from 'antd';
import { FilterDropdownProps } from 'antd/lib/table/interface';
import {
  searchInputStyle,
  moreActionStyle,
  spaceBetweenItemStyle,
  dateOfBirthStyle,
  titleStyle,
} from './ListTable.style';
import { format } from 'date-fns';
import { Pagination } from '@app/api/table.api';
import { useMounted } from '@app/hooks/useMounted';
import RegisterButton from '@app/components/buttons/RegisterButton/RegisterButton';
import ExportButton from '@app/components/buttons/ExportData/ExportCaptainDataButton';
import ImportDataButton from '@app/components/buttons/ImportData/ImportDataButton';
import Title from 'antd/lib/typography/Title';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../badges/ActiveStatus/StatusBadge';
import MoreOptionMenu from '../buttons/MoreOptionMenu/MoreOption/MoreOptionMenu';
import DeleteConfirmModal from '../modal/DeleteConfirmModal';
import ItemTableText from './ItemTableText/ItemTableText';
import { Captain, getCaptainTableData } from '@app/api/captain.api';

const initialPagination: Pagination = {
  current: 1,
  pageSize: 8,
};

const CaptainListTable: React.FC = () => {
  const navigate = useNavigate();
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: string) => {
    confirm();
  };
  const handleRegisterCaptain = () => {
    navigate('/register-captain');
  };

  const getSearch = (dataIndex: keyof Captain, placeholder: string): TableColumnType<Captain> => ({
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
  const [tableData, setTableData] = useState<{ data: Captain[]; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });
  const { isMounted } = useMounted();
  const fetchTableData = useCallback(async () => {
    try {
      const pagination = { current: initialPagination.current, pageSize: initialPagination.pageSize };
      const personTableData = await getCaptainTableData(pagination);
      setTableData({
        data: personTableData.data,
        pagination: personTableData.pagination,
        loading: false,
      });
    } catch (error) {
      message.error('Tải dữ liệu thuyền trưởng không thành công.');
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
  //   fetch(pagination);
  // };

  const formatText = (text: string) => {
    return text.replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatPhone = (text: string) => {
    return text.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
  };

  // Generate columns based on the role value
  const columns: TableColumnsType<Captain> = [
    {
      title: 'TÀI KHOẢN',
      dataIndex: 'userName',
      key: 'userName',
      width: 210,
      render: (text, record) => (
        <a onClick={() => handleViewCaptainDetail(record)}>
          <ItemTableText text={text} />
        </a>
      ),
      ...getSearch('userName', 'Tìm tài khoản'),
    },
    {
      title: 'HỌ VÀ TÊN',
      dataIndex: 'fullName',
      key: 'fullName',
      ...getSearch('fullName', 'Tìm họ và tên'),
    },
    {
      title: 'NGÀY THÁNG NĂM SINH',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      align: 'center',
      render: (dateOfBirth) => {
        const formattedDate = format(new Date(dateOfBirth), 'dd/MM/yyyy');
        return <Tag style={dateOfBirthStyle}>{formattedDate}</Tag>;
      },
    },
    {
      title: 'CĂN CƯỚC CÔNG DÂN',
      key: 'nationalId',
      dataIndex: 'nationalId',
      align: 'center',
      render: (text) => <ItemTableText text={text} />,
      ...getSearch('nationalId', 'Tìm CCCD'),
    },
    {
      title: 'SỐ ĐIỆN THOẠI',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      align: 'center',
      render: (text) => <ItemTableText text={text} />,
      ...getSearch('phoneNumber', 'Tìm số điện thoại'),
    },
    {
      title: 'TRẠNG THÁI',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      filters: [
        { text: 'Hoạt động', value: true },
        { text: 'Không hoạt động', value: false },
      ],
      onFilter: (value: string | number | boolean, record: Captain) => record.isDisabled === value,
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

  //Dropdown action
  const handleViewCaptainDetail = (record: Captain) => {
    navigate(`/captain-detail/${record.id}`);
  };

  //Delete Modal
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [selectedDeleteRecord, setSelectedDeleteRecord] = useState<Captain | null>(null);
  const showDeleteModal = (record: Captain) => {
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

  const menu = (record: Captain) => (
    <MoreOptionMenu
      record={record}
      onViewDetail={handleViewCaptainDetail}
      onDeleteClick={() => showDeleteModal(record)}
    />
  );

  return (
    <>
      <Title style={titleStyle}>Quản Lý Thuyền Trưởng</Title>
      <Space style={spaceBetweenItemStyle}>
        <Space>
          <ExportButton />
          <ImportDataButton />
        </Space>
        <RegisterButton onClick={handleRegisterCaptain} buttonText="Đăng ký thuyền trưởng" />
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
          getTitle={(record: Captain | null) => record?.fullName || ''}
        />
      )}
    </>
  );
};

export default CaptainListTable;
