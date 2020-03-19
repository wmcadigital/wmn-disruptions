import React, { useEffect, useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable'; // Uses https://www.npmjs.com/package/react-draggable
import Swipe from 'react-easy-swipe';
// Import contexts
import { AutoCompleteContext } from 'globalState';
// Import Components
import TrayComponents from './TrayComponents/TrayComponents';
// Import styles
import s from './Tray.module.scss';

const MobileTray = ({ windowWidth, windowHeight }) => {
  const slideableTray = useRef(); // Ref to track swipe dom element
  const [autoCompleteState] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext
  const [containerHeight, setContainerHeight] = useState(0); // Set ContainerHeight to state, we will make the tray confine to these bounds
  const [isTrayOpen, setIsTrayOpen] = useState(false); // Used to store bool if tray is fully open
  const [lockTray, setLockTray] = useState(false); // Store bool if we should lock the tray or not
  const [startPosition, setStartPosition] = useState(); // Used to capture start position of scroll event

  const [position, setPosition] = useState(-100); // Set initial position of tray

  // Open tray if there is a selectedMapDisruption (map icon has been clicked)
  useEffect(() => {
    if (autoCompleteState.selectedMapDisruption) {
      setPosition(-containerHeight); // set tray to open
    }
  }, [autoCompleteState.selectedMapDisruption, containerHeight]);

  // Get new map height on resize
  useEffect(() => {
    const mapEleHeight = document.getElementById('disruptions-container').offsetHeight; // getting the maps height(this will be used for the bounds of our draggable tray)
    setContainerHeight(mapEleHeight); // Set map height to state
  }, [windowWidth]); // Only re-run this effect when windowWidth is updated

  /*
  USED TO CONTROL SCROLLING OF TRAY ON MAP
  */

  // OnStart function for start of swiping tray
  const onStart = (e, data) => {
    document.body.style.overflow = 'hidden'; // Set body overflow to hidden, so we don't snap to body scrollbar
    setStartPosition(data.y);
  };

  // onStop function for stop of swiping tray
  const onStop = (e, data) => {
    let trayOpen; // placholder to set to true if tray is open
    document.body.style.overflow = null; // Scrolling finished so return body overflow to normal
    const { lastY } = data; // Get lastY scroll position

    const secondThird = (-containerHeight / 3) * 2; // Get the second third of the container

    // Greater than/less than if statements are backwards as we are dealing with negative values (minus)
    if (lastY < startPosition) {
      // scroll direction is up
      if (lastY > secondThird) {
        // If position is lower than secondThird
        setPosition(secondThird); // Set position to secondThird
      } else {
        setPosition(-containerHeight); // Set position to top
        trayOpen = true; // and set tray open to true
      }
    } else {
      // Else scroll direction is down
      // eslint-disable-next-line no-lonely-if
      if (lastY > secondThird) {
        setPosition(-100); // Set back to bottom
      } else if (lastY === -containerHeight) {
        // if lastY is the same as the container height then the tray must be open still...
        trayOpen = true; // Set tray open
      } else {
        setPosition(secondThird); // Else set position to secondThird
      }
    }

    // If lastY coords are at top of container, then set tralastY open to true, otherwise false
    return trayOpen ? setIsTrayOpen(true) : setIsTrayOpen(false);
  };

  /*
  USED TO CONTROL INTERNAL SCROLLING OF TRAY (OVERFLOW SCROLL)
  */

  // On Swipe down
  const onSwipeDown = () => {
    const trayScrollTop = slideableTray.current.swiper.scrollTop; // Get elementById so we can check the scollTop
    // If tray is open and the scrollTop is 0 (we're at the top of the tray scroll), then unlock tray
    return isTrayOpen && trayScrollTop === 0 ? setLockTray(false) : null;
  };

  // On Swipe up
  const onSwipeUp = () => {
    const trayScrollTop = slideableTray.current.swiper.scrollTop; // Get elementById so we can check the scollTop
    // If tray is open and the scrollTop is not 0 (we're not at the top of the tray scroll), so lock tray
    return isTrayOpen && trayScrollTop !== 0 ? setLockTray(true) : null;
  };

  return (
    <Draggable
      axis="y"
      grid={[1, 1]}
      bounds={{ left: 0, top: -containerHeight, right: 0, bottom: -100 }}
      position={{ x: 0, y: position }}
      onStart={(e, data) => onStart(e, data)}
      onStop={(e, data) => onStop(e, data)}
      disabled={lockTray}
      cancel="input"
    >
      <div className={`${s.tray} wmnds-grid `} style={{ height: `${windowHeight - 138}px` }}>
        <Swipe
          className={`${s.swipeTrayWrapper} wmnds-p-md ${isTrayOpen ? s.trayIsOpen : ''}`}
          onSwipeUp={() => onSwipeUp()}
          onSwipeDown={() => onSwipeDown()}
          ref={slideableTray}
        >
          <div className={`${s.drawerHandle} wmnds-col-1`}>
            <p>Swipe tray up</p>
          </div>
          <TrayComponents />
        </Swipe>
      </div>
    </Draggable>
  );
};

// Set props
MobileTray.propTypes = {
  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired
};

export default MobileTray;
