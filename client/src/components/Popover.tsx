import React, {
  useEffect,
  useState,
  useCallback,
  Fragment,
} from 'react';
import { usePopper } from 'react-popper';
import CSSTransition from 'react-transition-group/CSSTransition';
import { Placement } from '@popperjs/core';
import styled from 'styled-components';
import '../static/css/popover.css'

const Reference = styled.div`
  display: inline-block;
`;

const Popper = styled.div`
  z-index: 99;
  border-radius: 10px;
  box-shadow: 0px 0px 6px #00000029;

  & > ul {
    padding: 0;
    margin: 0;
    list-style: none;
    border-radius: 10px;
    
    & > li{

      &:first-child{
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
      }
    
      &:last-child{
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
      }
    }
  }
`;

interface PopoverProps {
  children: React.ReactNode,
  content: React.ReactNode,
  isOpen: boolean,
  trigger?: "hover" | "click",
  placement?: Placement,
  offsetX?: number,
  offsetY?: number,
  animation?: string,
  referenceClassName?: string,
  popperClassName?: string,
  automaticClose?: boolean,
  onVisibilityChanged: (isOpen: any) => void,
}

const Popover = (props: PopoverProps) => {
  const [popper, setPopper] = useState<any>();
  const [reference, setReference] = useState<any>();
  const {
    children,
    content,
    isOpen,
    trigger = "click",
    placement = "bottom",
    offsetX,
    offsetY,
    animation,
    referenceClassName,
    popperClassName,
    automaticClose = false,
    onVisibilityChanged,
  } = props;

  const { styles, attributes } = usePopper(reference, popper, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [offsetY, offsetX],
        },
      },
    ],
  });

  let animationTiming = {};
  if (animation) {
    animationTiming = {
      enter: 200,
      exit: 200,
    };
  }

  const toggleOpen = () => onVisibilityChanged((prevState: any) => !prevState);
  const closePopper = () => onVisibilityChanged(false);
  const openPopper = () => onVisibilityChanged(true);

  const handleClickOutside = useCallback((e: any) => {
    if ((popper && popper?.contains(e.target))
    || (reference && reference?.contains(e.target))) {
      return;
    }
    onVisibilityChanged(false);
  }, [popper, reference, onVisibilityChanged]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  let actions;
  if (trigger === 'click') {
    actions = {
      onClick: toggleOpen,
      onTouchEnd: toggleOpen,
    };
  } else if (trigger === 'hover') {
    actions = {
      onMouseOver: openPopper,
      onMouseOut: closePopper,
    }
  }

  return (
    <Fragment>
      <Reference ref={setReference} {...actions} className={referenceClassName}>
        {children}
      </Reference>
      <CSSTransition
        in={isOpen}
        timeout={animationTiming}
        mountOnEnter
        unmountOnExit
        classNames={animation}
      >
        <Popper
          ref={setPopper}
          style={styles.popper}
          {...attributes.popper}
          className={popperClassName}
          {...(automaticClose && { ...actions })}
        >
          {content}
        </Popper>
      </CSSTransition>
    </Fragment>
  );
};

// Popover.defaultProps = {
//   placement: 'bottom',
//   trigger: 'click',
//   offsetX: 0,
//   offsetY: 0,
//   animation: '',
//   automaticClose: false,
// };

export default Popover;
