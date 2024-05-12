import axios from 'axios';
import { Priority } from '../constants/enums/priorities';
import { EnumType } from 'typescript';

export interface Tag {
  value: string;
  priority: Priority;
}

export interface PersonTableRow {
  id: number;
  avatar: string;
  userName: string;
  fullName: string;
  dateOfBirth: Date;
  address: string;
  country: string;
  cardId: string;
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

export interface PersonTableData {
  data: PersonTableRow[];
  pagination: Pagination;
}

export const getPersonTableData = async (pagination: Pagination): Promise<PersonTableData> => {
  try {
    const response = await axios.get('https://cangcadanang.asia/backend/api/User/all', {
      headers: {
        Authorization: 'Bearer eyJraWQiOiJwVzRGQkdOUDlSSFgycDNPS2tQVjBhVGJzaVI1RzJYTTFVWm9IOUp5QnQ4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjNmE3NDNiYS0yYzQ0LTRiMjgtOWM0NS00MWNjZDQ3ZTY3OGQiLCJyb2xlIjoiTWlsaXRhcnkiLCJyb2xlX3R5cGUiOiJVc2VyIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX2tuNUxVTHoyaCIsImNvZ25pdG86dXNlcm5hbWUiOiJuaGFudHYwMzAyIiwib3JpZ2luX2p0aSI6ImUzMmM1YzEyLTQxNjQtNDFjZi1hZjBhLWM3MjY0N2Y2NWIxNCIsImF1ZCI6IjQ0dTVlZXA1bWFhczBnZG5ndmN0MHI0b2dvIiwiZXZlbnRfaWQiOiI4NzUzNmRkNS05YTA0LTQ1OWItODgzMi04Y2M4NjAyNzc2ZjMiLCJ1c2VyX2lkIjoiMzQwNDU4MzU3MyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzEzMjQzNTI2LCJleHAiOjE3MTMyNDcxMjYsImlhdCI6MTcxMzI0MzUyNiwianRpIjoiMDJlOWRhOTYtMTcwOC00ZjljLTk3MGQtZDIzNTIyZWY1ODYwIiwiZW1haWwiOiJuaGFudHYwMzAyQGdtYWlsLmNvbSJ9.MbLD4inAMcmXgT7-hDozGkg6lIHkPqWXI_4aEwGSBZUpunjhOZOX0MhMc2Z0J2MrBrOVngpFXfu8Zrx10hzZQDnRICqtZskxr0prxZ3ObWegQcCvvhtCHUHRkk1WJwvh8VCt8tyUn6TJrVoNVYjz_4FVRpb3QaMcAMCuKcjem3WOXQotRDa3bZR0OH44wK4HuyELSwQx5qCl27PqJU4LG10DJ1m9huxMfo4_Ps7OlLN6rfcBKf_n7aqrXBSV9E7WJyUKmNyDR72iJCZgVpe7JOZisy1GPOOwQOcMbLjQsRWIPGLAILd5O6JoQVcWSMXF8jnpBaW994lPmfXRACPS-A',
      },
      params: {
        page: pagination.current,
        pageSize: pagination.pageSize,
      },
    });

    const responseData = response.data;

    const data: PersonTableRow[] = responseData.result.map((item: any) => ({
      id: item.id,
      avatar: item.avatar,
      userName: item.userName,
      fullName: item.fullName,
      dateOfBirth: item.createdAt,
      address: item.address,
      country: item.country,
      cardId: item.cardId,
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

    const personTableData: PersonTableData = {
      data: data,
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: responseData.result.length,
      },
    };

    console.log('Person Table Data: ', personTableData); // Log the fetched data

    return personTableData;

  } catch (error) {
    throw new Error('Failed to fetch ship data from the server.');
  }
};

