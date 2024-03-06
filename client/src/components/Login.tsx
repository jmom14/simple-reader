import React from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import { loginValidationSchema } from '../utils/validation';


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
  text-decoration: none;
`;

interface LoginProps {
  onSignupClick: () => void,
}

const Login = (props: LoginProps) => {
  const { onSignupClick } = props;

  // const handleSocialAuth = () => {
  //   window.location.href = 'http://localhost:8000/login';
  // };

  const onSubmit = async (formValue: any) => {
    //   formValue.email,
    //   formValue.password,
    try {
      console.log('onSubmit...')
    } catch (error) {
      console.log(error)
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidationSchema,
    validateOnChange: false,
    onSubmit: onSubmit,
  })

  const handleLogin = () => {
    console.log(formik)
    formik.handleSubmit();
  }
  return (
    <Content>
      <Title>Login to your account</Title>

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
        Login
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