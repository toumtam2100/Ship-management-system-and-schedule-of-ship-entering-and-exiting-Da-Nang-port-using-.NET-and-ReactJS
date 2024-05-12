import React, { useState, useEffect } from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import ApproveArrivalForm from '@app/components/forms/ApproveShipDetail/ApproveArrivalForm';
import { useParams } from 'react-router-dom';


const ApproveArrivalShipDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    // const [shipDetails, setShipDetails] = useState<PortHistoryTableRow | null>(null);

    // useEffect(() => {
    //     const fetchShipDetails = async () => {
    //         try {
    //             const { data } = await getPortHistoryData({ current: 1, pageSize: 8 });
    //             const ship = data.find((item:any) => item.id === Number(id));

    //             if (ship) {
    //                 setShipDetails(ship);
    //             } else {
    //                 console.error(`Ship with id ${id} not found`);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching ship details', error);
    //         }
    //     };

    //     fetchShipDetails();
    // }, [id]);    
    return (
        <div style={{ marginLeft: 6 }}>
            <PageTitle>Xét Duyệt Rời Cảng</PageTitle>
            <ApproveArrivalForm />
        </div>
    );
};

export default ApproveArrivalShipDetailPage;
