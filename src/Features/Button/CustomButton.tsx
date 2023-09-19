import "./CustomButton.scss";
import React from "react";

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  // Для отключения возможности нажатия на кнопку
  disabled?: boolean;
  // Тип кнопки
  type?: "primary" | "offBorders" | "cancel" | "timePeriodButton";
  // Дополнительные классы
  className?: string;
  style?: object;
  id?: string;
}

const CustomButton: React.FC<Props> = ({
  children,
  onClick,
  disabled,
  type = "primary",
  className = "",
  style,
  id,
}) => {
  return (
    <button onClick={onClick} className={`${type} ${className}`} disabled={disabled} style={style} id={id}>
      {children}
    </button>
  );
};

export default CustomButton;
