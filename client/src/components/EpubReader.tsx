import React, { useState, useEffect, useCallback } from 'react';
import EPub, { EpubCFI } from 'epubjs';
import styled from 'styled-components';
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import ReaderFooter from './ReaderFooter';
import HighlightPopover from './popovers/HightlightPopover';
import { showSuccessToast, showErrorToast } from '../utils/toast';
import TranslatePopover from './popovers/TranslatePopover';
import NotePopover from './popovers/NotePopover';
import { useCreteaHighlightMutation } from '../app/services/highlights';
import { useParams } from 'react-router-dom';
import { useCreteaNoteMutation } from '../app/services/notes';

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
  const [popover, setPopover] = useState<any>(null);
  const { bookPath, percentage, onLocationChanged, onLocationsGenerated} = props;
  const [ createHighlight, result ] = useCreteaHighlightMutation();
  const [ createNote ] = useCreteaNoteMutation();
  let { id: readingId } = useParams();

  useEffect(() => {
    const epubBook = EPub(bookPath, { openAs: 'epub' });
    const bookRendition = epubBook.renderTo(
      'viewer',
      {  
        width: "100%", 
        height: "100%",
        flow: "paginated",
        manager: 'continuous',
        allowScriptedContent: true
      }
    );
    bookRendition.display();

    const bookNavigation = epubBook.loaded.navigation.then((navigation) => {

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

    // bookRendition.themes.default({
    //   '::selection': {
    //     'background': 'rgba(255,255,0, 0.3)'
    //   },
    //   '.epubjs-hl' : {
    //     'fill': 'yellow', 'fill-opacity': '0.3', 'mix-blend-mode': 'multiply'
    //   }
    // });
    
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
    if (rendition && onLocationChanged) {
      const epubPercentage = rendition.book.locations.percentageFromCfi(loc.start);
      const newLocation = loc && loc.start;
      onLocationChanged(newLocation, epubPercentage);
    }
  }, [rendition, onLocationChanged]);

  const createCfi = (cfiFrom: any, cfiBase: any) => (
    new EpubCFI(cfiFrom, cfiBase).toString()
  );

  const createVirtualElement = (rendition: any, contents: any, selectionRange: any) => {
    const selectionRects = selectionRange.getClientRects();
    const lastSelectionRect = selectionRects[selectionRects.length - 1];
    const containerRect = rendition.manager.container.getBoundingClientRect();
    const frameRect = contents.document.defaultView.frameElement.getBoundingClientRect();
    const leftOffset = lastSelectionRect.x + frameRect.x - containerRect.x;
  
    const virtualRect = {
      left: leftOffset,
      top: lastSelectionRect.y,
      width: lastSelectionRect.width,
      height: lastSelectionRect.height,
    };
    return {
      getBoundingClientRect() {
        return virtualRect;
      },
    };
  };

  const handleSelected = React.useCallback((cfiRange: any, contents: any) => {
    if(!epub) return;
    epub.getRange(cfiRange).then((range: any) => {
    })
  }, [epub]);

  const handleMouseDown = useCallback((events: any, contents: any) => {
    contents.window.getSelection().removeAllRanges();
    setPopover(null)
  }, []);

  const handleMouseUp = useCallback((event: any, contents: any) => {
    if (!rendition) return;
    const selection = contents.window.getSelection();
    if (selection.type !== 'Range' || !selection.anchorNode) {
      return;
    }
    const selectionRange = selection.getRangeAt(0);
    const cfiRange = createCfi(selectionRange, contents.cfiBase);    
    const virtualElement = createVirtualElement(rendition, contents, selectionRange);
    setPopover({reference: virtualElement, cfi: cfiRange, text: selection.toString(), type: "highlight"})
  }, [rendition]);

  useEffect(() => {
    if (!rendition) return undefined;
    rendition.on('locationChanged', onLocationChange);
    rendition.on('selected', handleSelected);
    rendition.on('mouseup', handleMouseUp);
    rendition.on('mousedown', handleMouseDown);
    return () => {
      rendition.off('locationChanged', onLocationChange);
      rendition.off('selected', handleSelected);
      rendition.off('mouseup', handleMouseUp);
      rendition.off('mousedown', handleMouseDown);
    }
  }, [rendition, onLocationChange, handleSelected, handleMouseDown, handleMouseUp]);

  const handleAddHighlight = () => {
    if(!rendition || !popover){
      return;
    }
    createHighlight({
      cfi: popover.cfi,
      text: popover.text,
      reading_id: readingId,
    }).then((response: any) => {
      if(response && response.data){
        rendition.annotations.highlight(popover.cfi);
        showSuccessToast("Highlight created successfully!");
      }
    },
    (error) => {
      showErrorToast('Error creating highlight')
    }
  ).catch(error => {
      console.log(error);
    }).finally(() => {
      setPopover(null);
    })
  };

  const handleAddNote = () => {
    if(!rendition || !popover){
      return;
    }
    
    setPopover((prevState: any) => ({
      ...prevState,
      type: "note"
    }))
  };

  const handleCreateNote = (noteText: string) => {
    if(!rendition || !popover){
      return;
    }
    createNote({
      cfi: popover.cfi,
      text: popover.text,
      reading_id: readingId,
      note: noteText,
    }).then((response: any) => {
      if(response && response.data){
        console.log(response)
        rendition.annotations.highlight(popover.cfi);
        showSuccessToast("Note created successfully!")
      }
    }).catch(error => {
      console.log('error: ', error)
    }).finally(() => {
      setPopover(null);
    })
  }

  const handleTranslate = () => {
    setPopover((prevState: any) => ({
      ...prevState,
      type: "translator",
    }));
  }

  const highlightPopover = (popover && popover.reference && popover.type === "highlight") && (
    <HighlightPopover
      handleAddHighlight={handleAddHighlight}
      handleAddNote={handleAddNote}
      handleTranslate={handleTranslate}
      onHide={() => setPopover(null)}
      reference={popover.reference}
    />
  );

  const translatorPopover = (popover && popover.reference && popover.type === "translator") && (
    <TranslatePopover 
      text={popover.text}
      reference={popover.reference}
      onHide={() => setPopover(null)}
    />
  )

  const notePopover = (popover && popover.reference && popover.type === "note") && (
    <NotePopover 
      text={popover.text}
      reference={popover.reference}
      onHide={() => setPopover(null)}
      handleCreateNote={handleCreateNote}
    />
  );


  return (
    <>
      <Wrapper>
        <ReaderButton onClick={prevPage}>
          <MdOutlineNavigateBefore size={40} /> 
        </ReaderButton>
        <Viewer id="viewer" />
        {highlightPopover}
        {translatorPopover}
        {notePopover}
        <ReaderButton onClick={nextPage}>
          <MdOutlineNavigateNext size={40} /> 
        </ReaderButton>
      </Wrapper>
      <ReaderFooter percentage={(percentage || 0) * 100} />
    </>
  )
};