import axios from 'axios';
import { Priority } from '../constants/enums/priorities';

export interface Tag {
  value: string;
  priority: Priority;
}

export interface ShipCertificateRow {
    shipId: number;
    certificateName: string;
    certificateNo: string;
    certificateStatus: string;
    issueDate: Date;
    expiryDate: Date;
    creator: string;
    updater: string; 
    createdBy: number;
    updatedBy: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Pagination {
  current?: number;
  pageSize?: number;
  total?: number;
}

export const filterFunction = (value: string | number | boolean, record: ShipCertificateRow) => {
  const now = new Date();
  const deadline = record.expiryDate;

  if (value === 'green') {
    return deadline.getTime() - now.getTime() > 7 * 24 * 60 * 60 * 1000;
  } else if (value === 'red') {
    return deadline.getTime() < now.getTime();
  } else if (value === 'yellow') {
    return deadline.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000 && deadline.getTime() > now.getTime();
  }

  return false;
};

export interface ShipCertificateData {
  data: ShipCertificateRow[];
  pagination: Pagination;
  filterFunction: (value: string | number | boolean, record: ShipCertificateRow) => boolean;
}

export const getShipCertificateData = async (pagination: Pagination, shipId: string): Promise<ShipCertificateData> => {
  try {
    const response = await axios.get('https://cangcadanang.asia/backend/api/ShipCertificate/ship/all?ShipId=' + shipId, {
      headers: {
        Authorization: 'Bearer eyJraWQiOiJwVzRGQkdOUDlSSFgycDNPS2tQVjBhVGJzaVI1RzJYTTFVWm9IOUp5QnQ4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjNmE3NDNiYS0yYzQ0LTRiMjgtOWM0NS00MWNjZDQ3ZTY3OGQiLCJyb2xlIjoiTWlsaXRhcnkiLCJyb2xlX3R5cGUiOiJVc2VyIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX2tuNUxVTHoyaCIsImNvZ25pdG86dXNlcm5hbWUiOiJuaGFudHYwMzAyIiwib3JpZ2luX2p0aSI6IjU2ZDBhOTQ1LTIxYzQtNDkyYi1hMjI5LTMwNGExM2U0MTBmOSIsImF1ZCI6IjQ0dTVlZXA1bWFhczBnZG5ndmN0MHI0b2dvIiwiZXZlbnRfaWQiOiI2OTUyY2VjMy03MTZhLTRiNTctYTY4ZC0xNjliM2ZmYzQyOWMiLCJ1c2VyX2lkIjoiMzQwNDU4MzU3MyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzEzMjgyMTUwLCJleHAiOjE3MTMyODU3NTAsImlhdCI6MTcxMzI4MjE1MCwianRpIjoiZjA1MTMzOTktNjk1Zi00NGQxLWEzZjktMGNhNjYzZGE4OGY4IiwiZW1haWwiOiJuaGFudHYwMzAyQGdtYWlsLmNvbSJ9.XrGr0XgisLnqx2wJ9QgNWt0Gr8jNHb2VGrGfu9yOb1O7kb3KjGbxQf38KiEzBI29M8qs3aJhkTYtmw18XjQs1mYP1rg4DRvJfweoIO_KmcGw-25myO-wDsF5OBIt0P9vq2Dg-F-FnNeYzbC3t8n6s9rkFQWLmArBCBthjkMPjS8Lv5LXZrxBJ5VFsxGqYiFfCbLPJM16_4syjIsHYPvA4uz0T3uL9rfW5f66dPXB9qPqsSOkxlZH4DqIm-HuzoreJfEhEV1jvwCoAXD5ajJVAEatw_j0B5mQsC2mnflu2xUfoQjB1ienJXM1dFKoazcSHMq-bKBYj_coq1EHqrVi3w',
      },
      params: {
        page: pagination.current,
        pageSize: pagination.pageSize,
      },
    });

    const responseData = response.data;

    const data: ShipCertificateRow[] = responseData.result.map((item: any) => ({
      shipId: item.shipId,
      certificateName: item.certificateName,
      certificateNo: item.certificateNo,
      certificateStatus: item.certificateStatus,
      issueDate: item.issueDate,
      expiryDate: item.expiryDate,
      createdBy: item.createdBy,
      updatedBy: item.updatedBy,
      creator: item.creator,
      updater: item.updater, 
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    const ShipCertificateData: ShipCertificateData = {
      data: data,
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: responseData.result.length,
    },
    filterFunction: filterFunction,

    };

    return ShipCertificateData;

  } catch (error) {
    throw new Error('Failed to fetch ship certificate data from the server.');
  }
};
