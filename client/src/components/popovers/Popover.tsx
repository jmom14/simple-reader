import React, { useState, useEffect, Fragment } from 'react';
import { usePopper } from 'react-popper';

interface PopoverProps {
  onHide: () => void,
  content: any,
  reference: any,
}

const Popover = (props: PopoverProps) => {
  const { reference, content, onHide } = props;
  const [popperElement, setPopperElement] = useState<any>(null);
  const { styles, attributes, update } = usePopper(reference, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [295, 120],
        },
      },
    ],
  });

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      // console.log(e.target)
      if (popperElement && popperElement.contains(e.target)) {
        return;
      }
      // onHide();
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [reference, popperElement, onHide]);

  useEffect(() => {
    if (update) update();
  }, [reference, update]);

  return (
    <Fragment>
      {reference && (
        <div
          style={{ ...styles.popper, zIndex: '2' }}
          {...attributes.popper}
          ref={setPopperElement}
        >
          {content}
        </div>
      )}
    </Fragment>
  );
};
export default React.memo(Popover);
