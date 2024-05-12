import { useCallback, useEffect, useState } from 'react';
import { Table, Descriptions, TableColumnsType, Row, Col } from 'antd'; // Import other necessary components
import { PortHistoryTableRow, getPortHistoryData } from '@app/api/portHistory.api'; // Import your API function
import { Pagination } from '@app/api/table.api';
import { useMounted } from '@app/hooks/useMounted';


const initialPagination: Pagination = {
    current: 1,
    pageSize: 3,
};

const PortHistoryShipTable = () => {
    const [tableData, setTableData] = useState<{ data: PortHistoryTableRow[]; pagination: Pagination; loading: boolean }>({
        data: [],
        pagination: initialPagination,
        loading: false,
    });
    const { isMounted } = useMounted();
    const fetch = useCallback(
        (pagination: Pagination) => {
            setTableData((tableData) => ({ ...tableData, loading: true }));
            getPortHistoryData(pagination).then((res) => {
                if (isMounted.current) {
                    setTableData({ data: res.data, pagination: res.pagination, loading: false });
                }
            });
        },
        [isMounted],
    );

    useEffect(() => {
        fetch(initialPagination);
    }, [fetch]);

    const columns: TableColumnsType<PortHistoryTableRow> = [
        {
            title: '',
            dataIndex: 'id',
        },
        {
            title: 'TÊN TÀU',
            dataIndex: 'shipName',
            align: 'center',
        },
        {
            title: 'BIỂN SỐ TÀU',
            dataIndex: 'shipNumber',
            align: 'center',
        },
        {
            title: 'NGÀY RỜI BẾN',
            key: 'arrivalDateTime',
            dataIndex: 'arrivalDateTime',
            align: 'center',
            render: (text, record) => formatDate(record.arrivalDateTime),
        },
        {
            title: 'NGÀY CẬP BẾN',
            key: 'departureDateTime',
            dataIndex: 'departureDateTime',
            align: 'center',
            render: (text, record) => formatDate(record.departureDateTime),
        },
        {
            title: 'CHI TIẾT',
            key: 'detail',
            dataIndex: 'id',
            align: 'center',
            render: (text, record) => (
                <a
                    href={`#`}
                    onClick={() => handleSeeMoreDetail(record.id.toString())}
                    style={{ textDecoration: 'underline', color: 'black' }}
                >
                    Xem chi tiết
                </a>
            ),
        },
    ];

    const handleSeeMoreDetail = (id: string) => {
        // Add logic to handle the click event for "See more detail"
        console.log(`See more detail clicked for id: ${id}`);
    };
    const formatDate = (date: Date): string => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };


    return (
        <Row>
            <Col xs={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }} xl={{ span: 24, offset: 0 }}>
                <Descriptions title="Lịch Sử Hoạt Động" />
                <Table
                    columns={columns}
                    dataSource={tableData.data}
                    loading={tableData.loading}
                    pagination={{
                        size: 'small',
                    }}
                />
            </Col>
        </Row>
    );
};

export default PortHistoryShipTable;