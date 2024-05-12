import Typography from '@material-ui/core/Typography';
import { DropdownButtonComponent } from './DropdownButtonComponent';
import './formCrew.css';
import { ColorButton } from './ButtonArrDep';
import { CrewTable } from './CrewTable';
import { ArrivalAndDepartureData } from './arrDep.api';
import { useParams } from 'react-router-dom';
interface CrewMember {
  id: number;
  name: string;
  phone: string;
  identity: string;
  experience: number;
  nationality: string;
  // Add other properties as needed
}

export const ArrivalAndDepartureDetail = () => {
  const { id } = useParams();
  const numericId: number = id ? parseInt(id, 10) : 0;
  const shipData = ArrivalAndDepartureData.find((item) => item.id === numericId);
  const crewData: CrewMember[] = (shipData?.crewData ?? []).map((member) => ({
    ...member,
    experience: parseInt(member.experience, 10),
  }));

  if (!shipData) {
    return <div>No data found for the specified id</div>;
  }
  return (
    <div className="mainContent">
      <h2>Chi tiết ra/vào cảng</h2>
      <form className="form" noValidate autoComplete="off">
        <div className="shipInformation">
          <Typography className="textShip" variant="body1">
            <strong>Tên tàu:</strong> {shipData.name}
          </Typography>
          <Typography className="textShip" variant="body1">
            <strong>Số Hiệu:</strong> {shipData.number}
          </Typography>
          <Typography className="textShip" variant="body1">
            <strong>Quốc tịch:</strong> {shipData.nationality}
          </Typography>
          <Typography className="textShip" variant="body1">
            <strong>Số Đăng Kiểm:</strong> {shipData.registryNum}
          </Typography>
          <Typography className="textShip" variant="body1">
            <strong>Chiều dài:</strong> {shipData.lengthShip}
          </Typography>
          <Typography className="textShip" variant="body1">
            <strong>Công Suất:</strong> {shipData.power}
          </Typography>
          <Typography className="textShip" variant="body1">
            <strong>Tên chủ tàu:</strong> {shipData.ownerName}
          </Typography>
          <Typography className="textShip" variant="body1">
            <strong>Ngày ra khơi:</strong> {shipData.dateOfDeparture}
          </Typography>
          <Typography className="textShip" variant="body1">
            <strong>Địa chỉ chủ tàu:</strong> {shipData.ownerAddress}
          </Typography>
          <Typography className="textShip" variant="body1">
            <strong>Ngày cập cảng:</strong> {shipData.dateOfArrival}
          </Typography>
        </div>
        <Typography className="textShip" variant="body1">
          <strong>Danh sách thuyền viên (gồm cả thuyền trưởng)</strong>
        </Typography>
        <CrewTable crewData={crewData} />
        <div className="AllButton">
          <DropdownButtonComponent />
          <div className="ButtonPart">
            <ColorButton bgcolor="#24b24b" onClick={handleButtonClick}>
              Chỉnh Sửa
            </ColorButton>
            <ColorButton bgcolor="#df1616" onClick={handleButtonClick}>
              Xóa
            </ColorButton>
          </div>
        </div>
      </form>
    </div>
  );
};
const handleButtonClick = () => {
  null;
};
