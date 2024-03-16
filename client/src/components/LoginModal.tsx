import React, { useState } from 'react';
import Modal from './Modal';
import Login from './Login';
import Signup from './Signup';


interface LoginModalProps {
  isOpen: boolean,
  onClose: () => void,
}

const LoginModal = (props: LoginModalProps) => {
  const [component, setComponent] = useState('login');
  const { isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {component === 'login' && <Login onClose={onClose} onSignupClick={() => setComponent('signup')}/>}
      {component === 'signup' && <Signup onClose={onClose} onLoginClick={() => setComponent('login')}/>}
    </Modal>
  )
}

export default LoginModal;