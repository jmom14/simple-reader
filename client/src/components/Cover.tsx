import React from 'react';
import styled from 'styled-components';

interface CoverProps {
  name: string,
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0;
`;

const CoverWrapper = styled.div`
  /* width: 170px;
  height: 250px;

  /* display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid gray;
  border-radius: 10px;  */

  width: 170px;
  height: 250px;

  background-color: lightblue;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

function Cover(props: CoverProps) {
  const { name } = props;
  
  return (
    <Wrapper>
    <CoverWrapper>Book</CoverWrapper>
      {name || "Unkown"}
    </Wrapper>
  )
}

export default Cover