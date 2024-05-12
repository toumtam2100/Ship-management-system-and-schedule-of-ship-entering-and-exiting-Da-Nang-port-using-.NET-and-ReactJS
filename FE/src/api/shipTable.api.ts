import axios from 'axios';
import { Priority } from '../constants/enums/priorities';
import AWS from 'aws-sdk';

export interface Tag {
  value: string;
  priority: Priority;
}

export interface ShipTableRow {
  id: number;
  shipOwner: string;
  shipName: string;
  classNumber: string;
  IMONumber: string;
  registerNumber: string;
  shipType: string;
  tonnageGross: string;
  imagePath: string;
  isDisabled: boolean;
}

export interface Pagination {
  current?: number;
  pageSize?: number;
  total?: number;
}

export interface ShipTableData {
  data: ShipTableRow[];
  pagination: Pagination;
}

AWS.config.update({
  region: process.env.REACT_APP_S3_REGION, 
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID as string, 
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY as string
});

const s3 = new AWS.S3();

export const getImageFromS3 = async (imageKey: string): Promise<string> => {
  try {
    const bucketName = process.env.REACT_APP_S3_BUCKET;

    if (!bucketName) {
      throw new Error('Bucket name is not defined in environment variables.');
    }
    const params: AWS.S3.GetObjectRequest = {
      Bucket: bucketName,
      Key: imageKey
    };
    const data = await s3.getObject(params).promise();
    
    const blob = new Blob([data.Body as BlobPart], { type: data.ContentType });
    const imagePath = URL.createObjectURL(blob);
    
    return imagePath;
    
  } catch (error: any) {
  if (error && error.code) {
    console.error('AWS Error:', error.code, error.message);
  } else if (error instanceof Error) {
    console.error('Error fetching image from S3:', error.message);
  } else {
    console.error('An unexpected error occurred', error);
  }
    throw new Error('Unable to retrieve image from S3');
  }
};

export const getShipTableData = async (pagination: Pagination): Promise<ShipTableData> => {
  try {
    const idToken = localStorage.getItem('idToken');
    const response = await axios.get('https://cangcadanang.asia/backend/api/Ship/all', {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      params: {
        page: pagination.current,
        pageSize: pagination.pageSize,
      },
    });

    const responseData = response.data;
    
    const data: ShipTableRow[] = responseData.result.map((item: any) => ({
      id: item.id,
      shipOwner: item.owner.fullName, 
      shipName: item.name,
      classNumber: item.classNumber,
      IMONumber: item.imoNumber,
      registerNumber: item.registerNumber,
      shipType: item.shipType,
      tonnageGross: item.grossTonnage,
      position: item.position,
      imagePath: item.imagePath,
      isDisabled: item.isDisabled, 
    }));

    const shipTableData: ShipTableData = {
      data: data,
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: responseData.result.length,
      },
    };

    return shipTableData;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error response: ", error.response);
      console.error("Error data: ", error.response?.data);
      console.error("Error status: ", error.response?.status);
    } else {
      console.error('An unexpected error occurred:', error);
    }

    throw new Error('Failed to fetch ship data from the server.');
  }
};
