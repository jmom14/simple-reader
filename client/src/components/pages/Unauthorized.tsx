import React from 'react';
import styled from 'styled-components';
import prohibited from '../../static/images/prohibited.png';

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  height: calc(100% - 70px);
  font-family: sans-serif;
`;

const Big = styled.div`
  font-size: 100px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;


function Unauthorized() {
  return (
    <Wrapper>
      <Container>
        <div>
          <Big>403</Big>
          <div>Access Forbidden</div>
          <div>You have tried access a page you</div>
          <div>did not have permission for.</div>
        </div>
        <img src={prohibited} alt="" />
      </Container>
    </Wrapper>
  )
}

export default Unauthorized