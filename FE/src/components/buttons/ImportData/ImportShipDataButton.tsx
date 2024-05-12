import { DownloadOutlined } from '@ant-design/icons';
import { ShipTableRow } from '@app/api/shipTable.api';
import { Button, message, Upload } from 'antd';
import React from 'react';
import * as XLSX from 'xlsx';

interface ImportShipDataButtonProps {
  onImport: (data: ShipTableRow[]) => void;
}

const ImportShipDataButton: React.FC<ImportShipDataButtonProps> = ({ onImport }) => {
  const beforeUpload = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      try {
        const data = XLSX.read(e.target.result, { type: 'binary' });
        const firstSheetName = data.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(data.Sheets[firstSheetName], { header: 1 });

        if (sheetData.length < 2) {
          message.error('Không có dữ liệu trong file excel. Làm ơn kiểm tra nội dung file.');
          return;
        }

        const headerRow = sheetData[0];
        const parsedData = sheetData.slice(1);

        const formattedData: ShipTableRow[] = parsedData.map((row: any) => {
          const formattedRow: ShipTableRow = {
            id: row[1],
            imagePath: row[2],
            shipName: row[3],
            shipOwner: row[4],
            classNumber: row[5],
            IMONumber: row[6],
            registerNumber: row[7],
            shipType: row[8],
            tonnageGross: row[9],
            isDisabled: row[10],
          };
          return formattedRow;
        });

        onImport(formattedData);
      } catch (error) {
        console.error('Lỗi đọc file excel', error);
        message.error('Lỗi đọc file excel. Kiểm tra format');
      }
    };

    reader.readAsBinaryString(file);
    return false;
  };

  return (
    <Upload beforeUpload={beforeUpload} showUploadList={false}>
      <Button size="small" icon={<DownloadOutlined />}>
        Nhập thông tin
      </Button>
    </Upload>
  );
};

export default ImportShipDataButton;