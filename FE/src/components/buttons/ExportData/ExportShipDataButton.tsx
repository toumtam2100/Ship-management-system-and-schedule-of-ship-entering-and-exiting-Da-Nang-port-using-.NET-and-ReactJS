import React from 'react';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { ShipTableData, getShipTableData } from '@app/api/shipTable.api';

const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const ExportShipDataButton: React.FC = () => {
    const handleExportClick = async () => {
        try {
            const pagination = { current: 1, pageSize: 7 };
            const { data }: ShipTableData = await getShipTableData(pagination);

            // Format data to match ShipTableRow interface
            const formattedData = data.map(item => ({
                'Link ảnh': item.imagePath,
                "Chủ thuyền": item.shipOwner,
                "Tên thuyền": item.shipName,
                "Số phân cấp": item.classNumber,
                "Số IMO": item.IMONumber,
                "Số đăng kiểm": item.registerNumber,
                "Loại": item.shipType,
                "Trọng tải": item.tonnageGross,
                "Trạng thái": item.isDisabled ? "Hoạt Động" : "Đã Khóa"
            }));

            const ws = XLSX.utils.json_to_sheet(formattedData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'ShipData');

            XLSX.writeFile(wb, 'ThongTinTauCa.xlsx');
        } catch (error) {
            console.error('Lỗi xuất thông tin thuyền:', error);
        }
    };
    return (
        <Button onClick={handleExportClick} size='small' icon={<UploadOutlined />}>
            Xuất thông tin
        </Button>
    );
};

export default ExportShipDataButton;
