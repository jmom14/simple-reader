import React, { useEffect, useState } from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import Popover from './Popover';
import styled from 'styled-components';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FaArrowRight } from "react-icons/fa6";
import { useTranslateQuery } from '../../app/services/translate';
import Loading from '../Loading';


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
  const [selectedLanguage, setSelectedLanguage] = useState("es");
  const { text, reference, onHide } = props;
  const { data = {}, isLoading } = useTranslateQuery({ text: text, lang_to: selectedLanguage });

  useEffect(() => {
    if(data && data.language_to_code){
      setSelectedLanguage(data.language_to_code);
    }
  }, [data])
  
  const { 
    language_from, 
    language_from_code, 
    text_to
  } = data;

  const content = (
    <Wrapper>
      <Title>Translate</Title>
      <Text>{isLoading ? <Loading color="gray" />: text_to}</Text>
      <ButtonsContainer>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value="en"
          onChange={() => {}}
          size='small'
        >
          <MenuItem value={language_from_code}>{language_from}</MenuItem>
        </Select>
        <FaArrowRight />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          size='small'
        >
          <MenuItem value="es">spanish</MenuItem>
          <MenuItem value="en">english</MenuItem>
          <MenuItem value="fr">french</MenuItem>
          <MenuItem value="pt">portuguese</MenuItem>
          <MenuItem value="ar">arabic</MenuItem>
          <MenuItem value="ru">russian</MenuItem>
          <MenuItem value="zh-cn">chinese (simplified)</MenuItem>
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