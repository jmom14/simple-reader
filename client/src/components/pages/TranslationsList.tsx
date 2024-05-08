import React from 'react';
import styled from 'styled-components';
import { Card } from './NotesList';
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import Chip from '@mui/material/Chip';

const Wrapper = styled.div`
  padding: 10px 0;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
  position: relative;
`;

const CeteredArrow = styled(FaArrowRightArrowLeft)`
  position: absolute;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%); 
`;

interface TranslationsListProps {
  translations: any[],
}

function TranslationsList(props: TranslationsListProps) {
  const  { translations } = props;
  
  return (
    <Wrapper>
      {translations.map((item: any) => (
        <Row key={item.id}>
          <Card style={{ padding: '10px', flex: '1'}}><Chip label="English" />{item.text_to}</Card>
          <CeteredArrow />
          <Card style={{ padding: '10px', flex: '1'}}><Chip label="Spanish" />{item.text_from}</Card>
        </Row>
      ))}
    </Wrapper>
  )
}

export default TranslationsList;
