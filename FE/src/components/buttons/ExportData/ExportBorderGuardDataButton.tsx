import React from 'react';
import { Button, Space } from 'antd';
import {  UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { BorderGuardTableData, getBorderGuardTableData } from '@app/api/borderGuard.api';

const ExportBorderGuardDataButton: React.FC = () => {

    const handleExportClick = async () => {
        try {
            const pagination = { current: 1, pageSize: 7 }; // Modify as needed
            const { data }: BorderGuardTableData = await getBorderGuardTableData(pagination);
            // Conditionally filter data based on the role
            const modifiedData = data.map(item => ({
                'Tài khoản': item.userName,
                'Họ và Tên': item.fullName,
                'Ngày tháng năm sinh': new Date(item.dateOfBirth).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }),
                'Địa chỉ': item.address,
                'Quốc tịch': item.country,
                'Căn cước công dân': item.nationalId,
                'Giới tính': item.gender ? 'Nam' : 'Nữ',
                'Link Ảnh': item.avatar,
                'Số điện thoại': item.phoneNumber,
                'Email': item.email,
                'Chức vụ': item.role ? 'Cảng vụ' : 'Biên Phòng',
                'Trạng thái': item.isDisabled ? 'Hoạt động' : 'Đã khóa'
            }));
            const ws = XLSX.utils.json_to_sheet(modifiedData);  // Use filteredData instead of data here
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'BorderGuardData');

            XLSX.writeFile(wb, 'ThongTinBienPhong.xlsx');
        } catch (error) {
            console.error('Lỗi xuất thông tin biên phòng:', error);
        }
    };
    return (
        <Button onClick={handleExportClick} size='small' icon={<UploadOutlined />}>
            Xuất thông tin
        </Button>
    );
};

export default ExportBorderGuardDataButton;