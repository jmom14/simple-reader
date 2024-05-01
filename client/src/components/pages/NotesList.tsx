import React from 'react';
import styled from 'styled-components';

export const Card = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
`;

const Wrapper = styled.div`
  padding: 10px 0;
`;

const Title = styled.div`
  font-weight: 600;
`;

export const CfiText = styled.div`
  font-style: italic;
  font-size: small;
  margin-bottom: 10px;
`;

export const Text = styled.div`
  background-color: #efefef;
  padding: 5px;
  border-radius: 5px;
  margin: 5px 0;
`;

interface NotesListProps {
  notes: any[]
}

function NotesList(props: NotesListProps) {
  const { notes } = props;
  
  return (
    <Wrapper>
      {notes.map((item) => (
        <Card key={item.id}>
          <Title>{item.reading_title}</Title>
          <CfiText>{item.cfi}</CfiText>
          <div>{item.text}</div>
          <Text>{item.note}</Text>
        </Card>
      ))}
    </Wrapper>
  )
}

export default NotesList