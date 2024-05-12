import { Table, Space, Button } from 'antd';
import { Link } from 'react-router-dom';

import { ArrivalAndDepartureData } from './arrDep.api';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
console.log('data' + ArrivalAndDepartureData);

// Type definition for the crew member
export const ExportToExcelButton = () => {
  const exportToExcel = () => {
    const data = ArrDepData.map((item) => ({
      'Số Hiệu': item.number,
      'Chủ Tàu': item.ownerName,
      'Ngày ra khơi': item.dateOfDeparture,
      'Ngày dự kiến về': item.dateOfGuess,
      'Ngày cập cảng': item.dateOfArrival,
      'Trạng Thái': item.status,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'arrival_departure_data.xlsx');
  };
  // const exportToPDF = () => {
  //   const data = ArrDepData.map((item) => [
  //     item.number,
  //     item.ownerName,
  //     item.dateOfDeparture,
  //     item.dateOfGuess,
  //     item.dateOfArrival,
  //     item.status,
  //   ]);

  //   const columns = [
  //     { title: 'Số Hiệu', dataKey: 0 },
  //     { title: 'Chủ Tàu', dataKey: 1 },
  //     { title: 'Ngày ra khơi', dataKey: 2 },
  //     { title: 'Ngày dự kiến về', dataKey: 3 },
  //     { title: 'Ngày cập cảng', dataKey: 4 },
  //     { title: 'Trạng Thái', dataKey: 5 },
  //   ];

  //   const doc = new jsPDF();
  //   doc.autoTable({
  //     head: [columns.map((col) => col.title)],
  //     body: data,
  //   });
  //   doc.save('arrival_departure_data.pdf');
  // };

  return (
    <>
      <Button type="primary" onClick={exportToExcel}>
        Export to Excel
      </Button>
      {/* <Button type="primary" onClick={exportToPDF} style={{ marginLeft: '10px' }}>
        Export to PDF
      </Button> */}
    </>
  );
};
export type CrewMember = {
  id: number;
  name: string;
  phone: string;
  identity: string;
  experience: string;
  nationality: string;
};

// Type definition for ArrivalAndDepartureItem including crewData
export type ArrivalAndDepartureItem = {
  id: number;
  name: string;
  number: string;
  registryNum: string;
  nationality: string;
  lengthShip: string;
  power: string;
  ownerName: string;
  ownerAddress: string;
  dateOfDeparture: string;
  dateOfArrival: string;
  dateOfGuess: string;
  status: string;
  crewData: CrewMember[];
};

const ArrDepData: ArrivalAndDepartureItem[] = ArrivalAndDepartureData;

export const columns = [
  {
    title: 'Số Hiệu',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'Chủ Tàu',
    dataIndex: 'ownerName',
    key: 'ownerName',
    render: (text: string, record: ArrivalAndDepartureItem) => (
      <Link to={`/arrival-departure/detail/${record.id}`}>{text}</Link>
    ),
  },
  {
    title: 'Ngày ra khơi',
    dataIndex: 'dateOfDeparture',
    key: 'dateOfDeparture',
  },
  {
    title: 'Ngày dự kiến về',
    dataIndex: 'dateOfGuess',
    key: 'dateOfGuess',
  },
  {
    title: 'Ngày cập cảng',
    dataIndex: 'dateOfArrival',
    key: 'dateOfArrival',
  },
  {
    title: 'Trạng Thái',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Thao Tác',
    key: 'action',
    render: (text: string, record: ArrivalAndDepartureItem) => (
      <Space size="middle">
        <Link to={`/arrival-departure/detail/${record.id}`}>Chi Tiết</Link>
      </Space>
    ),
  },
];

export const ArrDepTable = () => (
  <Table
    dataSource={ArrDepData}
    columns={columns}
    rowKey={(record: ArrivalAndDepartureItem) => String(record.id)} // Convert id to string
    pagination={{
      pageSize: 3,
      size: 'small',
    }}
  />
);
const ArrDepList = () => {
  return (
    <div className="ArrDepList">
      <h2>Lịch sử ra/vào cảng</h2>
      <ExportToExcelButton />
      <ArrDepTable />
    </div>
  );
};

export default ArrDepList;
