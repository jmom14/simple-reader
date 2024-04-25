import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CoverImage from './CoverImage';

interface CoverProps {
  reading: any,
}

const StyledLink = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px 0;
`;

const Author = styled.div`
  font-weight: 300;
`;

const Title = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
`;

function Cover(props: CoverProps) {
  const { id, title, author, file, cover_image_file } = props.reading;
  const navigate = useNavigate();
  
  const handleGoToReader = (e: any) => {
    e.stopPropagation()
    navigate(`/reader/${id}`, {
      state: {
        file: file,
      }
    })
  };

  return (
    <StyledLink onClick={handleGoToReader}>
      <CoverImage src={cover_image_file} />
      <Title>{title || "Unkown"}</Title>
      <Author>{author}</Author>
    </StyledLink>
  )
}

export default Cover;
