import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HighlightsList from './HighlightsList';
import NotesList from './NotesList';
import TranslationsList from './TranslationsList';
import { useGetHighlightsQuery } from '../../app/services/highlights';
import { useGetNotesQuery } from '../../app/services/notes';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useGetReadingsQuery } from '../../app/services/readings';

const Title = styled.h1`
  align-self: flex-start;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 900px;
`;

const StyledTab = styled(Tab)`
  padding-left: 0 !important;
`;

const StyledTabs = styled(Tabs)`
  align-self: flex-start;
`;

export default function MyContent() {
  const [readingOptions, setReadingOptions] = useState([]);
  const [selectedReading, setSelectedReading] = useState("2");
  const [value, setValue] = React.useState(0);
  const { data: highlightsData = [], isLoading } = useGetHighlightsQuery(selectedReading);
  const { data: notesData = [], isLoading: isNotesLoading } = useGetNotesQuery(selectedReading);
  const { data: readingsNote = []} = useGetReadingsQuery();
  
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  useEffect(() => {
    if(readingsNote.length){
      setReadingOptions(readingsNote.map((item: any) => ({
        value: item.id,
        label: item.title,
      })));
    }
  }, [readingsNote]);

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
      <Content>
        <Title>My content</Title>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <StyledTabs value={value} onChange={handleChange}>
            <StyledTab label="Highlights" />
            <StyledTab label="Translations" />
            <StyledTab label="Notes" />
          </StyledTabs>
        </Box>
        <Select
            value={selectedReading}
            onChange={(e: SelectChangeEvent) => setSelectedReading(e.target.value)}
            size="small"
            sx={{ width: '200px'}}
          >
            <MenuItem value="0">All</MenuItem>
           {readingOptions.map((item: any) => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)}
          </Select>
        {renderComponent(value)}
      </Content>
    </Wrapper>
  )
}

