import { Priority } from '../constants/enums/priorities';

export interface Tag {
  value: string;
  priority: Priority;
}

export interface CrewMemberTableRow {
  id: number;
  personId: string;
  userName: string;
  fullName: string;
  dateOfBirth: Date;
  birthPlace: string;
  country: string;
  cardId: string;
  sex: boolean;
  imageUrl: string;
  phoneNumber: string;
  email: string;
  yearExperience: number;
  historyId: string;
  updateInforTime: Date;
  changeBy: string;
  status: boolean;
}

export interface Pagination {
  current?: number;
  pageSize?: number;
}

export interface CrewMemberTableData {
  data: CrewMemberTableRow[];
  pagination: Pagination;
}

export const getCrewMemberTableData = (pagination: Pagination): Promise<CrewMemberTableData> => {
  return new Promise((res) => {
    setTimeout(() => {
      const data: CrewMemberTableRow[] = [
        {
          id: 1,
          personId: 'TSTT1201',
          userName: 'NhanTV1202',
          fullName: 'Trần Văn Nhân',
          dateOfBirth: new Date('2002-12-01'),
          birthPlace: 'Ha Noi',
          country: 'Việt Nam',
          cardId: '846215739024',
          sex: true,
          imageUrl: '',
          phoneNumber: '0941234567',
          email: 'nhan@altence.com',
          yearExperience: 1,
          historyId: '',
          updateInforTime: new Date('2022-01-01'),
          changeBy: '',
          status: true,
        },
        {
          id: 2,
          personId: 'TSTT1202',
          userName: 'NhanVT1203',
          fullName: 'Nguyen Van Nhan',
          dateOfBirth: new Date('1990-07-15'),
          birthPlace: 'Ho Chi Minh City',
          country: 'Việt Nam',
          cardId: '752198642301',
          sex: true,
          imageUrl: '',
          phoneNumber: '0912345678',
          email: 'nhanvt@example.com',
          yearExperience: 5,
          historyId: '',
          updateInforTime: new Date('2022-02-20'),
          changeBy: '',
          status: true,
        },
        {
          id: 3,
          personId: 'TSTT1203',
          userName: 'HoaNT1204',
          fullName: 'Nguyen Thanh Hoa',
          dateOfBirth: new Date('1985-11-20'),
          birthPlace: 'Hanoi',
          country: 'Việt Nam',
          cardId: '864209753102',
          sex: false,
          imageUrl: '',
          phoneNumber: '0987654321',
          email: 'hoa.nt@example.com',
          yearExperience: 8,
          historyId: '',
          updateInforTime: new Date('2022-03-10'),
          changeBy: '',
          status: true,
        },
        {
          id: 4,
          personId: 'TSTT1204',
          userName: 'TrungLD1205',
          fullName: 'Le Duc Trung',
          dateOfBirth: new Date('1992-05-25'),
          birthPlace: 'Da Nang',
          country: 'Việt Nam',
          cardId: '932847561024',
          sex: true,
          imageUrl: '',
          phoneNumber: '0978123456',
          email: 'trungld@example.com',
          yearExperience: 6,
          historyId: '',
          updateInforTime: new Date('2022-04-15'),
          changeBy: '',
          status: false,
        },
        {
          id: 5,
          personId: 'TSTT1205',
          userName: 'MaiTN1206',
          fullName: 'Tran Ngoc Mai',
          dateOfBirth: new Date('1997-02-18'),
          birthPlace: 'Hue',
          country: 'Việt Nam',
          cardId: '710293847560',
          sex: false,
          imageUrl: '',
          phoneNumber: '0965432187',
          email: 'mai.tn@example.com',
          yearExperience: 3,
          historyId: '',
          updateInforTime: new Date('2022-05-20'),
          changeBy: '',
          status: false,
        },
        {
          id: 6,
          personId: 'TSTT1206',
          userName: 'NamND1207',
          fullName: 'Nguyen Dinh Nam',
          dateOfBirth: new Date('1991-09-08'),
          birthPlace: 'Can Tho',
          country: 'Việt Nam',
          cardId: '548702139685',
          sex: true,
          imageUrl: '',
          phoneNumber: '0946231567',
          email: 'namnd@example.com',
          yearExperience: 4,
          historyId: '',
          updateInforTime: new Date('2022-06-10'),
          changeBy: '',
          status: true,
        },
        {
          id: 7,
          personId: 'TSTT1207',
          userName: 'HuyenPT1208',
          fullName: 'Pham Thi Huyen',
          dateOfBirth: new Date('1988-04-30'),
          birthPlace: 'Vinh',
          country: 'Việt Nam',
          cardId: '456789012345',
          sex: false,
          imageUrl: '',
          phoneNumber: '0987123456',
          email: 'huyen.pt@example.com',
          yearExperience: 7,
          historyId: '',
          updateInforTime: new Date('2022-07-05'),
          changeBy: '',
          status: true,
        },
        {
          id: 8,
          personId: 'TSTT1208',
          userName: 'DatNV1209',
          fullName: 'Nguyen Van Dat',
          dateOfBirth: new Date('1983-12-05'),
          birthPlace: 'Nha Trang',
          country: 'Việt Nam',
          cardId: '123098765432',
          sex: true,
          imageUrl: '',
          phoneNumber: '0978123456',
          email: 'dat.nv@example.com',
          yearExperience: 9,
          historyId: '',
          updateInforTime: new Date('2022-08-20'),
          changeBy: '',
          status: true,
        },
        {
          id: 9,
          personId: 'TSTT1209',
          userName: 'LanLT1210',
          fullName: 'Le Thi Lan',
          dateOfBirth: new Date('1990-06-12'),
          birthPlace: 'Dalat',
          country: 'Việt Nam',
          cardId: '987654321001',
          sex: false,
          imageUrl: '',
          phoneNumber: '0965432109',
          email: 'lan.lt@example.com',
          yearExperience: 6,
          historyId: '',
          updateInforTime: new Date('2022-09-15'),
          changeBy: '',
          status: true,
        },
        {
          id: 10,
          personId: 'TSTT1210',
          userName: 'QuocPT1211',
          fullName: 'Phan Thanh Quoc',
          dateOfBirth: new Date('1989-03-22'),
          birthPlace: 'Bien Hoa',
          country: 'Việt Nam',
          cardId: '112233445566',
          sex: true,
          imageUrl: '',
          phoneNumber: '0912345678',
          email: 'quoc.pt@example.com',
          yearExperience: 4,
          historyId: '',
          updateInforTime: new Date('2022-10-10'),
          changeBy: '',
          status: false,
        },
      ];

      res({
        data: data.filter((item) => item !== undefined), // Remove undefined values
        pagination: { ...pagination },
      });
    });
  });
};
