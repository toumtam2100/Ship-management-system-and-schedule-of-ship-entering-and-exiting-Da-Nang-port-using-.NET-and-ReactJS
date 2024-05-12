import React from 'react';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { CrewMemberTableData, getCrewMemberTableData } from '@app/api/crewMemberTable.api';

const ExportCrewMemberDataButton: React.FC = () => {
    const handleExportClick = async () => {
        try {
            const pagination = { current: 1, pageSize: 7 };
            const { data }: CrewMemberTableData = await getCrewMemberTableData(pagination);

            // Format data similar to modifiedData
            const formattedData = data.map(item => ({
                'Họ và Tên': item.fullName,
                'Ngày tháng năm sinh': new Date(item.dateOfBirth).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }),
                'Nơi sinh': item.birthPlace,
                'Quốc tịch': item.country,
                'Căn cước công dân': item.cardId,
                'Giới tính': item.sex ? 'Nam' : 'Nữ',
                'Link Ảnh': item.imageUrl,
                'Số điện thoại': item.phoneNumber,
                'Email': item.email,
                'Năm kinh nghiệm': item.yearExperience,
                'Trạng thái': item.status ? 'Hoạt động' : 'Không hoạt động'
            }));

            const ws = XLSX.utils.json_to_sheet(formattedData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'CrewMemberData');
    
            XLSX.writeFile(wb, 'ThongTinThuyenVien.xlsx');
        } catch (error) {
            console.error('Lỗi xuất thông tin thuyền viên:', error);
        }
    };    
    return (
        <Button onClick={handleExportClick} size='small' icon={<UploadOutlined />}>
            Xuất thông tin
        </Button>
    );
};

export default ExportCrewMemberDataButton;
