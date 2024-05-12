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
import { CrewMemberTableRow, getCrewMemberTableData } from '@app/api/crewMemberTable.api';
import { useMounted } from '@app/hooks/useMounted';
import RegisterButton from '@app/components/buttons/RegisterButton/RegisterButton';
import ExportButton from '@app/components/buttons/ExportData/ExportCrewMemberDataButton';
import ImportDataButton from '@app/components/buttons/ImportData/ImportCrewMemberButton';
import Title from 'antd/lib/typography/Title';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../badges/ActiveStatus/StatusBadge';
import MoreOptionMenu from '../buttons/MoreOptionMenu/MoreOption/MoreOptionMenu';
import DeleteConfirmModal from '../modal/DeleteConfirmModal';
import ItemTableText from './ItemTableText/ItemTableText';

const initialPagination: Pagination = {
  current: 1,
  pageSize: 8,
};

const CrewMemberListTable: React.FC = () => {
  const navigate = useNavigate();
  //function search owner
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: string) => {
    confirm();
  };
  const handleRegisterCrewMember = () => {
    navigate('/register-crew-member');
  };

  const getSearch = (
    dataIndex: keyof CrewMemberTableRow,
    placeholder: string,
  ): TableColumnType<CrewMemberTableRow> => ({
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
  const [tableData, setTableData] = useState<{ data: CrewMemberTableRow[]; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });
  const { isMounted } = useMounted();
  const fetch = useCallback(
    (pagination: Pagination) => {
      setTableData((tableData) => ({ ...tableData, loading: true }));
      getCrewMemberTableData(pagination).then((res) => {
        if (isMounted.current) {
          setTableData({ data: res.data, pagination: res.pagination, loading: false });
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

  const formatText = (text: string) => {
    return text.replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatPhone = (text: string) => {
    return text.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
  };

  const columns: TableColumnsType<CrewMemberTableRow> = [
    {
      title: 'HỌ VÀ TÊN',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text, record) => (
        <a onClick={() => handleViewCrewMemberDetail(record)}>
          <ItemTableText text={text} />
        </a>
      ),
      ...getSearch('fullName', 'Tìm họ và tên'),
    },
    {
      title: 'NGÀY THÁNG NĂM SINH',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      align: 'center',
      render: (dateOfBirth: Date) => {
        const content = format(dateOfBirth, 'dd/MM/yyyy');
        return <Tag style={dateOfBirthStyle}>{content}</Tag>;
      },
    },
    {
      title: 'CĂN CƯỚC CÔNG DÂN',
      key: 'cardId',
      dataIndex: 'cardId',
      align: 'center',
      render: (text) => <ItemTableText text={formatText(text)} />,
      ...getSearch('cardId', 'Tìm CCCD'),
    },
    {
      title: 'Quốc tịch',
      dataIndex: 'country',
      key: 'country',
      align: 'center',
      render: (text) => <ItemTableText text={text} />,
    },
    {
      title: 'SỐ ĐIỆN THOẠI',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      align: 'center',
      render: (text) => <ItemTableText text={formatPhone(text)} />,
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
      onFilter: (value: string | number | boolean, record: CrewMemberTableRow) => record.status === value,
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
  const handleViewCrewMemberDetail = (record: CrewMemberTableRow) => {
    navigate(`/crew-member-detail/${record.id}`);
  };

  //Delete Modal
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [selectedDeleteRecord, setSelectedDeleteRecord] = useState<CrewMemberTableRow | null>(null);
  const showDeleteModal = (record: CrewMemberTableRow) => {
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

  const menu = (record: CrewMemberTableRow) => (
    <MoreOptionMenu
      record={record}
      onViewDetail={handleViewCrewMemberDetail}
      onDeleteClick={() => showDeleteModal(record)}
    />
  );

  return (
    <>
      <Title style={titleStyle}>Quản Lý Thuyền Viên</Title>
      <Space style={spaceBetweenItemStyle}>
        <Space>
          <ExportButton />
          <ImportDataButton />
        </Space>
        <RegisterButton onClick={handleRegisterCrewMember} buttonText="Đăng ký thuyền viên" />
      </Space>
      <Table
        columns={columns}
        dataSource={tableData.data}
        pagination={{
          ...tableData.pagination,
          size: 'small',
        }}
        loading={tableData.loading}
        onChange={handleTableChange}
        showSorterTooltip={false}
      />
      {selectedDeleteRecord && (
        <DeleteConfirmModal
          visible={deleteModalVisible}
          record={selectedDeleteRecord}
          onCancel={handleDeleteModalCancel}
          onConfirm={handleDeleteModalConfirm}
          getTitle={(record: CrewMemberTableRow | null) => record?.fullName || ''}
        />
      )}
    </>
  );
};

export default CrewMemberListTable;
