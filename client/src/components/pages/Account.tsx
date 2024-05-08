import React, { useEffect, useState } from 'react'
import useIsAuthenticated from '../../hooks/useIsAutheticated';
import { useGetUserQuery, useUpdateUserMutation } from '../../app/services/users';
import Loading from '../Loading';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { showSuccessToast } from '../../utils/toast';

const Title = styled.h1`
  text-align: center;
`;

const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 40%;
  border-radius: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Account() {
  const [me, setMe] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const isAuthenticated = useIsAuthenticated();
  const { data, isLoading } = useGetUserQuery();
  const [updateUser, { isSuccess }] = useUpdateUserMutation();

  useEffect(() => {
    if (data) {
      setMe({
        firstName: data.first_name || '',
        lastName: data.last_name || '',
        email: data.email,
      })
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      showSuccessToast('Edited Successfully!')
    }
  }, [isSuccess]);

  if (!isAuthenticated) {
    return <div>You need to Login </div>
  }

  const handleSave = () => {
    updateUser({
      id: data.id,
      data: {
        first_name: me.firstName,
        last_name: me.lastName,
      }
    }
    )
  };


  return (
    <Wrapper>
      <Title>Account Details</Title>
      {isLoading
        ? <Loading />
        : (
          <Card>
            <div style={{ width: '70%' }}>
              <TextField
                id="first_name"
                label="First Name"
                variant="outlined"
                margin="normal"
                value={me.firstName}
                fullWidth={true}
                onChange={e => setMe({ ...me, firstName: e.target.value })}
              />
            </div>
            <div style={{ width: '70%' }}>
              <TextField
                id="last_name"
                label="Last Name"
                variant="outlined"
                margin="normal"
                value={me.lastName}
                fullWidth={true}
                onChange={e => setMe({ ...me, lastName: e.target.value })}
              />
            </div>
            <div style={{ width: '70%' }}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                margin="normal"
                value={me.email}
                fullWidth={true}
                disabled={true}
              />
            </div>
            <div style={{ width: '70%', display: 'grid' }}>
              <Button
                variant="contained"
                onClick={handleSave}
                style={{ marginTop: '10px', justifySelf: 'flex-end' }}
              >
                Save
              </Button>
            </div>
          </Card>
        )}
    </Wrapper>
  );
}
