import React from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import Popover from './Popover';
import styled from 'styled-components';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FaArrowRight } from "react-icons/fa6";


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
  margin-bottom: 10px;
  background-color: #f5f5f5;
  padding: 10px;
`;

const Title = styled.h4`
  margin-bottom: 10px;
  margin-top: 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface TranslatePopoverProps {
  text: string,
  reference: any,
  onHide: () => void
}

function TranslatePopover(props: TranslatePopoverProps) {
  const { text, reference, onHide } = props;

  const content = (
    <Wrapper>
      <Title>Translate</Title>
      <Text>{text}</Text>
      <ButtonsContainer>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value="en"
          label="From"
          onChange={() => {}}
          size='small'
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FaArrowRight />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value="es"
          label="To"
          onChange={() => {}}
          size='small'
        >
          <MenuItem value="es">Spanish</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </ButtonsContainer>
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

export default TranslatePopover