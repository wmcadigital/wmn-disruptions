import { useEffect, useState, useContext } from 'react';
// Import contexts
import { AutoCompleteContext, FetchDisruptionsContext } from 'globalState';
// Import customHooks
import useWindowHeightWidth from 'customHooks/useWindowHeightWidth';

const useMobileTrayMethods = (slideableTray) => {
  const [autoCompleteState] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext
  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext); // Get the state of modeButtons from modeContext

  const { appHeight } = useWindowHeightWidth(); // Get window height and width
  const initialTrayPosition = 100; // Initial position of tray
  const half = appHeight / 2; // Get half of the container height for tray to swipe to
  const [trayPosition, setTrayPosition] = useState(initialTrayPosition); // Set initial position of tray
  const [isSwipingDown, setIsSwipingDown] = useState(null); // Used to track swiping down

  useEffect(() => {
    const { selectedMapDisruption, selectedService } = autoCompleteState;
    // Open tray if there is a selectedMapDisruption (map icon has been clicked) or a selected service
    if ((selectedMapDisruption || selectedService) && fetchDisruptionsState.data.length) {
      setTrayPosition(half || initialTrayPosition); // set tray to open
    }
  }, [fetchDisruptionsState.data.length, half, autoCompleteState]);

  useEffect(() => {
    document.getElementById('disruptions-map').style.height = `${appHeight - trayPosition}px`;

    return () => {
      document.getElementById('disruptions-map').style.height = '100%';
    };
  }, [appHeight, trayPosition]);

  // SWIPE METHODS USED TO CONTROL SCROLLING OF TRAY
  const onSwipeStart = () => {
    document.body.style.overflow = 'hidden'; // Set body overflow to hidden, so we don't snap to body scrollbar
  };

  const onSwipeMove = () => {
    // Return true onSwipeMove (prevents scroll during swipe). This helps prevent page refreshing when swiping down on mobile browsers
    // But only return true when the tray position is not at the top (otherwise it won't let us overscroll the overlay content when fully opened)
    return isSwipingDown;
  };

  const onSwipeEnd = () => {
    document.body.style.overflow = null; // Scrolling finished so return body overflow to normal
    // setIsSwipingDown(null);
  };

  const onSwipeDown = () => {
    setIsSwipingDown(true); // this is set to assist onSwipeMove

    const trayScrollTop = slideableTray.current.swiper.scrollTop; // Get DOM element, so we can check the scollTop

    if (trayPosition === appHeight && trayScrollTop === 0) setTrayPosition(half); // If tray is open(position===appHeight) and the scrollTop is 0 (we're at the top of the tray scroll), then swipe down to half position
    if (trayPosition === half) setTrayPosition(initialTrayPosition); // If tray is currently half then swipe down to default position
  };

  const onSwipeUp = () => {
    setIsSwipingDown(false); // this is set to assist onSwipeMove

    if (trayPosition === initialTrayPosition) setTrayPosition(half); // If tray is initial position then swipe up to half position
    if (trayPosition === half) setTrayPosition(appHeight); // If tray is currently half, then swipe up to full position
  };

  // Return methods to be used
  return { onSwipeStart, onSwipeMove, onSwipeEnd, onSwipeDown, onSwipeUp, trayPosition, appHeight };
};

export default useMobileTrayMethods;
