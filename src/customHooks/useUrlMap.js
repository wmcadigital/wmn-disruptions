const useUrlMap = () => {
  const url = new URL(typeof window !== 'undefined' ? window.location.href : ''); // Set URL to current if browser window is detected

  // Function for setting the value of a search param in the URL
  const set = (name, val) => {
    url.searchParams.set(name, val); // Set the search param with the name provided to the value provided
    window.history.pushState({}, '', url.href); // Then push the updated search params back to the URL
  };

  // Function for getting the value of a search param in the URL
  const get = (name) => {
    return url.searchParams.get(name); // Get the search param value for name passed in, and return back
  };

  return { set, get }; // Return functions, so they can be called independently
};

export default useUrlMap;
