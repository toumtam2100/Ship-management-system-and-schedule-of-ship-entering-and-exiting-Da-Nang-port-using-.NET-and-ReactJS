import React, { useCallback, useEffect, useState } from 'react';
import { Table, Input, message } from 'antd';
import { Pagination, ShipOwner, getShipOwnerTableData } from '@app/api/shipOwner.api';

interface ShipOwnerMiniTableProps {
  onSelect: (shipOwner: ShipOwner) => void;
  selectedOwners: ShipOwner[];
}

const initialPagination: Pagination = {
  current: 1,
  pageSize: 8,
};

const ShipOwnerMiniTable: React.FC<ShipOwnerMiniTableProps> = ({ onSelect, selectedOwners }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [tableData, setTableData] = useState<{ data: ShipOwner[]; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: initialPagination,
    loading: true,
  });

  const fetchTableData = useCallback(async () => {
    try {
      const pagination = { ...initialPagination }; // Use spread operator to clone initialPagination
      const personTableData = await getShipOwnerTableData(pagination);
      setTableData({
        data: personTableData.data,
        pagination: personTableData.pagination,
        loading: false,
      });
    } catch (error) {
      message.error('Tải dữ liệu chủ thuyền không thành công.');
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

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const filteredData = tableData.data.filter(
    (item) =>
      (item.fullName && item.fullName.toLowerCase().includes(searchText.toLowerCase())) ||
      (item.phoneNumber && item.phoneNumber.includes(searchText))
  );

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
  ];

  return (
    <>
      <Input.Search
        placeholder="Tìm bảng tên hoặc số điện thoại"
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: '16px' }}
        allowClear
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        size="small"
        onRow={(record) => ({
          onClick: () => onSelect(record), 
        })}
      />
    </>
  );
};

export default ShipOwnerMiniTable;