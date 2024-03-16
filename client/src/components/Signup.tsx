import React from 'react';
import { Title, Content, Footer } from './Login';
import TextField from '@mui/material/TextField';
import  { useFormik } from 'formik';
import Button from '@mui/material/Button';
import { signupValidationSchema } from '../utils/validation';
import { useSignupMutation } from '../app/services/auth';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../features/auth/authSlice';
import Loading from './Loading';

const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
};

interface SignupProps {
  onLoginClick: () => void,
  onClose: () => void,
}

function Signup(props: SignupProps) {
  const [signup, { isLoading}] = useSignupMutation();
  const { onLoginClick, onClose } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (formValue: any) => {
    try {
      const { email, password } = formValue;
      const user = await signup({ email, password }).unwrap();
      dispatch(setCredentials(user));
      onClose();
      navigate('/library');
    } catch (error) {
      console.log('error: ', error)
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signupValidationSchema,
    validateOnChange: false,
    onSubmit,
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
          {isLoading ? <Loading /> : 'Sign up'}
          
        </Button>
        <Footer>
          <span>Already have an account?</span>
          <a href="#!" onClick={onLoginClick}>Login</a>
        </Footer>
    </Content>
  )
}

export default Signup;
