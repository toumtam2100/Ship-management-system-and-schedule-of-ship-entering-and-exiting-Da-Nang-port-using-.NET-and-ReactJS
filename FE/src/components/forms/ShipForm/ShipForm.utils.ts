import AWS from 'aws-sdk';
import { RcFile } from 'antd/es/upload/interface';

//Config AWS
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_S3_REGION,
});

const s3 = new AWS.S3();

export const handleFinish = async (selectedFile: RcFile, values: any) => {
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
  if (typeof values.name === 'string') {
    // Set new name for received image file.
    const normalizedShipName = normalizeVietnamese(values.name);
    const newName = `${normalizedShipName.replace(/\s/g, '')}_Image.${fileObj.type.split('/').pop()}`;
    const newBlob = new Blob([await fileObj.arrayBuffer()], { type: fileObj.type });
    const newFile = new File([newBlob], newName);

    const params = {
      Bucket: bucketName,
      Key: `ShipImage/${newFile.name}`,
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
    console.error('Ship name is not a string:', values.name);
  }
};

export const normalizeVietnamese = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

//This function is failed to debug if there's any errors from the form.
export const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
