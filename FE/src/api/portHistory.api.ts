export interface PortHistoryTableRow {
  id: number;
  shipId: number;
  shipName: string;
  shipOwner: string;
  captainName: string;
  shipNumber: string;
  IMONumber: number;
  size: string;
  power: number;
  tonage: number;
  purpose: string;
  arrivalFromPort: string;
  arrivalToPort: string;
  arrivalDateTime: Date;
  departureDateTime: Date;
  crewMember: CrewMemberRow[];
  isDocked: boolean;
}

export interface CrewMemberRow {
  memberName: string;
  phoneNumber: string;
  CCCD: string;
  yearExperience: number;
  country: string;
}

export interface Pagination {
  current?: number;
  pageSize?: number;
}

export interface PortHistoryData {
  data: PortHistoryTableRow[];
  pagination: Pagination;
}

export const getPortHistoryData = (pagination: Pagination): Promise<any> => {
  return new Promise((res) => {
    setTimeout(() => {
      const data: any = [
        {
          id: 1,
          shipId: 1,
          shipName: 'Hoàng Sa 1',
          shipOwner: 'Trần Văn Nhân Trần Văn Nhân Trần Văn Nhân',
          captainName: '',
          shipNumber: 'QN.092681.TS',
          IMONumber: 9074729,
          size: '25m x 6m x 3m',
          power: 350,
          tonage: 350,
          purpose: 'Bắt cá',
          arrivalFromPort: 'Tiên Sa',
          arrivalToPort: 'Thọ Sơn',
          arrivalDateTime: new Date('2022-01-01'),
          departureDateTime: new Date('2024-01-22'),
          crewMember: [
            {
              memberName: 'Trần Văn Nhân',
              phoneNumber: '0123456789',
              CCCD: '12345679',
              yearExperience: 1,
              country: 'Việt Nam'
            },
            {
              memberName: 'Phiphack Toumtam',
              phoneNumber: '0987654321',
              CCCD: '987654321',
              yearExperience: 2,
              country: 'Lào'
            },
          ],
          isDocked: true,
        },
        {
          id: 2,
          shipId: 2,
          shipName: 'Hoàng Sa 2',
          shipOwner: 'Trần Văn Nhân',
          captainName: '',
          shipNumber: 'QN.092681.TS',
          IMONumber: 9074729,
          size: '25m x 6m x 3m',
          power: 350,
          tonage: 350,
          purpose: 'Bắt cá',
          arrivalFromPort: 'Thọ Sơn',
          arrivalToPort: 'Tiên Sa',
          arrivalDateTime: new Date('2022-01-01'),
          departureDateTime: new Date('2024-01-22'),
          crewMember: [
            {
              memberName: 'Trần Văn Nhân',
              phoneNumber: '0123456789',
              CCCD: '12345679',
              yearExperience: 3,
              country: 'Việt Nam'
            },
            {
              memberName: 'Phiphack Toumtam',
              phoneNumber: '0987654321',
              CCCD: '987654321',
              yearExperience: 4,
              country: 'Lào'
            },
          ],
          isDocked: true,
        },
        {
          id: 3,
          shipId: 3,
          shipName: 'Hoàng Sa 3',
          shipOwner: 'Trần Văn Nhân Trần Văn Nhân Trần Văn Nhân',
          captainName: '',
          shipNumber: 'QN.092681.TS',
          IMONumber: 9074729,
          size: '25m x 6m x 3m',
          power: 350,
          tonage: 350,
          purpose: 'Bắt cá',
          arrivalFromPort: 'Thọ Sơn',
          arrivalToPort: 'Tiên Sa',
          arrivalDateTime: new Date('2022-01-01'),
          departureDateTime: new Date('2024-01-22'),
          crewMember: [
            {
              memberName: 'Trần Văn Nhân',
              phoneNumber: '0123456789',
              CCCD: '12345679',
              yearExperience: 5,
              country: 'Việt Nam'
            },
            {
              memberName: 'Phiphack Toumtam',
              phoneNumber: '0987654321',
              CCCD: '987654321',
              yearExperience: 6,
              country: 'Lào'
            },
          ],
          isDocked: false,
        },
        {
          id: 4,
          shipId: 4,
          shipName: 'Trường Sa 4',
          shipOwner: 'Phiphack Toumtam',
          captainName: '',
          shipNumber: 'QN.127592.TS',
          IMONumber: 9074729,
          size: '25m x 6m x 3m',
          power: 250,
          tonage: 350,
          purpose: 'Chở cá',
          arrivalFromPort: 'Thọ Sơn',
          arrivalToPort: 'Tiên Sa',
          arrivalDateTime: new Date('2022-01-01'),
          departureDateTime: new Date('2024-01-22'),
          crewMember: [
            {
              memberName: 'Trần Văn Nhân',
              phoneNumber: '0123456789',
              CCCD: '12345679',
              yearExperience: 7,
              country: 'Việt Nam'
            },
            {
              memberName: 'Phiphack Toumtam',
              phoneNumber: '0987654321',
              CCCD: '987654321',
              yearExperience: 8,
              country: 'Lào'
            },
          ],
          isDocked: false,
        }, 
        {
          id: 5,
          shipId: 5,
          shipName: 'Trường Sa 5',
          shipOwner: 'Phiphack Toumtam',
          captainName: '',
          shipNumber: 'QN.127592.TS',
          IMONumber: 9074729,
          size: '25m x 6m x 3m',
          power: 250,
          tonage: 350,
          purpose: 'Chở cá',
          arrivalFromPort: 'Thọ Sơn',
          arrivalToPort: 'Tiên Sa',
          arrivalDateTime: new Date('2022-01-01'),
          departureDateTime: new Date('2024-01-22'),
          crewMember: [
            {
              memberName: 'Trần Văn Nhân',
              phoneNumber: '0123456789',
              CCCD: '12345679',
              yearExperience: 9,
              country: 'Việt Nam'
            },
            {
              memberName: 'Phiphack Toumtam',
              phoneNumber: '0987654321',
              CCCD: '987654321',
              yearExperience: 10,
              country: 'Lào'
            },
          ],
          isDocked: false,
        },
        {
          id: 6,
          shipId: 6,
          shipName: 'Trường Sa 6',
          shipOwner: 'Phiphack Toumtam',
          captainName: '',
          shipNumber: '123-456-789',
          IMONumber: 9074729,
          size: '25m x 6m x 3m',
          power: 250,
          tonage: 350,
          purpose: 'Chở cá',
          arrivalFromPort: 'Tiên Sa',
          arrivalToPort: 'Thọ Sơn',
          arrivalDateTime: new Date('2022-01-01'),
          departureDateTime: new Date('2024-01-22'),
          crewMember: [
            {
              memberName: 'Trần Văn Nhân',
              phoneNumber: '0123456789',
              CCCD: '12345679',
              yearExperience: 11,
              country: 'Việt Nam'
            },
            {
              memberName: 'Phiphack Toumtam',
              phoneNumber: '0987654321',
              CCCD: '987654321',
              yearExperience: 12,
              country: 'Lào'
            },
          ],  
          isDocked: true,
        },
      ];
      res({
        data: data.filter((item:any) => item !== undefined), 
        pagination: { ...pagination },
      });
    }, );
  });
};