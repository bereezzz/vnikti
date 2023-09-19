import React from "react";
import "./ModalWindow.scss";

import CustomButton from "../Button/CustomButton";

interface ModalWindowInterface {
  setActive: (check: boolean) => void;
  active: boolean;
  children: React.ReactNode;
}

const ModalWindow: React.FC<ModalWindowInterface> = ({ active, setActive, children }) => {
  if (active) {
    return (
      <div
        className={active ? "modal active" : "modal"}
      // закрытие окна при нажатии вне его
      //onClick={() => setActive(false)}
      >
        <div className="modal__content" onClick={(e) => e.stopPropagation()}>
          <div >
            <CustomButton className="icnClose" type="offBorders" onClick={() => setActive(false)}>
              X
            </CustomButton>
          </div>
          {children}
        </div>
      </div>
    );
  }

  return <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}></div>;
};

export default ModalWindow;
