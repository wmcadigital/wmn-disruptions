const useHandleAutoCompleteKeys = (resultsList, debounceInput, results) => {
  // Function for handling keyboard/keydown events (controls the up/down arrow on autocomplete results)
  const handleKeyDown = ({ keyCode, target }) => {
    // Keycodes:
    // 40 = down arrow
    // 38 = up arrow
    // 13 = enter
    // 32 = space
    // If down arrow pressed and current target is input (we are still in autocomplete debounce) and there are results
    if (target.localName === 'input') {
      if (keyCode === 40 && results.length) {
        resultsList.current.firstChild.focus(); // Then focus on the first child in results list
      }
    } else {
      // If down arrow and there is a next sibling/result
      if (keyCode === 40 && target.nextSibling) {
        target.nextSibling.focus(); // Then focus on next sibling/result
      }
      // Else if up arrow and there is a prev sibling/result
      else if (keyCode === 38 && target.previousSibling) {
        target.previousSibling.focus(); // Then focus on prev sibling/result
      }
      // Else if up arrow and no previous sibling
      else if (keyCode === 38) {
        debounceInput.current.focus(); // Then focus back on autoComplete input
      }
      // If enter or space pressed
      if (keyCode === 13 || keyCode === 32) {
        target.click(); // then emulate click event (select it)
      }
    }
  };

  return { handleKeyDown };
};

export default useHandleAutoCompleteKeys;
