import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  height: 250px;
  min-height: 250px;
  margin-top: 100px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Content = styled.div`
  height: 100%;
`;

const Modal : FC<ModalProps> = ({ isOpen, onClose, children }) => {

  if (!isOpen) {
    return null;
  }

  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <CloseButton onClick={onClose}>
            &times;
          </CloseButton>
        </ModalHeader>
        <Content>{children}</Content>
      </ModalContainer>
    </Overlay>
  )
}

export default Modal