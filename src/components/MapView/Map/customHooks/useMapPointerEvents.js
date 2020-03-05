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
    let clickEvent;
    const getGraphics = response => {
      const selectedMapDisruption = response.results[0].graphic.attributes.id;
      // get the top most layer ok.  that's the layer with the point on
      if (selectedMapDisruption !== undefined && !autoCompleteState.selectedService.id) {
        autoCompleteDispatch({
          type: 'UDPATE_SELECTED_MAP_DISRUPTION',
          selectedMapDisruption
        });
      } else if (autoCompleteState.selectedService.id) {
        const scrollPos = document.getElementById(`scroll-holder-for-${selectedMapDisruption}`)
          .offsetTop;
        document.getElementById('js-disruptions-tray').scrollTop = scrollPos;
      }
    };
    if (view) {
      // Set up a click event handler and retrieve the screen point
      clickEvent = view.on('click', e => {
        console.log('clicked');
        // the hitTest() checks to see if any graphics in the view
        // intersect the given screen x, y coordinates
        const { screenPoint } = e;
        // eslint-disable-next-line no-use-before-define
        view.hitTest(screenPoint).then(getGraphics);
      });
    }

    return () => {
      if (view) {
        clickEvent.remove();
      }
    };
  }, [autoCompleteDispatch, autoCompleteState.selectedService.id, view]);
};

export default useMapPointerEvents;
