import React from 'react';
import styled from 'styled-components';
import ProgressBar from './ProgressBar';

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  box-shadow: 5px -5px 10px rgba(149, 157, 165, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ReaderFooterProps {
  percentage: number
}

export default function ReaderFooter(props: ReaderFooterProps) {
  const { percentage } = props;
  return (
    <Wrapper>
      <ProgressBar percentage={percentage} color="#317fcd" />
    </Wrapper>
  )
}
