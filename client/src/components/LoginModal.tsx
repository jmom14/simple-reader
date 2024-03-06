import React from 'react';
import Modal from './Modal';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean,
  onClose: () => void,
}

const Title = styled.h2`
  text-align: center;
  font-weight: 400;
`;

const Content = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 0 15px 15px 15px;
`;

const Footer = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 5px;
  justify-content: center;
`;

const ForgotPassword = styled(Link)`
  text-align: right;
  font-size: 14px;
  text-decoration: none;
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

        <TextField 
          id="email" 
          label="Email" 
          variant="outlined" 
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />

        <Button 
          variant="contained" 
          onClick={handleLogin}
          style={{ marginTop: '10px'}}
        >
          Login
        </Button>

        <ForgotPassword to="#">Forgot password?</ForgotPassword>

        <Footer>
          <span>New user?</span>
          <Link to="#">Sign Up</Link>
        </Footer>

      </Content>
    </Modal>
  )
}

export default LoginModal;