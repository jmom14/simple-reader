import React, { useState } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone'
import { IoCloudUploadOutline } from "react-icons/io5";
import Button from '@mui/material/Button';
import { S3 } from 'aws-sdk';
import awsConfig from '../config/aws';
import { AWS_BOOKS_OBJECT, AWS_SIMPLE_READER_BUCKET, File } from '../constants';
import { MdCancel } from "react-icons/md";


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

function Upload() {
  const [file, setFile] = useState<File | null>(null);
  
  const handleDrop = (acceptedFiles: any) => { 
    setFile(acceptedFiles[0]);
  };

  const handleClick = async () => {
    if(!file){
      return;
    }

    const s3 = new S3(awsConfig);

    const params = {
      Bucket: AWS_SIMPLE_READER_BUCKET,
      Key: `${AWS_BOOKS_OBJECT}/${file.name}`,
      Body: file,
    };

    try {
      const data = await s3.upload(params).promise();
      console.log('File uploaded successfully:', data.Location);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
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
          Upload
        </Button>
      </ButtonContainer>
    </Wrapper>
  )
}

export default Upload;

