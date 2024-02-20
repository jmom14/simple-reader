import React from 'react';
import Modal from './Modal';
import styled from 'styled-components';

interface LoginModalProps {
  isOpen: boolean,
  onClose: () => void,
}

const Title = styled.h2`
  text-align: center;
  font-weight: 400;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const LoginModal = (props: LoginModalProps) => {
  const { isOpen, onClose } = props;

  const handleLogin = () => {
    window.location.href = 'http://localhost:8000/login';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Content>
      <Title>Login to your account</Title>
      <button onClick={handleLogin}>Login</button>
      </Content>
    </Modal>
  )
}

export default LoginModal;