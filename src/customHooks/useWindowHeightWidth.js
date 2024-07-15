import { useState, useEffect } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';

const useWindowHeightWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Store windows innerWidth so we can check on it for the render/return of this component
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [bannerHeight, setBannerHeight] = useState(0);
  // const [footerHeight, setFooterHeight] = useState(0);
  const [disruptionHeight, setDisruptionHeight] = useState(0);
  const [appHeight, setAppHeight] = useState();
  const [filterHeight, setFilterHeight] = useLocalStorage('filterHeight', null); // add filter height to local storage

  // Check window width on resize, used to determine if we should show the mobile or desktop panel in the return/render at the bottom
  useEffect(() => {
    let mounted = true;

    // work out height of the banner to include in the app height
    const banner = document.getElementsByClassName('wmnds-banner-container');
    const divElement = document.querySelector('.wmnds-banner-container');
    if (banner.length > 0) {
      setBannerHeight(divElement.offsetHeight);
    }

    // work out height of the footer to include in the app height
    // const footer = document.getElementsByClassName('wmnds-footer');
    // const footerElement = document.querySelector('.wmnds-footer');
    // if (footer.length > 0) {
    //   console.log('set footer');
    //   setFooterHeight(footerElement.offsetHeight);
    //   console.log(footerHeight);
    // }

    // work out height of the filter including the disruption info
    const filter = document.getElementsByClassName('Tray_tray__hrAu8');
    const filterElements = document.querySelector('.Tray_tray__hrAu8');
    if (filter.length > 0) {
      setFilterHeight(filterElements.offsetHeight);
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

    const updateAppWidthHeight = () => {
      setFilterHeight(filterElements.offsetHeight); // set filter height
    };

    // Add event listener to window resize, if resized then update width with new window.width and window.height
    window.addEventListener('resize', updateWidthHeight);
    window.addEventListener('load', updateWidthHeight);

    filterElements.onresize = updateAppWidthHeight();

    // Cleanup: remove eventListener
    return () => {
      mounted = false;
      window.removeEventListener('resize', updateWidthHeight);
    };
  }, [windowWidth, windowHeight, setWindowWidth, setWindowHeight, setFilterHeight]);

  useEffect(() => {
    // console.log(filterHeight);
    // Set app height to window height minus the header height
    if (windowWidth > 768) {
      setAppHeight(filterHeight + 300);
    } else {
      setAppHeight(windowHeight); // bannerHeight - footerHeight
    }
  }, [bannerHeight, disruptionHeight, filterHeight, windowHeight, windowWidth]);

  return { windowWidth, windowHeight, appHeight };
};

export default useWindowHeightWidth;
