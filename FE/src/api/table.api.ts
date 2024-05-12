import { Priority } from '../constants/enums/priorities';

export interface Tag {
  value: string;
  priority: Priority;
}

export interface BasicTableRow {
  key: number;
  boatNumber: string;
  owner: string;
  purpose: string;
  deadlineRegistration?: Tag[];
  power: string;
  status?: Tag[];
}

export interface Pagination {
  current?: number;
  pageSize?: number;
}

export interface BasicTableData {
  data: BasicTableRow[];
  pagination: Pagination;
}

export interface TreeTableRow extends BasicTableRow {
  children?: TreeTableRow[];
}

export interface TreeTableData extends BasicTableData {
  data: TreeTableRow[];
}

export interface EditableTableData extends BasicTableData {
  data: BasicTableRow[];
}

export const getBasicTableData = (pagination: Pagination): Promise<BasicTableData> => {
  return new Promise((res) => {
    setTimeout(() => {
      res({
        data: [
          {
            key: 1,
            boatNumber: '14DC-987654',
            owner: 'NhanTV1202',
            purpose: 'Chở cá',
            deadlineRegistration: [
              { value: '4 tháng', priority: Priority.LOW },
            ],
            power: '350CV',
            status: [
              { value: 'Hoạt động', priority: Priority.LOW },
            ]
          },
          {
            key: 2,
            boatNumber: '75C-987654',
            owner: 'NhanTV1202',
            purpose: 'Chở cá',
            deadlineRegistration: [
              { value: 'Hết hạn', priority: Priority.HIGH },
            ],
            power: '350CV',
            status: [
              { value: 'Hoạt động', priority: Priority.LOW },
            ]
          },
          {
            key: 3,
            boatNumber: '19FC-987654',
            owner: 'QuocTM123',
            purpose: 'Chở cá',
            deadlineRegistration: [
              { value: '3 ngày', priority: Priority.MEDIUM },
            ],
            power: '350CV',
            status: [
              { value: 'Không Hoạt động', priority: Priority.HIGH },
            ]
          }
        ],
        pagination: { ...pagination },
      });
    }, 1000);
  });
};

