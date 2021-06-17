import React, { useReducer, createContext } from 'react';

export const FavsContext = createContext(); // Create when context

export const FavsProvider = (props) => {
  const { children } = props || {};

  const getCookie = (cookieName) => {
    const cookies = document.cookie;
    const containsCookiePolicy = cookies.indexOf(cookieName) > -1;
    if (!containsCookiePolicy) return null;

    return cookies
      .split('; ')
      .find((row) => row.startsWith(`${cookieName}=`))
      .split('=')[1];
  };

  const setCookie = (cname, cvalue, exdays) => {
    const cookieDomain = 'tfwm.org.uk';
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    const domain = `domain=.${cookieDomain}`;
    document.cookie = `${cname}=${cvalue};${expires};${domain};path=/`;
  };

  const favCookieAllowed = (() => {
    const cookiePolicy = getCookie('cookies-policy');
    if (!cookiePolicy) return false;

    const { functional } = JSON.parse(cookiePolicy);
    return !!functional;
  })();

  // Set intial state of favs (get from localStorage OR set default)
  const initialState = (() => {
    const fallback = {
      favCookieAllowed,
      hideFavsHelpMsg: false,
      isMapVisible: false,
      favs: {
        bus: [],
        train: [],
        tram: [],
        roads: [],
      },
    };

    const localStorageFavs = JSON.parse(localStorage.getItem('disruptionsApp'));
    const cookieFavs = JSON.parse(getCookie('disruptionsApp'));
    if (!localStorageFavs && !cookieFavs) return fallback;

    const favsToSet = localStorageFavs || cookieFavs;

    return {
      ...favsToSet,
      favCookieAllowed, // Always get latest cookie preference
    };
  })();

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the favState depening on action type
    switch (action.type) {
      // Add favourite
      case 'ADD_FAV':
        return {
          ...state,
          favs: {
            ...state.favs,
            [action.mode]: [...state.favs[action.mode], action.id],
          },
        };
      // Remove favourite
      case 'REMOVE_FAV':
        return {
          ...state,
          favs: {
            ...state.favs,
            [action.mode]: state.favs[action.mode].filter((item) => item !== action.id),
          },
        };
      // Hide help message
      case 'HIDE_FAVS_HELP_MSG':
        return {
          ...state,
          hideFavsHelpMsg: true,
        };
      // Default should return intial state if error
      default:
        return initialState;
    }
  };
  // Set up reducer using reducer logic and initialState by default
  const [favState, favDispatch] = useReducer(reducer, initialState);

  const favStateString = JSON.stringify(favState);
  localStorage.setItem('disruptionsApp', favStateString);
  // Sync the cookie with localStorage
  if (favCookieAllowed) setCookie('disruptionsApp', favStateString, 181);

  // Pass state and dispatch in context and make accessible to children it wraps
  return <FavsContext.Provider value={[favState, favDispatch]}>{children}</FavsContext.Provider>;
};
