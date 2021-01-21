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
  const scrollTopAtZeroRef = useRef(false); // ref to hold whether the inner tray is at the top of the outer tray
  const timeoutRef = useRef(); // ref to hold a timeout that can be cleared when unmounting

  const scrollToServiceInfo = useCallback(() => {
    const { selectedItem } = autoCompleteState;
    const { swiper } = slideableTray.current;

    if (!swiper?.children.length) return;

    // Target the content that we'll slide scroll down to
    const childNo = selectedItem.selectedByMap ? swiper.children.length - 1 : 4;
    const offset = swiper.children[childNo]?.offsetTop;

    if (!offset) return;

    // we have to force a repaint of the CSS to fix overflow of inner tray issue iOS and Safari
    if (swiper.parentNode.offsetTop === 0) {
      swiper.style.visibility = 'hidden'; // force css repaint on iOS
      swiper.style.top = `-${offset}px`;
      timeoutRef.current = setTimeout(() => {
        swiper.style.visibility = 'visible'; // force css repaint on iOS
      }, 360);
    } else {
      swiper.style.top = `-${offset}px`;
    }
  }, [autoCompleteState, slideableTray]);

  const resetTrayScrollTop = useCallback(() => {
    const { swiper } = slideableTray.current;

    // Only reset the scroll if the user has just selected a service and is swiping up to see it
    if (parseInt(swiper.style.top, 10) === 0) return;

    const height = swiper.clientHeight;
    const offset = parseInt(swiper.style.top, 10) * -1;
    if (swiper.scrollHeight > height + offset) {
      // Move the tray back into place while keeping the service info in view then
      swiper.style.transition = 'none';
      swiper.style.height = `calc(100% + ${offset}px)`;
      swiper.style.visibility = 'hidden'; // hide scroll snapping from top to bottom on iOS
      timeoutRef.current = setTimeout(() => {
        swiper.style.top = 0;
        swiper.scrollTo(0, offset);
        swiper.style.transition = null;
        swiper.style.height = null;
        swiper.style.visibility = 'visible'; // hide scroll snapping from top to bottom on iOS
      }, 360);
    } else {
      // Scroll to the bottom of the info straight away
      swiper.style.top = 0;
      swiper.scrollTo(0, height);
    }
  }, [slideableTray]);

  // Open tray if there is a selectedItem (map icon has been clicked) or a selected service
  useEffect(() => {
    const { selectedItem, selectedItemTo } = autoCompleteState;
    const innerTray = slideableTray?.current?.swiper;
    const timeout = timeoutRef.current;

    if (
      (selectedItem.selectedByMap ||
        (modeState.mode === 'train' && selectedItem.id && selectedItemTo.id) ||
        (modeState.mode !== 'train' && selectedItem.id)) &&
      fetchDisruptionsState.data.length &&
      innerTray
    ) {
      setTrayPosition(half || initialTrayPosition); // set tray to open
      scrollToServiceInfo(); // scroll down to the relevant info in the tray
    }

    return () => {
      innerTray.style.visibility = 'visible';
      clearTimeout(timeout);
    };
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
    scrollTopAtZeroRef.current = e.currentTarget.scrollTop === 0; // e.currentTarget (instead of e.target) makes sure that it's the Swiper component we're targeting
  };

  const onSwipeEnd = () => {
    // Scrolling finished so return overflow behavior to normal
    body.style.overflow = null;
    documentElement.style.overscrollBehaviorY = null;
  };

  const onSwipeDown = () => {
    if (trayPosition === appHeight && scrollTopAtZeroRef.current) {
      resetTrayScrollTop(); // reset sliding tray's position
      setTrayPosition(half); // If tray is open(position===appHeight) and the scrollTop is 0 (we're at the top of the tray scroll), then swipe down to half position
    }
    if (trayPosition === half) setTrayPosition(initialTrayPosition); // If tray is currently half then swipe down to default position
  };

  const onSwipeUp = () => {
    if (trayPosition === initialTrayPosition) setTrayPosition(half); // If tray is initial position then swipe up to half position
    if (trayPosition === half) {
      setTrayPosition(appHeight); // If tray is currently half, then swipe up to full position
      resetTrayScrollTop(); // reset sliding tray's position
    }
  };

  // Return methods to be used
  return { onSwipeStart, onSwipeEnd, onSwipeDown, onSwipeUp, trayPosition, appHeight };
};

export default useMobileTrayMethods;
