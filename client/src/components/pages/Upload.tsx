import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone'
import { IoCloudUploadOutline } from "react-icons/io5";
import Button from '@mui/material/Button';
import { File } from '../../constants';
import { MdCancel } from "react-icons/md";
import { useCreateReadingMutation } from '../../app/services/readings';
import EPub from 'epubjs';
import Loading from '../Loading';
import { showErrorToast, showSuccessToast } from '../../utils/toast';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledSection = styled.section`
  border: 2px dashed #b8c2cc;
  border-radius: 20px;
  padding: 40px;
  background-color: #f2f5f8;
  width: 600px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.p`
  font-weight: 600;
  color: #4d4b4b;
`;

const ButtonContainer = styled.div`
  padding-top: 20px;
`;

const UploadedItem = styled.div`
  border: 1px solid #d5d7db;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  display: grid;
  width: 300px;
  grid-template-columns: 1fr 15px;
`;

const FileNameLabel = styled.div`
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.h1`
  padding-bottom: 40px;
`;

interface EpubMetadata {
  title: string,
  author: string,
  cover?: Blob,
}

function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [epubMetadata, setEpubMetadata] = useState<EpubMetadata | null>(null);
  const [ createReading, { isSuccess, isError, isLoading } ] = useCreateReadingMutation();

  useEffect(() => {
    if(isSuccess){
      showSuccessToast('Epub uploaded successfully')
      setFile(null)
    }
    if(isError){
      showErrorToast('An error has occurred!');
    }
  }, [isError, isSuccess])

  const handleDrop = (acceptedFiles: any) => { 
    const acceptedFile = acceptedFiles[0];

    if (!acceptedFile){
      showErrorToast('An error has occurred! File to upload is empty');
      return;
    }

    if (acceptedFile.type !== 'application/epub+zip') {
      showErrorToast('File format is incorrect');     
      return;
    }

    const reader = new FileReader();
  
      reader.onload = () => {
        const book = EPub();
        const suggestedName = (acceptedFile.name.replace(/_/g, ' ').split('.').slice(0, -1)).join('.');
        if(typeof reader.result !== "object" || reader.result === null){
          return;
        }
        book.open(reader.result);
        book.coverUrl().then(async (coverUrl) => {
          if (coverUrl){
            const response = await fetch(coverUrl);
            const blob = await response.blob();
            return blob;
          }
          return null;
        }).then((cover: any) => {
          book.loaded.metadata.then((meta) => {
            setFile(acceptedFiles[0]);
            setEpubMetadata({
              title: meta.title.trim() || suggestedName,
              author: meta.creator,
            ...(cover ? { cover } : {})
            });
          });
        })
        
      };
      reader.readAsArrayBuffer(acceptedFile);
    };

  const handleClick = async () => {
    if(!file || !epubMetadata){
      return;
    }
    const reading = {
      title: epubMetadata.title,
      author: epubMetadata.author
    }
    createReading({ file, cover: epubMetadata.cover, reading: JSON.stringify(reading) });
  }

  const handleCancelClick = (e: any) => {
    e.stopPropagation();
    setFile(null);
  }

  return (
    <Wrapper>
      <Title>Upload epub File</Title>
      <Dropzone onDrop={handleDrop} maxFiles={1} accept={{'application/epub+zip': ['.epub']}}>
        {({getRootProps, getInputProps}) => {
          return(
            <StyledSection>
              <Content {...getRootProps()}>
                <input {...getInputProps()} />
                <IoCloudUploadOutline size={50} />
              {file 
                ? <UploadedItem onClick={e => e.stopPropagation()}>
                    <FileNameLabel>{file?.name}</FileNameLabel>
                    <MdCancel color="#d5d7db" cursor="pointer" onClick={handleCancelClick} />
                  </UploadedItem> 
                : <Label>Drag and Drop files here</Label>
              }
              </Content>
            </StyledSection>
        )}}
      </Dropzone>
      <ButtonContainer>
        <Button 
        variant="contained" 
        disabled={!(!!file)} 
        onClick={handleClick}
        >
          {isLoading ? <Loading /> : 'Upload'}
        </Button>
      </ButtonContainer>
    </Wrapper>
  )
}

export default Upload;
