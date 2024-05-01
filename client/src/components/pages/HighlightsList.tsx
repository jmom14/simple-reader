import React from 'react';
import styled from 'styled-components';
import { Card, CfiText } from './NotesList';

const Wrapper = styled.div`
  padding: 10px 0;
`;

const Title = styled.div`
  font-weight: 600;
`;

interface HighlightsListProps {
  highlights: any[],
}

function HighlightsList(props: HighlightsListProps) {
  const { highlights = [] } = props;

  return (
    <Wrapper>
        {highlights.map((item) => (
          <Card key={item.id}>
            <div>
            <Title>{item.reading_title}</Title>
            <CfiText>{item.cfi}</CfiText>
            </div>
            <div>{item.text}</div>
          </Card>
        ))}
    </Wrapper>
  )
}

export default HighlightsList;
