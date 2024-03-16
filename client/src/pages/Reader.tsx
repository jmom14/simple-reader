import React, { useCallback, useState } from 'react';
// import { useParams } from 'react-router-dom';
import EpubReader from '../components/EpubReader';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: calc(100vh - 70px);
  display: grid;
  grid-template-rows: 1fr 100px;
`;

export default function Reader() {
  // const [book, setBook] = useState<any>()
  const [percentage, setPercentage] = useState(0);
  
  const onLocationChanged = async (newStartCfi: string, percentage: number) => {
    console.log('percentage: ', percentage)
    // if (!editionId) return;
    const displayPercentage = percentage || 0; // percentage might be null when book first created
    setPercentage(displayPercentage);
    // bookmarkBook(editionId, newStartCfi, displayPercentage);
  };

  const onReaderLocationsGenerated = useCallback((currentPercentage: number) => {
    setPercentage(currentPercentage);
  }, []);
  
  // let { id } = useParams();

  // useEffect(() => {
  //   const fetchBook = async () => {

  //   };
  //   fetchBook();
  // }, []);

  return (
    <Wrapper>
      <EpubReader 
        percentage={percentage}
        onLocationsGenerated={onReaderLocationsGenerated}
        onLocationChanged={onLocationChanged}
        bookPath="https://simple-reader.s3.us-west-1.amazonaws.com/books/pg72748.epub"
      />
    </Wrapper>
  )
}
