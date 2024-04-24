import React from 'react';
import { List, ListItem, Divider } from '@mui/material';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px 0;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface HighlightsListProps {
  highlights: any[],
}

function HighlightsList(props: HighlightsListProps) {
  const { highlights = [] } = props;

  const style = {
    py: 0,
    width: '100%',
    maxWidth: 800,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
  };
  
  return (
    <Wrapper>
      <List sx={style}>
        {highlights.map(item => (
          <React.Fragment >
            <ListItem key={item.id}>
              <Flex>
                <b>{item.cfi}</b>
                <div>{item.text}</div>
              </Flex>
            </ListItem>
            <Divider variant="middle" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Wrapper>
  )
}

export default HighlightsList