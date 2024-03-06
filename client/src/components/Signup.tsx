import React from 'react';
import { Title, Content, Footer } from './Login';
import TextField from '@mui/material/TextField';
import  { useFormik } from 'formik';
import Button from '@mui/material/Button';
import { signupValidationSchema } from '../utils/validation';

const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
};

interface SignupProps {
  onLoginClick: () => void
}

function Signup(props: SignupProps) {
  const { onLoginClick } = props;

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signupValidationSchema,
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        console.log('signup...')
          // formValue.email,
          // formValue.password        
      } catch (error) {
        console.log('error: ', error)
      }
    }
  });

  const handleSignup = () => {
    formik.handleSubmit()
  }

  return (
    <Content>
      <Title>Signup</Title>
      <TextField 
          id="email" 
          label="Email" 
          variant="outlined"
          helperText={formik.errors.email}
          onChange={e => formik.setFieldValue('email', e.target.value)}
          error={'email' in formik.errors}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={e => formik.setFieldValue('password', e.target.value)}
          helperText={formik.errors.password}
          error={'password' in formik.errors}
        />
        <TextField
          id="repeat-password"
          label="Repeat Password"
          type="password"
          autoComplete="repeat-password"
          onChange={e => formik.setFieldValue('repeatPassword', e.target.value)}
          helperText={formik.errors.repeatPassword}
          error={'repeatPassword' in formik.errors}
        />
        <Button 
          variant="contained" 
          onClick={handleSignup}
          style={{ marginTop: '10px'}}
        >
          Sign up
        </Button>
        <Footer>
          <span>Already have an account?</span>
          <a href="#!" onClick={onLoginClick}>Login</a>
        </Footer>
    </Content>
  )
}

export default Signup;
