import { useContext } from 'react';
import { FetchDisruptionsContext, AutoCompleteContext, ModeContext } from 'globalState';
// Import customHooks
import useFilterLogic from 'customHooks/useFilterLogic';

const useShowSelectedServiceInfo = () => {
  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext);
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { selectedItem, selectedItemTo } = autoCompleteState;
  const [modeState] = useContext(ModeContext);
  // The below will check all disruptions and will return any disruption where the mode is bus and the id the user clicked in the autocomplete is within the servicesAffected array
  const disruptedServices = useFilterLogic();
  // Create boolean variables to use in comparisons
  const isModeSelected = Object.keys(modeState).length !== 0 && modeState.mode !== null;
  const anyDisruptionsToShow = disruptedServices.length > 0;
  // Below creates an object that shows the state of the autoComplete inputs per mode.
  const areSelectedItems = (() => {
    const defaultState = {
      allEmpty: true,
      allSelected: false,
      doneWithSideEffects: true,
    };

    if (!isModeSelected) {
      return defaultState;
    }

    switch (modeState.mode) {
      // Bus only has one autoComplete, so we just check if it's filled or not
      case 'bus':
        return {
          ...defaultState,
          allEmpty: !selectedItem.id,
          allSelected: !!selectedItem.id,
        };
      // Train has two inputs, so both must be filled or neither
      case 'train':
        return {
          ...defaultState,
          allEmpty: !selectedItem.id && !selectedItemTo.id,
          allSelected: selectedItem.id && selectedItemTo.id,
        };
      // Tram is like train, but filling in both triggers a sideEffect (fetching in-between stops)
      // so we have to wait for that to resolve
      case 'tram':
        return {
          ...defaultState,
          allEmpty: !selectedItem.id && !selectedItemTo.id,
          allSelected: selectedItem.id && selectedItemTo.id,
          doneWithSideEffects:
            selectedItem.id === selectedItemTo.id ||
            (selectedItem.lines !== undefined && selectedItem.lines.length > 0),
        };

      default:
        return defaultState;
    }
  })();
  const { isMapVisible } = fetchDisruptionsState;
  const { selectedByMap } = selectedItem;
  // Variables to toggle the visibility of SelectedService child components
  const showInfoAboutSelectedService =
    !selectedByMap && isModeSelected && areSelectedItems.allSelected;

  const showServiceMessage =
    isMapVisible &&
    !anyDisruptionsToShow &&
    (!isModeSelected ||
      areSelectedItems.allEmpty ||
      (areSelectedItems.allSelected && areSelectedItems.doneWithSideEffects));

  const showDisruptedServices =
    isMapVisible &&
    isModeSelected &&
    anyDisruptionsToShow &&
    (areSelectedItems.allSelected || selectedByMap);

  const showLineBreak = showInfoAboutSelectedService && showServiceMessage;

  return {
    showInfoAboutSelectedService,
    showServiceMessage,
    showDisruptedServices,
    showLineBreak,
    disruptedServices,
  };
};

export default useShowSelectedServiceInfo;
