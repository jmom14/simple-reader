import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBookOpen } from "react-icons/fa6";
import { MdFileUpload } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import Button from '@mui/material/Button';
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import LoginModal from './LoginModal';
import useIsAuthenticated from '../hooks/useIsAutheticated';
import UserAvatar from './UserAvatar';
import Popover from './Popover';
import MenuOptions from './MenuOptions';
import { removeCredentials } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { IoMdSettings } from "react-icons/io";
import { IoLogInOutline } from "react-icons/io5";

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
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

const StyledLink = styled(NavLink)`
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

const AvatarUsername = styled.h4`
  margin: 10px 20px;
`;

const AvatarPopover = styled.div`
  background: white;
  width: 200px;
  border-radius: 10px;
  padding-bottom: 10px;
  
  & > ul {
    & > li {
      padding: 5px 10px;
      
      &:last-child {
        margin-top: 20px;
      }
    }
  }
`;

function Navigation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const [isShowingUserOptions, setIsShowingUserOptions] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const styleLink = ({ isActive }: { isActive: boolean }) => isActive ? { color: 'black' } : {};

  const handleLogout = () => {
    dispatch(removeCredentials());
    setIsShowingUserOptions(false);
  };

  const menu = (
    <AvatarPopover>
      <AvatarUsername>{`Hi, User`}</AvatarUsername>
      <MenuOptions>
        <MenuOptions.Item icon={<MdAccountCircle size={30} />} onClick={() => navigate('/account')}>My Account</MenuOptions.Item>
        <MenuOptions.Item icon={<IoMdSettings size={30} />} onClick={() => navigate('/account')}>Settings</MenuOptions.Item>
        <MenuOptions.Item icon={<IoLogInOutline size={30} />} onClick={handleLogout}>Sign out</MenuOptions.Item>
      </MenuOptions>
    </AvatarPopover>
  );

  return (
    <>
      <Wrapper>
        <div />
        <Items>
          <Item>
            <StyledLink to={`library`} style={styleLink}>
              <Flex>
                <FaBookOpen />
                Library
              </Flex>
            </StyledLink>
          </Item>
          <Item>
            <StyledLink to={`upload`} style={styleLink}>
              <Flex>
                <MdFileUpload size={20} />
                Upload
              </Flex>
            </StyledLink>
          </Item>
          <Item>
            <StyledLink to={`my-content`} style={styleLink}>
              <Flex>
                <MdAccountCircle size={20} />
                My Content
              </Flex>
            </StyledLink>
          </Item>
          <Item>
            <StyledLink to={`account`} style={styleLink}>
              <Flex>
                <MdAccountCircle size={20} />
                Account
              </Flex>
            </StyledLink>
          </Item>
        </Items>

        <div style={{ width: '90px' }}>
          {isAuthenticated
            ? (
              <Popover
                trigger="click"
                content={menu}
                isOpen={isShowingUserOptions}
                onVisibilityChanged={setIsShowingUserOptions}
              >
                <UserAvatar username="NA" size={40} font={1.2} />
              </Popover>
            ) : (
              <Button onClick={() => setIsModalOpen(true)} variant="contained">
                Sign in
              </Button>
            )}
        </div>
        <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      </Wrapper>
      <Outlet />
    </>
  )
}

export default Navigation