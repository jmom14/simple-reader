import React, { useCallback, useState } from 'react';
import EpubReader from '../EpubReader';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const Wrapper = styled.div`
  height: calc(100vh - 70px);
  display: grid;
  grid-template-rows: 1fr 100px;
`;

export default function Reader() {
  const [percentage, setPercentage] = useState(0);
  const location = useLocation();
// TODO: Change to get file via props
  const { file } = location.state;
  
  const onLocationChanged = async (newStartCfi: string, percentage: number) => {
    // if (!editionId) return;
    const displayPercentage = percentage || 0; // percentage might be null when book first created
    setPercentage(displayPercentage);
    // bookmarkBook(editionId, newStartCfi, displayPercentage);
  };

  const onReaderLocationsGenerated = useCallback((currentPercentage: number) => {
    setPercentage(currentPercentage);
  }, []);
  
  if(!file){
    return <div>Error loading epub</div>
  }

  return (
    <Wrapper>
      <EpubReader 
        percentage={percentage}
        onLocationsGenerated={onReaderLocationsGenerated}
        onLocationChanged={onLocationChanged}
        bookPath={file}
      />
    </Wrapper>
  )
}
