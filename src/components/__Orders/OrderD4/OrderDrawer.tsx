import React from "react";

export const Drawer = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50 sm:items-center">
      <div className="w-full max-w-md p-4 bg-white rounded-t-lg sm:rounded-lg">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          Close
        </button>
        {children}
      </div>
    </div>
  );
};
