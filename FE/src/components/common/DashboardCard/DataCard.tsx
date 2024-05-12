import { Card } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cardStyle, headStyle, bodyStyle } from './DataCard.styles';

interface DataCardProps {
  title: string;
  content: string;
  route: string;
}

const DataCard: React.FC<DataCardProps> = ({ title, content, route }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    navigate(route);
  };

  return (
    <Card
      loading={loading}
      headStyle={headStyle}
      hoverable
      title={title}
      style={cardStyle}
      onClick={handleClick}
      bodyStyle={bodyStyle(loading)}
    >
      <p>{content}</p>
    </Card>
  );
};

export default DataCard;
