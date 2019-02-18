import { useState, useEffect } from 'react';

const mediaQueries = {};

/**
 * React hook to check when a valid media-query-string changes
 * (i.e. when the media query test starts or stops evaluating to true)
 *
 * @param {string} mediaQueryString valid media query string. E.g.: `(min-width: 425px)`
 * @returns {boolean} media-query matches value
 */
function useMediaQuery(mediaQueryString) {
  const [queryMatch, setQueryMatch] = useState(null);

  useEffect(() => {
    function setMediaQueryMatchesHandler(e) {
      setQueryMatch(e.matches);
    }

    if (!mediaQueries[mediaQueryString]) {
      mediaQueries[mediaQueryString] = window.matchMedia(mediaQueryString);
    }

    const mediaQuery = mediaQueries[mediaQueryString];

    mediaQuery.addListener(setMediaQueryMatchesHandler);

    setMediaQueryMatchesHandler(mediaQuery);

    return () =>
      mediaQuery.removeListener(setMediaQueryMatchesHandler);
  }, [mediaQueryString]);

  return queryMatch;
}

export default useMediaQuery;
