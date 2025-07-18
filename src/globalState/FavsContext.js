import React, { useEffect, useReducer, createContext } from 'react';

export const FavsContext = createContext(); // Create when context

export function FavsProvider(props) {
  const { children } = props || {};

  const getCookie = (cookieName) => {
    const cookies = document.cookie;
    const cookieString = cookies.split('; ').find((row) => row.startsWith(`${cookieName}=`));
    if (!cookieString) return null;
    return cookieString.split('=')[1];
  };

  const setCookie = (cname, cvalue, exdays) => {
    const env = process.env.NODE_ENV || 'developement';
    const cookieDomain = 'tfwm.org.uk';
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    const domain = env === 'development' ? 'domain=localhost' : `domain=.${cookieDomain}`;
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
      favs: {
        bus: [],
        train: [],
        tram: [],
        roads: [],
      },
    };

    const cookieFavs = JSON.parse(getCookie('disruptionsApp')) || {};

    // Remove any train favourites stores in the old format (as a string)
    if (cookieFavs.favs) {
      cookieFavs.favs.train = cookieFavs.favs.train.filter((fav) => typeof fav !== 'string');
    }

    return {
      ...fallback,
      ...cookieFavs,
      favCookieAllowed, // Always get latest cookie preference
    };
  })();

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    const filterOutFavourite = (faveItem) => {
      if (action.mode === 'bus' || action.mode === 'tram' || typeof action.id === 'string') {
        return faveItem !== action.id;
      }

      if (action.mode === 'roads') {
        const addressMatch = action.id.address === faveItem.address;
        const latMatch = action.id.lat === faveItem.lat;
        const lonMatch = action.id.lon === faveItem.lon;
        const radiusMatch = action.id.radius === faveItem.radius;
        return !addressMatch || !latMatch || !lonMatch || !radiusMatch;
      }

      return (
        faveItem.to !== action.id.to ||
        faveItem.from !== action.id.from ||
        faveItem.line !== action.id.line
      );
    };

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
            [action.mode]: state.favs[action.mode].filter(filterOutFavourite),
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

  useEffect(() => {
    const favStateString = JSON.stringify(favState);
    // Sync the cookie with localStorage
    if (favCookieAllowed) setCookie('disruptionsApp', favStateString, 181);
  }, [favCookieAllowed, favState]);

  // Pass state and dispatch in context and make accessible to children it wraps
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <FavsContext.Provider value={[favState, favDispatch]}>{children}</FavsContext.Provider>;
}
