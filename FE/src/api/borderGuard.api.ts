import axios from 'axios';
import { Priority } from '../constants/enums/priorities';
import { EnumType } from 'typescript';

export interface Tag {
  value: string;
  priority: Priority;
}
// export interface PersonTableRow {
export interface BorderGuard {
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
  roleType: number;
  updatedBy: number;
  updatedAt: Date;
  isDisabled: boolean;
}

export interface Pagination {
  current?: number;
  pageSize?: number;
  total?: number;
}

export interface BorderGuardTableData {
  data: BorderGuard[];
  pagination: Pagination;
}

export interface CreateBorderguardData {
  avatar: string;
  fullName: string;
  gender: string;
  address: string;
  username: string;
  phoneNumber: string;
  password: string;
  email: string;
}

export const getBorderGuardTableData = async (pagination: Pagination): Promise<BorderGuardTableData> => {
  try {
    const idToken = localStorage.getItem('idToken');
    const response = await axios.get('https://cangcadanang.asia/backend/api/Military/admin/get-all-users', {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      params: {
        page: pagination.current,
        pageSize: pagination.pageSize,
      },
    });

    const responseData = response.data;

    const data: BorderGuard[] = responseData.result.map((item: any) => ({
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

    const borderGuardTableData: BorderGuardTableData = {
      data: data,
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: responseData.result.length,
      },
    };

    return borderGuardTableData;
  } catch (error) {
    // Error handling here depends on whether it's an AxiosError or not.
    console.error('Failed to fetch border guard data:', error);
    throw new Error('Failed to fetch border guard data from the server.');
  }
};

export const createBorderguard = async (formData: CreateBorderguardData) => {
  console.log('San sang data gui ve backend:', formData);

  try {
    const idToken = localStorage.getItem('idToken');
    const response = await axios.post('https://cangcadanang.asia/backend/api/Military/admin/create-user', formData, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return response.data; // Assuming the API returns some data upon success
  } catch (error) {
    console.error('Error creating border guard:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};
