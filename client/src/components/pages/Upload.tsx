import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone'
import { IoCloudUploadOutline } from "react-icons/io5";
import Button from '@mui/material/Button';
import { File } from '../../constants';
import { MdCancel } from "react-icons/md";
import { useCreateReadingMutation } from '../../app/services/readings';
import EPub from 'epubjs';
import { toast, Bounce } from 'react-toastify';
import Loading from '../Loading';


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
}

function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [epubMetadata, setEpubMetadata] = useState<EpubMetadata | null>(null);
  const [ createReading, { isSuccess, isError, isLoading } ] = useCreateReadingMutation();

  useEffect(() => {
    if(isSuccess){
      toast.success('Epub uploaded successfully!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setFile(null)
    }
  
    if(isError){
      toast.error('An error has occurred!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }, [isError, isSuccess])

  const handleDrop = (acceptedFiles: any) => { 
    const acceptedFile = acceptedFiles[0];

    if (!acceptedFile){
      toast.error('An error has occurred! File to upload is empty', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if (acceptedFile.type !== 'application/epub+zip') {
      toast.error('File format is incorrect', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
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
        book.loaded.metadata.then((meta) => {
          setEpubMetadata({
            title: meta.title.trim() || suggestedName,
            author: meta.creator
          })
          setFile(acceptedFiles[0]);
        });
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
    createReading({ file, reading: JSON.stringify(reading) });
  }

  const handleCancelClick = (e: any) => {
    e.stopPropagation();
    setFile(null);
  }

  return (
    <Wrapper>
      <Title>Upload epub File</Title>
      <Dropzone onDrop={handleDrop} maxFiles={1}>
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
