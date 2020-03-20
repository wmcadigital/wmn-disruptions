import { useState, useEffect } from 'react';

const useWindowHeightWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Store windows innerWidth so we can check on it for the render/return of this component
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [eleHeight, setEleHeight] = useState();

  // Check window width on resize, used to determine if we should show the mobile or desktop panel in the return/render at the bottom
  useEffect(() => {
    // Add event listner to window resize, if resized then update width with new window.width
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    window.addEventListener('resize', () => setWindowHeight(window.innerHeight));
    // Cleanup: remove eventListener
    return () => {
      window.removeEventListener('resize', () => setWindowWidth(window.innerWidth));
      window.removeEventListener('resize', () => setWindowHeight(window.innerHeight));
    };
  }, [windowWidth, windowHeight, setWindowWidth, setWindowHeight]);

  useEffect(() => {
    if (windowWidth > 410) {
      setEleHeight(windowHeight - 138);
    } else {
      setEleHeight(windowHeight - 122);
    }
  }, [windowHeight, windowWidth]);

  return { windowWidth, windowHeight, eleHeight };
};

export default useWindowHeightWidth;
