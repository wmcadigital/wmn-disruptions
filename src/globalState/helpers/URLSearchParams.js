const url = new URL(typeof window !== 'undefined' ? window.location.href : ''); // Set URL to current if browser window is detected

// Function for getting the value of a search param in the URL
const getSearchParam = (name) => {
  return url.searchParams.get(name); // Get the search param value for name passed in, and return back
};

// Function for setting the value of a search param in the URL
const setSearchParam = (name, val) => {
  url.searchParams.set(name, val); // Set the search param with the name provided to the value provided
  window.history.pushState({}, '', url.href); // Then push the updated search params back to the URL
};

// Function for deleting a search param in the URL
const delSearchParam = (name) => {
  url.searchParams.delete(name); // Delete the search param for the name provided
  window.history.pushState({}, '', url.href); // Then push the updated search params back to the URL
};

export { getSearchParam, setSearchParam, delSearchParam }; // Return functions, so they can be called independently
