import React, { useRef } from 'react';
import Swipe from 'react-easy-swipe';

// Import Components
import TrayComponents from './TrayComponents/TrayComponents';
// Import styles
import s from './Tray.module.scss';
import useMobileTrayMethods from './useMobileTrayMethods';

const MobileTray = () => {
  const draggableTray = useRef(); // Ref used to keep track of Draggable dom element
  const slideableTray = useRef(); // Ref to track swipe dom element
  const {
    onSwipeStart,
    onSwipeEnd,
    // onSwipeDown,
    // onSwipeUp,
    onSwipeMove,
    trayPosition,
    appHeight,
  } = useMobileTrayMethods(slideableTray); // Pull in methods etc. to use for mobile swiper

  return (
    <div
      className={`${s.tray} wmnds-grid `}
      //  set top position of tray based on logic in useMobileTrayMethods
      style={{
        top: typeof appHeight !== 'number' ? '100%' : appHeight - trayPosition,
      }}
      ref={draggableTray}
    >
      <Swipe
        id="js-disruptions-tray"
        className={`${s.swipeTrayWrapper} wmnds-p-md ${
          trayPosition === appHeight ? s.trayIsOpen : ''
        }`}
        allowMouseEvents
        // onSwipeUp={onSwipeUp}
        // onSwipeDown={onSwipeDown}
        onSwipeStart={onSwipeStart}
        onSwipeEnd={onSwipeEnd}
        onSwipeMove={onSwipeMove}
        ref={slideableTray}
      >
        <div className={`${s.drawerHandle} wmnds-col-1`}>
          <p>Swipe tray up</p>
        </div>
        <TrayComponents />
      </Swipe>
    </div>
  );
};

export default MobileTray;
