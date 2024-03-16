import React, { useState, useEffect } from 'react';
import awsConfig from '../config/aws';
import { S3 } from 'aws-sdk';
import { AWS_BOOKS_OBJECT, AWS_SIMPLE_READER_BUCKET, File } from '../constants';
import Cover from '../components/Cover';
import styled from 'styled-components';

const BooksContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 20px;
  align-items: flex-start;
  justify-content: center;
  padding: 0 50px;
`;

const Title = styled.h1`
  text-align: center;
`;

const Wrapper = styled.div`
  /* display: flex; */
`;

function Library() {
  const [files, setFiles] = useState<Array<File>>([]);

  useEffect(() => {
    const fetchBooks = () => {
      const s3 = new S3(awsConfig);
      const params = {
        Bucket: `${AWS_SIMPLE_READER_BUCKET}`,
        Prefix: `${AWS_BOOKS_OBJECT}/`,
      };      
      s3.listObjectsV2(params, (err, data: any) => {
        if (err) {
          console.error('Error reading files from S3:', err);
        } else {
          console.log('data: ', data)
          const newFiles = data.Contents.map((file: any) => ({
            ...file,
            name: file.Key.replace(params.Prefix, '')
          }));
          setFiles(newFiles);
        }
      });
    }
    fetchBooks();
  }, []);

  // console.log(files);

  return (
    <Wrapper>
      <Title>Library</Title>
      <BooksContainer>
        {files.map((file: any) => <Cover key={file.Key} name={file.name} />)}
        {files.map((file: any) => <Cover key={file.Key} name={file.name} />)}
        {files.map((file: any) => <Cover key={file.Key} name={file.name} />)}
      </BooksContainer>
    </Wrapper>
  )
}

export default Library