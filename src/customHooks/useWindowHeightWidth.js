import { useState, useEffect } from 'react';

const useWindowHeightWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Store windows innerWidth so we can check on it for the render/return of this component
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [appHeight, setAppHeight] = useState();

  // Check window width on resize, used to determine if we should show the mobile or desktop panel in the return/render at the bottom
  useEffect(() => {
    let mounted = true;

    // Function to update window.width and window.height to state
    const updateWidthHeight = () => {
      if (mounted) {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
      }
    };
    // Add event listener to window resize, if resized then update width with new window.width and window.height
    window.addEventListener('resize', updateWidthHeight);

    // Cleanup: remove eventListener
    return () => {
      mounted = false;
      window.removeEventListener('resize', updateWidthHeight);
    };
  }, [windowWidth, windowHeight, setWindowWidth, setWindowHeight]);

  useEffect(() => {
    // Set app height to window height minus the header height
    if (windowWidth > 410) {
      setAppHeight(windowHeight - 140);
    } else {
      setAppHeight(windowHeight - 122);
    }
  }, [windowHeight, windowWidth]);

  return { windowWidth, windowHeight, appHeight };
};

export default useWindowHeightWidth;
