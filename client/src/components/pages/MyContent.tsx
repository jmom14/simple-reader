import React from 'react';
import styled from 'styled-components';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HighlightsList from './HighlightsList';
import NotesList from './NotesList';
import TranslationsList from './TranslationsList';
import { useGetHighlightsQuery } from '../../app/services/highlights';
import { useGetNotesQuery } from '../../app/services/notes';


const Title = styled.h1`
  /* padding-bottom: 40px; */
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function MyContent() {
  const [value, setValue] = React.useState(0);
  const { data: highlightsData = [], isLoading } = useGetHighlightsQuery(1);
  const { data: notesData = [], isLoading: isNotesLoading } = useGetNotesQuery(1);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  console.log(highlightsData)
  const renderComponent = (index: number) => {
    switch (index) {
      case 0:
        return <HighlightsList highlights={highlightsData} />
      case 1:
        return <TranslationsList />;
      case 2:
          return <NotesList notes={notesData} />
      default:
        return null;
    }
  }

  return (
    <Wrapper>
      <Title>My content</Title>

      <Tabs value={value} onChange={handleChange}>
        <Tab label="Highlights" />
        <Tab label="Translations" />
        <Tab label="Notes" />
      </Tabs>

      {renderComponent(value)}


    </Wrapper>
  )
}

