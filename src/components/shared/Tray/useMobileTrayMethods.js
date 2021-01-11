import { useEffect, useState, useContext, useRef, useCallback } from 'react';

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
  const scrollTopRef = useRef(false); // ref to hold whether the tray is at the top of the page

  const scrollToServiceInfo = useCallback(() => {
    const { selectedItem } = autoCompleteState;
    const { swiper } = slideableTray.current;
    if (swiper?.children.length) {
      const childNo = selectedItem.selectedByMap ? swiper.children.length - 1 : 4;
      const offset = swiper.children[childNo]?.offsetTop;
      if (offset) {
        swiper.style.top = `-${offset}px`;
        swiper.style.overflow = 'initial'; // Fix overflow issue on iOS
      }
    }
  }, [autoCompleteState, slideableTray]);

  const resetTrayScroll = useCallback(() => {
    const { swiper } = slideableTray.current;
    swiper.style.top = 0;
    swiper.style.overflow = null;
  }, [slideableTray]);

  // Open tray if there is a selectedItem (map icon has been clicked) or a selected service
  useEffect(() => {
    const { selectedItem, selectedItemTo } = autoCompleteState;

    if (
      (selectedItem.selectedByMap ||
        (modeState.mode === 'train' && selectedItem.id && selectedItemTo.id) ||
        (modeState.mode !== 'train' && selectedItem.id)) &&
      fetchDisruptionsState.data.length &&
      slideableTray.current.swiper
    ) {
      setTrayPosition(half || initialTrayPosition); // set tray to open
      scrollToServiceInfo();
    }
  }, [
    fetchDisruptionsState.data.length,
    half,
    autoCompleteState,
    modeState.mode,
    slideableTray,
    scrollToServiceInfo,
  ]);

  // Changes map height based on the tray height

  useEffect(() => {
    const mapStyle = document.getElementById('disruptions-map').style;

    mapStyle.height = `${appHeight - trayPosition}px`;

    return () => {
      mapStyle.height = '100%';
    };
  }, [appHeight, trayPosition]);

  // Apply a class to prevent elastic overscroll on iOS devices
  useEffect(() => {
    documentElement.classList.add('mobile-tray-visible');

    return () => {
      documentElement.classList.remove('mobile-tray-visible');
    };
  });

  // SWIPE METHODS USED TO CONTROL SCROLLING OF TRAY
  const onSwipeStart = (e) => {
    body.style.overflow = 'hidden'; // Set body overflow to hidden, so we don't snap to body scrollbar
    documentElement.style.overscrollBehaviorY = 'none'; // Stops pull down to refresh in chrome on android
    scrollTopRef.current = e.currentTarget.scrollTop === 0; // e.currentTarget (instead of e.target) makes sure that it's the Swiper component we're targeting
  };

  const onSwipeEnd = () => {
    // Scrolling finished so return overflow behavior to normal
    body.style.overflow = null;
    documentElement.style.overscrollBehaviorY = null;
  };

  const onSwipeDown = () => {
    if (trayPosition === appHeight && scrollTopRef.current) {
      resetTrayScroll();
      setTrayPosition(half); // If tray is open(position===appHeight) and the scrollTop is 0 (we're at the top of the tray scroll), then swipe down to half position
    }
    if (trayPosition === half) setTrayPosition(initialTrayPosition); // If tray is currently half then swipe down to default position
  };

  const onSwipeUp = () => {
    if (trayPosition === initialTrayPosition) setTrayPosition(half); // If tray is initial position then swipe up to half position
    if (trayPosition === half) {
      resetTrayScroll();
      setTrayPosition(appHeight); // If tray is currently half, then swipe up to full position
    }
  };

  // Return methods to be used
  return { onSwipeStart, onSwipeEnd, onSwipeDown, onSwipeUp, trayPosition, appHeight };
};

export default useMobileTrayMethods;
