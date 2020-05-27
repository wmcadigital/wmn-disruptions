import React, { useEffect, useState, useRef, useContext } from 'react';
import Swipe from 'react-easy-swipe';
// Import contexts
import { AutoCompleteContext } from 'globalState';
// Import customHooks
import useWindowHeightWidth from 'customHooks/useWindowHeightWidth';
// Import Components
import TrayComponents from './TrayComponents/TrayComponents';
// Import styles
import s from './Tray.module.scss';

const MobileTray = () => {
  const draggableTray = useRef(); // Ref used to keep track of Draggable dom element
  const slideableTray = useRef(); // Ref to track swipe dom element
  const [autoCompleteState] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext
  const { eleHeight } = useWindowHeightWidth(); // Get window height and width
  const [position, setPosition] = useState(100); // Set initial position of tray

  // Open tray if there is a selectedMapDisruption (map icon has been clicked)
  useEffect(() => {
    if (autoCompleteState.selectedMapDisruption) {
      setPosition(-eleHeight); // set tray to open
    }
  }, [autoCompleteState.selectedMapDisruption, eleHeight]);

  /*
  USED TO CONTROL INTERNAL SCROLLING OF TRAY (OVERFLOW SCROLL)
  */

  const secondThird = (eleHeight / 3) * 2; // Get the second third of the container

  // OnStart function for start of swiping tray
  const onSwipeStart = () => {
    document.body.style.overflow = 'hidden'; // Set body overflow to hidden, so we don't snap to body scrollbar
  };

  // onStop function for stop of swiping tray
  const onSwipeEnd = () => {
    document.body.style.overflow = null; // Scrolling finished so return body overflow to normal
  };

  // On Swipe down
  const onSwipeDown = () => {
    const trayScrollTop = slideableTray.current.swiper.scrollTop; // Get elementById so we can check the scollTop
    // If tray is open and the scrollTop is 0 (we're at the top of the tray scroll), then unlock tray

    if (position === eleHeight && trayScrollTop === 0) setPosition(secondThird);
    if (position === secondThird) setPosition(100);
  };

  // On Swipe up
  const onSwipeUp = () => {
    // If tray is open and the scrollTop is not 0 (we're not at the top of the tray scroll), so lock tray
    if (position === 100) setPosition(secondThird);
    if (position === secondThird) setPosition(eleHeight);
  };

  return (
    <div
      className={`${s.tray} wmnds-grid `}
      style={{
        height: `${eleHeight}px`,
        top: typeof eleHeight !== 'number' ? '100%' : eleHeight - position,
      }}
      ref={draggableTray}
    >
      <Swipe
        className={`${s.swipeTrayWrapper} wmnds-p-md ${position === eleHeight ? s.trayIsOpen : ''}`}
        onSwipeUp={onSwipeUp}
        onSwipeDown={onSwipeDown}
        onSwipeStart={onSwipeStart}
        onSwipeEnd={onSwipeEnd}
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
