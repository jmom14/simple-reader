import React from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  background-color: #ecebed;
  border-radius: 50px;
  height: 15px;
  width: 600px;
  position: relative;
`;

const ProgressBarFiller = styled.div`
  height: 100%;
  border-radius: inherit;
  text-align: right;
  position: relative;
`;

const Percentage = styled.div`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translate(50%, -50%);
  font-family: sans-serif;
  font-size: 12px;
`;

interface ProgressBarProps {
  percentage: number,
  color: string,
}

const ProgressBar = (props: ProgressBarProps) => {
  const { color, percentage: per } = props;

  function formatPercentage(decimal: number): number {
    if (decimal && decimal !== null) {
      return Math.ceil(decimal);
    }
    return 0;
  }

  const percentage = formatPercentage(per);
  const formattedPercentage = `${percentage}%`;

  const fillerStyles = {
    width: formattedPercentage,
    backgroundColor: color,
  };

  return (
    <ProgressBarContainer>
      <Percentage>{formattedPercentage}</Percentage>
      <ProgressBarFiller style={fillerStyles} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
