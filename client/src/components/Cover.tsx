import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface CoverProps {
  name: string,
}

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0;
`;

const CoverWrapper = styled.div<{ texture: string }>`
  position: relative;
  width: 170px;
  height: 250px;
  background: ${props => props.texture};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
`;

const Square = styled.div`
  width: 145px;
  height: 160px;
  border: 1px solid black;
  position: absolute;
  transform: translate(-50%, -50%);
  padding-top: 20px;
  top: 40%;
  left: 50%;
  color: white;
`;

function Cover(props: CoverProps) {
  const { name } = props;
  
  function generateTexture() {
    const colors = ['#3a1cb0', '#0000ff', '#270e8a', '#3715bf', '#1a085e', '#9d9cff'];
    let textureCSS: any = [];
  
    for (let i = 0; i < 100; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      textureCSS.push(randomColor);
    }
    
    return `linear-gradient(45deg, ${textureCSS.join(", ")})`;
  }

  const texture = generateTexture();
  
  return (
    <StyledLink to={`/reader/${name}`}>
      <CoverWrapper texture={texture}>
        <Square>
          Book
        </Square>
        </CoverWrapper>
        {name || "Unkown"}
    </StyledLink>
  )
}

export default Cover;
