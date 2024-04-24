import React, { useState } from 'react';
import Popover from './Popover';
import styled from 'styled-components';
import Button from '@mui/material/Button';

const Wrapper = styled.div`
  background-color: white;
  width: 300px;
  padding: 15px;
  display: flex;
  border: 1px solid #ccc;
  flex-direction: column;
  border-radius: 10px;
`;

const Text = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 10px;
`;

const Title = styled.h4`
  margin-bottom: 10px;
  margin-top: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const TextArea = styled.textarea`
  min-height: 90px;
  font-family: 'sans-serif';
  font-size: 16px;
`;

interface NotePopoverProps {
  text: string,
  reference: any,
  onHide: () => void,
  handleCreateNote: (text: string) => void,
}

function NotePopover(props: NotePopoverProps) {
  const [noteText, setNoteText] = useState('');
  const { text, reference, onHide, handleCreateNote } = props;

  const handleCreateClick = () => {
    handleCreateNote(noteText);
  }

  const content = (
    <Wrapper>
      <Title>Create Note</Title>
      <Text>{text}</Text>
      <TextArea
        value={noteText} 
        onChange={(e: any) => setNoteText(e.target.value)} 
      />
      <ButtonContainer>
        <Button variant="contained" onClick={handleCreateClick}>Create</Button>
      </ButtonContainer>
    </Wrapper>
  );

  return (
    <Popover 
      reference={reference}
      content={content}
      onHide={onHide}
    />
  )
}

export default NotePopover