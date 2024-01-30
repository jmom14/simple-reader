import React from 'react';
import styled from 'styled-components';
import { Outlet } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa6";
import { MdFileUpload } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";

const Wrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
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

const Link = styled.a`
  text-decoration: none;
  color: #abbbce;
  font-size: 14px;
  font-weight: 600;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export default function RootLayout() {
  return (
    <>
    <Wrapper>
      <Items>
        <Item>
          <Link href={`library`}>
            <Flex>
              <FaBookOpen />
              Library
            </Flex>
          </Link>
        </Item>
        <Item>
          <Link href={`upload`}>
            <Flex>
              <MdFileUpload  size={20} />
              Upload
            </Flex>
          </Link>
        </Item>
        <Item>
          <Link href={`upload`}>
            <Flex>
              <MdAccountCircle  size={20} />
              Account
            </Flex>
          </Link>
        </Item>
      </Items>
     
    </Wrapper>
    <div id="detail">
        <Outlet />
      </div>
    </>
  )
}
