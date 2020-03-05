import { useEffect, useContext } from 'react';
import { AutoCompleteContext } from 'globalState';

const useMapPointerEvents = (_mapRef, _view) => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext
  // Reassign injected useRef params to internal vars
  const mapRef = _mapRef.current;
  const view = _view.current;

  // const renders = useState(.current.current);

  useEffect(() => {
    // if view exists
    if (view) {
      // on pointer move
      view.on('pointer-move', e => {
        // capture lat/longs of point
        const screenPoint = {
          x: e.x,
          y: e.y
        };
        // Check lat longs on map view and pass anything found as a response
        view.hitTest(screenPoint).then(response => {
          // If there is a response and it contains an attribute id then it's one of our icon graphics
          if (response.results[0].graphic.attributes.id) {
            mapRef.style.cursor = 'pointer'; // change map cursor to pointer
          } else {
            mapRef.style.cursor = 'default'; // else keep default pointer
          }
        });
      });
    }
  }, [mapRef, view]);

  useEffect(() => {
    let mapClick; // set placeholder click event that we can assign an on click

    if (view) {
      const getGraphics = response => {
        const selectedMapDisruption = response.results[0].graphic.attributes.id;

        if (selectedMapDisruption !== undefined && !autoCompleteState.selectedService.id) {
          autoCompleteDispatch({
            type: 'UDPATE_SELECTED_MAP_DISRUPTION',
            selectedMapDisruption
          });
        } else if (autoCompleteState.selectedService.id) {
          const scrollPos = document.getElementById(`scroll-holder-for-${selectedMapDisruption}`)
            .offsetTop;
          console.log({ scrollPos });
          console.log({ div: document.getElementById('js-disruptions-tray') });
          document.getElementById('js-disruptions-tray').scrollTop = scrollPos;
        }
      };

      // Set up a click event handler and retrieve the screen point
      mapClick = view.on('click', e => {
        // intersect the given screen x, y coordinates
        const { screenPoint } = e;
        // the hitTest() checks to see if any graphics in the view
        view.hitTest(screenPoint).then(getGraphics);
      });
    }

    // On unmount
    return () => {
      if (view) {
        mapClick.remove(); // remove click event
      }
    };
  }, [autoCompleteDispatch, autoCompleteState.selectedService.id, view]);
};

export default useMapPointerEvents;
