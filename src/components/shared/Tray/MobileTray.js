import React, { useEffect, useState, useRef, useContext } from 'react';
import Swipe from 'react-easy-swipe';
// Import contexts
import { AutoCompleteContext, FetchDisruptionsContext } from 'globalState';
// Import customHooks
import useWindowHeightWidth from 'customHooks/useWindowHeightWidth';
// Import Components
import TrayComponents from './TrayComponents/TrayComponents';
// Import styles
import s from './Tray.module.scss';

const MobileTray = () => {
  const [autoCompleteState] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext
  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext); // Get the state of modeButtons from modeContext

  const draggableTray = useRef(); // Ref used to keep track of Draggable dom element
  const slideableTray = useRef(); // Ref to track swipe dom element
  const { eleHeight } = useWindowHeightWidth(); // Get window height and width
  const initialTrayPosition = 100; // Initial position of tray
  const secondThird = (eleHeight / 3) * 2; // Get the second third of the container height for tray to swipe to
  const [trayPosition, setTrayPosition] = useState(initialTrayPosition); // Set initial position of tray

  console.log('started');
  // Open tray if there is a selectedMapDisruption (map icon has been clicked)
  useEffect(() => {
    if (autoCompleteState.selectedMapDisruption && fetchDisruptionsState.data.length) {
      setTrayPosition(secondThird || initialTrayPosition); // set tray to open
    }
  }, [autoCompleteState.selectedMapDisruption, fetchDisruptionsState.data.length, secondThird]);

  // SWIPE METHODS USED TO CONTROL SCROLLING OF TRAY
  const onSwipeStart = () => {
    document.body.style.overflow = 'hidden'; // Set body overflow to hidden, so we don't snap to body scrollbar
  };

  const onSwipeMove = () => {
    // Return true onSwipeMove to prevent page refreshing when swiping down on mobile browsers
    // But only return true when the tray position is not at the top (othherwise it won't let us overscroll the overlay content when fully opened)
    return trayPosition !== eleHeight;
  };

  const onSwipeEnd = () => {
    document.body.style.overflow = null; // Scrolling finished so return body overflow to normal
  };

  const onSwipeDown = () => {
    const trayScrollTop = slideableTray.current.swiper.scrollTop; // Get DOM element, so we can check the scollTop

    if (trayPosition === eleHeight && trayScrollTop === 0) setTrayPosition(secondThird); // If tray is open(position===eleHeight) and the scrollTop is 0 (we're at the top of the tray scroll), then swipe down to secondThird position
    if (trayPosition === secondThird) setTrayPosition(initialTrayPosition); // If tray is currently secondThird then swipe down to default position
  };

  const onSwipeUp = () => {
    if (trayPosition === initialTrayPosition) setTrayPosition(secondThird); // If tray is initial position then swipe up to secondThird position
    if (trayPosition === secondThird) setTrayPosition(eleHeight); // If tray is currently secondThird, then swipe up to full position
  };

  return (
    <div
      id="js-disruptions-tray"
      className={`${s.tray} wmnds-grid `}
      // set height of tray to height of map/container, and set top position of tray based on logic above
      style={{
        height: `${eleHeight}px`,
        top: typeof eleHeight !== 'number' ? '100%' : eleHeight - trayPosition,
      }}
      ref={draggableTray}
    >
      <Swipe
        className={`${s.swipeTrayWrapper} wmnds-p-md ${
          trayPosition === eleHeight ? s.trayIsOpen : ''
        }`}
        allowMouseEvents
        onSwipeUp={onSwipeUp}
        onSwipeDown={onSwipeDown}
        onSwipeStart={onSwipeStart}
        onSwipeMove={onSwipeMove}
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
