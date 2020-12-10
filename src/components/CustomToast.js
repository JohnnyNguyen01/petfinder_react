import React from "react";
import { Toast } from "react-bootstrap";

const CustomToast = ({ title, content, className, show, onClose }) => {
  return (
    <Toast className={className} show={show} onClose={onClose}>
      <Toast.Header>
        <strong className="mr-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>
          {content}
      </Toast.Body>
    </Toast>
  );
};

export default CustomToast;
