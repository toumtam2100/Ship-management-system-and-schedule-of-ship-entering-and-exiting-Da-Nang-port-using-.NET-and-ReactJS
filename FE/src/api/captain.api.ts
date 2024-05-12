import axios from 'axios';
import { Priority } from '../constants/enums/priorities';
import { EnumType } from 'typescript';

export interface Tag {
  value: string;
  priority: Priority;
}
// export interface PersonTableRow {
export interface Captain {
  id: number;
  avatar: string;
  userName: string;
  fullName: string;
  dateOfBirth: Date;
  address: string;
  country: string;
  nationalId: string;
  gender: boolean;
  phoneNumber: string;
  email: string;
  yearExperience: number;
  role: EnumType;
  roleType: EnumType;
  updatedBy: number;
  updatedAt: Date;
  isDisabled: boolean;
}

export interface Pagination {
  current?: number;
  pageSize?: number;
  total?: number;
}

export interface CaptainTableData {
  data: Captain[];
  pagination: Pagination;
}

export const getCaptainTableData = async (pagination: Pagination): Promise<CaptainTableData> => {
  try {
    const idToken = localStorage.getItem('idToken');
    const response = await axios.get('https://cangcadanang.asia/backend/api/User/captain/all', {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      params: {
        page: pagination.current,
        pageSize: pagination.pageSize,
      },
    });

    const responseData = response.data;

    const data: Captain[] = responseData.result.map((item: any) => ({
      id: item.id,
      avatar: item.avatar,
      userName: item.username,
      fullName: item.fullName,
      dateOfBirth: item.dateOfBirth,
      address: item.address,
      country: item.country,
      nationalId: item.nationalId,
      gender: item.gender,
      phoneNumber: item.phoneNumber,
      email: item.email,
      yearExperience: item.yearExperience,
      role: item.role,
      roleType: item.roleType,
      updatedBy: item.updatedBy,
      updatedAt: item.updatedAt,
      isDisabled: item.isDisabled,
    }));

    const captainTableData: CaptainTableData = {
      data: data,
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: responseData.result.length,
      },
    };

    return captainTableData;

  } catch (error) {
    throw new Error('Failed to fetch ship data from the server.');
  }
};

