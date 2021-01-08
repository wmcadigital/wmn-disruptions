import { useEffect, useState, useContext } from 'react';
// Import contexts
import { AutoCompleteContext, FetchDisruptionsContext, ModeContext } from 'globalState';
// Import customHooks
import useWindowHeightWidth from 'customHooks/useWindowHeightWidth';

const useMobileTrayMethods = (slideableTray) => {
  const [autoCompleteState] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext
  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext); // Get the state of modeButtons from modeContext
  const [modeState] = useContext(ModeContext); // Get the state of modeButtons from modeContext

  const { appHeight } = useWindowHeightWidth(); // Get window height and width
  const initialTrayPosition = 100; // Initial position of tray
  const half = appHeight / 2; // Get half of the container height for tray to swipe to
  const [trayPosition, setTrayPosition] = useState(initialTrayPosition); // Set initial position of tray
  const { documentElement, body } = document;

  // Open tray if there is a selectedItem (map icon has been clicked) or a selected service
  useEffect(() => {
    const { selectedItem, selectedItemTo } = autoCompleteState;
    if (
      ((modeState.mode === 'train' && selectedItem.id && selectedItemTo.id) ||
        (modeState.mode !== 'train' && selectedItem.id)) &&
      fetchDisruptionsState.data.length
    ) {
      setTrayPosition(half || initialTrayPosition); // set tray to open
    }
  }, [fetchDisruptionsState.data.length, half, autoCompleteState, modeState.mode]);

  // Changes map height based on the tray height
  useEffect(() => {
    const mapStyle = document.getElementById('disruptions-map').style;

    mapStyle.height = `${appHeight - trayPosition}px`;

    return () => {
      mapStyle.height = '100%';
    };
  }, [appHeight, trayPosition]);

  //
  useEffect(() => {
    documentElement.classList.add('mobile-tray-visible');

    return () => {
      documentElement.classList.remove('mobile-tray-visible');
    };
  });

  // SWIPE METHODS USED TO CONTROL SCROLLING OF TRAY
  const onSwipeStart = () => {
    body.style.overflow = 'hidden'; // Set body overflow to hidden, so we don't snap to body scrollbar
    documentElement.style.overscrollBehaviorY = 'none'; // Stops pull down to refresh in chrome on android
  };

  const onSwipeEnd = () => {
    // Scrolling finished so return overflow behavior to normal
    body.style.overflow = null;
    documentElement.style.overscrollBehaviorY = null;

    const { scrollTop } = slideableTray.current.swiper; // Get DOM element, so we can check the scollTop
    if (trayPosition === appHeight && scrollTop === 0) setTrayPosition(half);
  };

  const onSwipeDown = () => {
    const { scrollTop } = slideableTray.current.swiper; // Get DOM element, so we can check the scollTop

    if (trayPosition === appHeight && scrollTop === 0) setTrayPosition(half); // If tray is open(position===appHeight) and the scrollTop is 0 (we're at the top of the tray scroll), then swipe down to half position
    if (trayPosition === half) setTrayPosition(initialTrayPosition); // If tray is currently half then swipe down to default position
  };

  const onSwipeUp = () => {
    if (trayPosition === initialTrayPosition) setTrayPosition(half); // If tray is initial position then swipe up to half position
    if (trayPosition === half) setTrayPosition(appHeight); // If tray is currently half, then swipe up to full position
  };

  // Return methods to be used
  return { onSwipeStart, onSwipeEnd, onSwipeDown, onSwipeUp, trayPosition, appHeight };
};

export default useMobileTrayMethods;
