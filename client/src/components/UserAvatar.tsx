import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border-radius: 50%;
  background-color: #52CAD1;
  font-weight: bold;
  color: white;
  cursor: pointer;
  display: grid;
  place-content: center;
`;

interface UserAvatarProps {
  size?: number,
  font?: number,
  username: string,
}

const UserAvatar: React.FunctionComponent<UserAvatarProps> = (props: UserAvatarProps) => {
  const { size = 40, font = 1.5, username } = props;
  return (
    <Wrapper style={{ fontSize: `${font}em`, width: `${size}px`, height: `${size}px` }}
    >
      {username.substr(0, 2).toUpperCase()}
    </Wrapper>
  );
};

export default UserAvatar;
