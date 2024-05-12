import { useState, ReactNode, MouseEventHandler } from 'react';
import './ButtonArrDep.css';
interface ColorButtonProps {
  bgcolor: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

export const ColorButton: React.FC<ColorButtonProps> = ({ bgcolor, onClick, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonStyle = {
    backgroundColor: bgcolor,
    opacity: isHovered ? 0.5 : 0.7,
  };
  return (
    <button
      className="colorButton"
      style={buttonStyle}
      onClick={onClick}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};
