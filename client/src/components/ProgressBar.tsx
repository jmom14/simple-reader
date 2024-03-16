import React from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  background-color: #ecebed;
  border-radius: 50px;
  height: 10px;
  width: 600px;
`;

const ProgressBarFiller = styled.div`
  height: 100%;
  border-radius: inherit;
  text-align: right;
  position: relative;
`;

const Badge = styled.div<{color: string}>`
  padding: 3px;
  background-color: ${props => props.color};
  width: 35px;
  height: 20px;
  border-radius: 20px;
  position: absolute;
  right: 0;
  color: white;
  top: 50%;
  transform: translate(0%, -50%);
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ProgressBarProps {
  percentage: number,
  color: string,
  
}

const ProgressBar = (props: ProgressBarProps) => {
  const { color, percentage } = props;

  function formatPercentage(decimal: number): string {
    if (decimal !== null) {
      return `${Math.ceil(decimal)}%`;
    }
    return '';
  }
  

  const fillerStyles = {
    width: `${percentage}%`,
    backgroundColor: color,
  };

  return (
    <ProgressBarContainer>
      <ProgressBarFiller style={fillerStyles}>
        <Badge color={color}>{formatPercentage(percentage)}</Badge>
      </ProgressBarFiller>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
