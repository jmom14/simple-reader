import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import { loginValidationSchema } from '../utils/validation';
import { useLoginMutation } from '../app/services/auth';
import { useDispatch } from 'react-redux'
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';


const initialValues = {
  email: "",
  password: "",
};

export const Title = styled.h2`
  text-align: center;
  font-weight: 400;
`;

export const Content = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 0 15px 15px 15px;
`;

export const Footer = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 5px;
  justify-content: center;
`;

const ForgotPassword = styled(Link)`
  text-align: right;
  font-size: 14px;
`;

interface LoginProps {
  onSignupClick: () => void,
  onClose: () => void,
}

const Login = (props: LoginProps) => {
  const { onSignupClick, onClose } = props;
  const [loginError, setLoginError] = useState("");
  const [login, { isLoading, isError }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleSocialAuth = () => {
  //   window.location.href = 'http://localhost:8000/login';
  // };

  useEffect(() => {
    if(isError && !loginError){
      setLoginError('Network Error.')
    }
  }, [isError]);

  const onSubmit = async (formValue: any) => {
    try {
      const user = await login({ username: formValue.email, password: formValue.password }).unwrap();
      dispatch(setCredentials(user));
      navigate('/library');
      onClose();
    } catch (error: any) {
      const { data } = error;
      if (data && data.detail){
        setLoginError(data.detail);
      }
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidationSchema,
    validateOnChange: false,
    onSubmit: onSubmit,
  })

  const handleLogin = () => {
    formik.handleSubmit();
  }

  return (
    <Content>
      <Title>Login to your account</Title>
      {loginError && <Alert severity="error">{loginError}</Alert>}
      <TextField 
        id="email" 
        label="Email" 
        variant="outlined" 
        onChange={(e) => formik.setFieldValue("email", e.target.value)}
        helperText={formik.errors.email}
        error={'email' in formik.errors}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={(e) => formik.setFieldValue("password", e.target.value)}
        helperText={formik.errors.password}
        error={'password' in formik.errors}
      />

      <Button 
        variant="contained" 
        onClick={handleLogin}
        style={{ marginTop: '10px'}}
      >
        {isLoading ? <Loading /> : 'Login'}
      </Button>

      <ForgotPassword to="#">Forgot password?</ForgotPassword>

      <Footer>
        <span>New user?</span>
        <a href="#!" onClick={onSignupClick}>Sign Up</a>
      </Footer>

    </Content>
  )
}

export default Login;