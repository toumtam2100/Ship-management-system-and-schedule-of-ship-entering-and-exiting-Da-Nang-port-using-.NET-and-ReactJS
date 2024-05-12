import axios from 'axios';
import { Priority } from '../constants/enums/priorities';
import { EnumType } from 'typescript';

export interface Tag {
  value: string;
  priority: Priority;
}
// export interface PersonTableRow {

export interface ShipOwner {
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

export interface ShipOwnerTableData {
  data: ShipOwner[];
  pagination: Pagination;
}

export const getShipOwnerTableData = async (pagination: Pagination): Promise<ShipOwnerTableData> => {
  try {
    const idToken = localStorage.getItem('idToken');
    const response = await axios.get('https://cangcadanang.asia/backend/api/User/ship-owner/all', {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      params: {
        page: pagination.current,
        pageSize: pagination.pageSize,
      },
    });

    const responseData = response.data;

    const data: ShipOwner[] = responseData.result.map((item: any) => ({
      id: item.id,
      avatar: item.avatar,
      userName: item.username,
      fullName: item.fullName,
      dateOfBirth: item.createdAt,
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

    const shipOwnerTableData: ShipOwnerTableData = {
      data: data,
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: responseData.result.length,
      },
    };

    return shipOwnerTableData;

  } catch (error) {
    throw new Error('Failed to fetch ship data from the server.');
  }
};