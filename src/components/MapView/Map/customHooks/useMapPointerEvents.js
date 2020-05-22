import { useContext, useEffect } from 'react';
import { AutoCompleteContext } from 'globalState';

const useMapPointerEvents = (_mapRef, viewState) => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext
  const mapRef = _mapRef;

  useEffect(() => {
    const view = viewState;
    let mapClick;

    if (view) {
      // POINTER EVENTS

      // On pointer click
      const getGraphics = (response) => {
        const selectedGraphic = response.results.filter((result) => {
          return result.graphic.attributes && result.graphic.attributes.id;
        }); // Return anything clicked on that contains attributes and attributes.id (this is so we can tell it is a disruption icon)

        // If the hovereredGraphics has length, then it means we have clicked on a disruption
        if (selectedGraphic.length) {
          const selectedMapDisruption = selectedGraphic[0].graphic.attributes.id; // get the first graphic from the array of clicked (in case we clicked on more than one disruption clusterd together)

          // If the clicked graphic is not undefined and it is not the current selected item
          if (selectedMapDisruption !== undefined && !autoCompleteState.selectedService.id) {
            // Update state to make it selected map disruption
            autoCompleteDispatch({
              type: 'UDPATE_SELECTED_MAP_DISRUPTION',
              selectedMapDisruption,
            });
          }
        }
      };

      // Set up a click event handler and retrieve the screen point
      mapClick = view.on('click', (e) => {
        // intersect the given screen x, y coordinates
        const { screenPoint } = e;
        // the hitTest() checks to see if any graphics in the view
        view.hitTest(screenPoint).then(getGraphics);
      });
    }
    // END POINTER EVENTS
    return () => {
      if (view) {
        mapClick.remove(); // remove click event
      }
    };
  }, [autoCompleteDispatch, autoCompleteState.selectedService.id, mapRef, viewState]);
};

export default useMapPointerEvents;
