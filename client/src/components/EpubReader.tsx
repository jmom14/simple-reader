import React, { useState, useEffect, useCallback } from 'react';
import EPub from 'epubjs';
import styled from 'styled-components';
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import ReaderFooter from './ReaderFooter';

const Viewer = styled.div`
  width: 1200px;
  height: 700px;
  padding: 0;
  position: relative;
`;

const ReaderButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface EpubReaderProps {
  // initialLocation: string | null,
  bookPath: string,
  // editionId: string,
  // title: string,
  percentage: number,
  // wasUploadedByCurrentUser: boolean,
  // onTextClicked: (context: any, term: string) => void,
  onLocationsGenerated: (percentage: number) => void,
  onLocationChanged: (cfi: string, percentage: number) => void,
}

export default function EpubReader(props: EpubReaderProps) {
  const [epub, setEpub] = useState<any>();
  const [rendition, setRendition] = useState<any>();

  const { bookPath, percentage, onLocationChanged, onLocationsGenerated} = props;
  
  useEffect(() => {
    const epubBook = EPub(bookPath, { openAs: 'epub' });
    // console.log('epub: ', epubInstance);
    const bookRendition = epubBook.renderTo(
      'viewer',
      {  
        width: "100%", 
        height: "100%",
        flow: "paginated",
        manager: 'continuous',
      }
    );
    bookRendition.display();

    const bookNavigation = epubBook.loaded.navigation.then((navigation) => {
      console.log(navigation.toc)

      epubBook.ready.then(() => {
        return epubBook.locations.generate(200);
      }).then(() => {
        if (onLocationsGenerated) {

          let currentPercentage = 0;
          // if (initialLocation) {
          //   currentPercentage = epubBook.locations.percentageFromCfi(initialLocation);
          // }
          onLocationsGenerated(currentPercentage);
        }
      })
    });
    
    setEpub(epubBook);
    setRendition(bookRendition);

    return () => {
      epubBook.destroy();
      setEpub(null);
      setRendition(null);
    };

  }, [bookPath]);

  const nextPage = useCallback(() => {
    if (rendition && rendition.settings.manager) {
      rendition.next();
    }
  }, [rendition]);

  const prevPage = useCallback(() => {
    if (rendition && rendition.settings.manager) {
      rendition.prev();
    }
  }, [rendition]);

  const onLocationChange = useCallback(async (loc: any) => {
    console.log('loc: ', loc)
    if (rendition && onLocationChanged) {
      const epubPercentage = rendition.book.locations.percentageFromCfi(loc.start);
      // console.log('epubPercentage: ', epubPercentage)
      const newLocation = loc && loc.start;
      // console.log('newLocation: ', newLocation)
      onLocationChanged(newLocation, epubPercentage);
    }
  }, [rendition, onLocationChanged]);

  useEffect(() => {
    if (!rendition) return undefined;
    rendition.on('locationChanged', onLocationChange);

    return () => {
      rendition.off('locationChanged', onLocationChange);
    }
  }, [rendition, onLocationChange]);

  return (
    <>
      <Wrapper>
        <ReaderButton onClick={prevPage}>
          <MdOutlineNavigateBefore size={40} /> 
        </ReaderButton>
        <Viewer id="viewer" />
        <ReaderButton onClick={nextPage}>
          <MdOutlineNavigateNext size={40} /> 
        </ReaderButton>
      </Wrapper>
      <ReaderFooter percentage={(percentage || 0) * 100} />
    </>
  )
};