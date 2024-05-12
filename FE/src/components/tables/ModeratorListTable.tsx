import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Badge, Dropdown, Input, Space, Table, Tag, message } from 'antd';
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
import ExportButton from '@app/components/buttons/ExportData/ExportModeratorDataButton';
import ImportDataButton from '@app/components/buttons/ImportData/ImportDataButton';
import Title from 'antd/lib/typography/Title';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../badges/ActiveStatus/StatusBadge';
import MoreOptionMenu from '../buttons/MoreOptionMenu/MoreOption/MoreOptionMenu';
import DeleteConfirmModal from '../modal/DeleteConfirmModal';
import ItemTableText from './ItemTableText/ItemTableText';
import { Moderator, getModeratorTableData } from '@app/api/moderator.api';

const initialPagination: Pagination = {
  current: 1,
  pageSize: 8,
};

const ModeratorListTable: React.FC = () => {
  const navigate = useNavigate();
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: string) => {
    confirm();
  };
  const handleRegisterModerator = () => {
    navigate('/register-moderator');
  };

  const getSearch = (dataIndex: keyof Moderator, placeholder: string): TableColumnType<Moderator> => ({
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
  const [tableData, setTableData] = useState<{ data: Moderator[]; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: initialPagination,
    loading: true,
  });
  const fetchTableData = useCallback(async () => {
    try {
      const pagination = { current: initialPagination.current, pageSize: initialPagination.pageSize };
      const personTableData = await getModeratorTableData(pagination);
      setTableData({
        data: personTableData.data,
        pagination: personTableData.pagination,
        loading: false,
      });
    } catch (error) {
      message.error('Tải dữ liệu cảng vụ không thành công');
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

  const columns: TableColumnsType<Moderator> = [
    {
      title: 'TÀI KHOẢN',
      dataIndex: 'userName',
      key: 'userName',
      width: 210,
      render: (text, record) => (
        <a onClick={() => handleViewModeratorDetail(record)}>
          <ItemTableText text={text} />
        </a>
      ),
      ...getSearch('userName', 'Tìm tài khoản'),
    },
    {
      title: 'HỌ VÀ TÊN',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text) => <ItemTableText text={text} />,
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
        { text: 'Hoạt động', value: false },
        { text: 'Đã Khóa', value: true },
      ],
      onFilter: (value: string | number | boolean, record: Moderator) => record.isDisabled === value,
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
  const handleViewModeratorDetail = (record: Moderator) => {
    navigate(`/moderator-detail/${record.id}`);
  };
  //Delete Modal
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [selectedDeleteRecord, setSelectedDeleteRecord] = useState<Moderator | null>(null);
  const showDeleteModal = (record: Moderator) => {
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

  const menu = (record: Moderator) => (
    <MoreOptionMenu
      record={record}
      onViewDetail={handleViewModeratorDetail}
      onDeleteClick={() => showDeleteModal(record)}
    />
  );

  return (
    <>
      <Title style={titleStyle}>Quản Lý Cảng Vụ</Title>
      <Space style={spaceBetweenItemStyle}>
        <Space>
          <ExportButton />
          <ImportDataButton />
        </Space>
        <RegisterButton onClick={handleRegisterModerator} buttonText="Đăng ký cảng vụ" />
      </Space>
      <Table
        columns={columns}
        dataSource={tableData.data.filter((item) => item.role)}
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
          getTitle={(record: Moderator | null) => record?.fullName || ''}
        />
      )}
    </>
  );
};

export default ModeratorListTable;
