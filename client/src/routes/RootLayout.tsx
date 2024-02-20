import React, { useState } from 'react';
import styled from 'styled-components';
import { Outlet, Link } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa6";
import { MdFileUpload } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import Button from '@mui/material/Button';
import LoginModal from '../components/LoginModal';

const Wrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-color: rgba(256, 256, 256, 0.3);
`;

const Items = styled.ul`
  display: flex;
  gap: 80px;
  background-color: #f6f7fa;
  padding: 15px 40px;
`;

const Item = styled.li`
  list-style: none;
`;

// const Link = styled.a`
//   text-decoration: none;
//   color: #abbbce;
//   font-size: 14px;
//   font-weight: 600;
// `;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export default function RootLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <Wrapper>
      <div />
      <Items>
        <Item>
          <Link to="library">
            <Flex>
              <FaBookOpen />
              Library
            </Flex>
          </Link>
        </Item>
        <Item>
          <Link to="upload">
            <Flex>
              <MdFileUpload  size={20} />
              Upload
            </Flex>
          </Link>
        </Item>
        <Item>
          <Link to={`upload`}>
            <Flex>
              <MdAccountCircle  size={20} />
              My Content
            </Flex>
          </Link>
        </Item>
        <Item>
          <Link to={`upload`}>
            <Flex>
              <MdAccountCircle  size={20} />
              Account
            </Flex>
          </Link>
        </Item>
      </Items>
    <Button onClick={() => setIsModalOpen(true)} variant="contained">
      Sign in
    </Button>

    <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />  

    </Wrapper>
    <div id="detail">
        <Outlet />
      </div>
    </>
  )
}
