import axios from 'axios';
import { Priority } from '../constants/enums/priorities';
import { EnumType } from 'typescript';
//Import for image upload
import AWS from 'aws-sdk';
import { RcFile } from 'antd/es/upload/interface';

//Config AWS
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_S3_REGION,
});
const s3 = new AWS.S3();

export interface Tag {
  value: string;
  priority: Priority;
}
// export interface PersonTableRow {
export interface Moderator {
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

export interface ModeratorTableData {
  data: Moderator[];
  pagination: Pagination;
}

export interface CreateModeratorData {
  avatar: string;
  fullName: string;
  gender: string;
  address: string;
  username: string;
  phoneNumber: string;
  password: string;
  email: string;
}

export const getModeratorTableData = async (pagination: Pagination): Promise<ModeratorTableData> => {
  try {
    const idToken = localStorage.getItem('idToken');
    const response = await axios.get('https://cangcadanang.asia/backend/api/PortAuthority/admin/get-all-users', {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      params: {
        page: pagination.current,
        pageSize: pagination.pageSize,
      },
    });

    const responseData = response.data;

    const data: Moderator[] = responseData.result.map((item: any) => ({
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

    const moderatorTableData: ModeratorTableData = {
      data: data,
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: responseData.result.length,
      },
    };
    return moderatorTableData;
  } catch (error) {
    throw new Error('Failed to fetch ship data from the server.');
  }
};

export const createModerator = async (formData: CreateModeratorData) => {
  //console.log('San sang data gui ve backend:', formData);

  try {
    const idToken = localStorage.getItem('idToken');
    const response = await axios.post(
      'https://cangcadanang.asia/backend/api/PortAuthority/admin/create-user',
      formData,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      },
    );
    return response.data; // Assuming the API returns some data upon success
  } catch (error) {
    console.error('Error creating moderator:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};

//Function upload image to S3 of RegisterModerator Page
export const handleFinish = async (selectedFile: RcFile, values: any) => {
  console.log(values);
  
  const bucketName = 'dpm.bucket';
  const fileObj = selectedFile;

  if (!bucketName) {
    console.error('Bucket name is undefined');
    return;
  } else if (!fileObj) {
    console.error('File object is undefined');
    return;
  }
  // Ensure values.shipName is a string before calling normalizeVietnamese
  if (typeof values === 'string') {
    // Set new name for received image file.
    //const normalizedModeratorName = normalizeVietnamese(values);
    const newName = `${values.replace(/\s/g, '')}_avatar.${fileObj.type.split('/').pop()}`;
    const newBlob = new Blob([await fileObj.arrayBuffer()], { type: fileObj.type });
    const newFile = new File([newBlob], newName);

    const params = {
      Bucket: bucketName,
      Key: `Avatar/${newFile.name}`,
      Body: newFile,
    };

    try {
      const uploadResult = await s3.upload(params).promise();
      console.log('Upload successful', uploadResult);
      return uploadResult;
    } catch (error) {
      console.error('Error uploading to S3', error);
      throw error;
    }
  } else {
    console.error('Moderator name is not a string:', values.name);
  }
};

export const normalizeVietnamese = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

//This function is failed to debug if there's any errors from the form.
export const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
