import React from 'react';
import { List, ListItem, Divider } from '@mui/material';
import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
`;

interface NotesListProps {
  notes: any[]
}

function NotesList(props: NotesListProps) {
  const { notes } = props;
  
  const style = {
    py: 0,
    width: '100%',
    maxWidth: 800,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
  };

  return (
    <>
      <List sx={style}>
        {notes.map(item => (
            <React.Fragment >
              <ListItem key={item.id}>
                <div style={{ display: 'flex', flexDirection: 'column'}}>
                  {/* <b></b> */}
                  <Flex><b>Cfi: </b><div>{item.cfi}</div></Flex>
                  <Flex><b>Text: </b><div>{item.text}</div></Flex>
                  <Flex><b>Note: </b><div>{item.note}</div></Flex>
                </div>
              </ListItem>
              <Divider variant="middle" component="li" />
            </React.Fragment>
          ))}
      </List>
    </>
  )
}

export default NotesList