import React from 'react';
import styled from 'styled-components';

type ItemComponent<T> = React.FunctionComponent<T>;
type MenuOptionsComponent<T, Q> = React.FunctionComponent<T> & { Item: ItemComponent<Q> };

interface MenuOptionsProps {
  children: React.ReactNode,
  width?: string,
  onClick?: React.MouseEventHandler<HTMLDivElement>,
}

interface ItemProps {
  children: React.ReactNode,
  icon?: React.ReactNode,
  onClick?: React.MouseEventHandler<HTMLLIElement>,
  className?: string,
  active?: boolean,
}

const MenuOptionItem = styled.li < ItemProps > `
  background: white;
  border: ${props => (props.active ? '2px solid #52CAD1' : 'none')} !important;
  font-size: 13px;
  min-width: 100px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 25px;
  cursor: pointer;

  &:hover{
    background-color: #7D90B1;
    color: white;
  }
`;

const MenuOptionItemIcon = styled.div`
  border-radius: 50%;
  padding: 10px;
  margin-right: 10px;
  display: grid;
  place-content: center;
  width: 12px;
  height: 12px;
`;

const MenuOptionList = styled.ul`
  background-color: white;
  display: flex;
  flex-direction: column;
  font-family: 'Rubik Regular', sans-serif;
  font-size: 14px;
  color: #536383;
  padding: 0;
  margin: 0;
  list-style: none;
`;


const MenuOptions: MenuOptionsComponent<MenuOptionsProps, ItemProps> = (
  props: MenuOptionsProps,
) => {
  const { children } = props;
  return (
    <MenuOptionList aria-hidden="true">
      {children}
    </MenuOptionList>
  );
};

const Item: ItemComponent<ItemProps> = (props: ItemProps) => {
  const {
    children,
    icon,
    onClick,
    className,
    active,
  } = props;

  return (
    <MenuOptionItem onClick={onClick} aria-hidden="true" className={className} active={active}>
      {icon && (
        <MenuOptionItemIcon>
          {icon}
        </MenuOptionItemIcon>
      )}
      {children}
    </MenuOptionItem>
  );
};

MenuOptions.Item = Item;

export default MenuOptions;
