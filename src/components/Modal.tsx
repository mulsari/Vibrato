import React, { ReactNode } from "react";
import logo from "../assets/Logo.png";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-72 flex flex-col text-center items-center">
        <img src={logo} alt="Logo" className="w-24 h-auto mb-5 mx-auto" />
        <h2 className="text-lg font-semibold mb-5">{title}</h2>
        <div>{children}</div>
        <button
          onClick={onClose}
          className="mt-5 bg-transparent border-none text-gray-500 cursor-pointer"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;