import React from 'react';
import Popover from './Popover';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

interface HighlightPopoverProps {
  handleAddHighlight: () => void,
  handleTranslate: () => void,
  handleAddNote: () =>  void,
  onHide: () => void,
  reference: any
}

const HighlightPopover = (props: HighlightPopoverProps) => {
  const { 
    handleAddHighlight,
    handleTranslate,
    handleAddNote,
    onHide,
    reference
   } = props;
  const content = (
    <ButtonGroup size="small" variant="contained" aria-label="Basic button group">
      <Button onClick={handleAddHighlight}>Highlight</Button>
      <Button onClick={handleTranslate}>Translate</Button>
      <Button onClick={handleAddNote}>Note</Button>
    </ButtonGroup>
    // <div>
    //   <button onClick={handleAddHighlight}>Highlight</button>
    //   <button onClick={handleTranslate}>Translate</button>
    //   <button onClick={handleAddNote}>Note</button>
    // </div>
  );
  

  return (
    <Popover 
      reference={reference}
      content={content}
      onHide={onHide}
    />
  );
};
export default HighlightPopover;
