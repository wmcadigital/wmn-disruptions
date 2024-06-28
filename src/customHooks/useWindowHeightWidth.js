import { useState, useEffect } from 'react';

const useWindowHeightWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Store windows innerWidth so we can check on it for the render/return of this component
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [bannerHeight, setBannerHeight] = useState(0);
  const [disruptionHeight, setDisruptionHeight] = useState(0);
  const [appHeight, setAppHeight] = useState();

  // Check window width on resize, used to determine if we should show the mobile or desktop panel in the return/render at the bottom
  useEffect(() => {
    let mounted = true;

    // work out height of the banner to include in the app height
    const banner = document.getElementsByClassName('wmnds-banner-container');
    const divElement = document.querySelector('.wmnds-banner-container');
    if (banner.length > 0) {
      setBannerHeight(divElement.offsetHeight);
    }

    // work out height of the banner to include in the app height
    const disruption = document.getElementsByClassName('wmnds-disruption');
    const divElements = document.querySelector('.wmnds-disruption');
    if (disruption.length > 0) {
      setDisruptionHeight(divElements.offsetHeight);
    }

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
      setAppHeight(windowHeight - bannerHeight + disruptionHeight - 140);
    } else {
      setAppHeight(windowHeight - bannerHeight + disruptionHeight - 122);
    }
  }, [bannerHeight, disruptionHeight, windowHeight, windowWidth]);

  return { windowWidth, windowHeight, appHeight };
};

export default useWindowHeightWidth;
