import { Table } from 'antd';

interface CrewMember {
  id: number;
  name: string;
  phone: string;
  identity: string;
  experience: number;
  nationality: string;
  // Add other properties as needed
}
interface CrewTableProps {
  crewData: CrewMember[];
}
export const columns = [
  {
    title: 'Tên thành viên',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'CCCD',
    dataIndex: 'identity',
    key: 'identity',
  },
  {
    title: 'Năm Kinh Nghiệm',
    dataIndex: 'experience',
    key: 'experience',
  },
  {
    title: 'Quốc Tịch',
    dataIndex: 'nationality',
    key: 'nationality',
  },
  //... other columns
];
export const CrewTable: React.FC<CrewTableProps> = ({ crewData }) => (
  <Table
    dataSource={crewData}
    columns={columns}
    rowKey={(record) => record.id}
    pagination={{
      pageSize: 3, // Set the maximum number of records per page to 3
      size: 'small', // Set the size of the pagination component to small
    }}
  />
);
