import React from 'react';
import Cover from '../components/Cover';
import styled from 'styled-components';
import { useFetchReadingsQuery } from '../app/services/readings';
import Loading from '../components/Loading';

const BooksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 20px;
  align-items: flex-start;
  justify-content: center;
  padding: 0 50px;
`;

const Title = styled.h1`
  text-align: center;
`;

const Wrapper = styled.div``;

function Library() {
  const { data, isLoading } = useFetchReadingsQuery();

  if (isLoading){
    return <Loading /> 
  }

  return (
    <Wrapper>
      <Title>Library</Title>
      <BooksContainer>
        {data?.readings?.map((reading: any) => <Cover key={reading.id} reading={reading} />)}
      </BooksContainer>
    </Wrapper>
  )
}

export default Library