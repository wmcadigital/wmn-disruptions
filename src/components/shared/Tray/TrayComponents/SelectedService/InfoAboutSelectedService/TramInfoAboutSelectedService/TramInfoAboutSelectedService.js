import React, { useContext, useEffect } from 'react';
import { AutoCompleteContext } from 'globalState';
import axios from 'axios';
import FavBtn from 'components/shared/FavBtn/FavBtn';

const TramInfoAboutSelectedService = () => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext);
  const { selectedItem, selectedItemTo } = autoCompleteState;

  // Placeholder variables
  let currentItem;

  const bothItemsSelected = selectedItem.id && selectedItemTo.id;
  // If only one is selected then assign that to the currentItem variable
  if (!bothItemsSelected) {
    if (selectedItem.id) currentItem = selectedItem;
    if (selectedItemTo.id) currentItem = selectedItemTo;
  }

  useEffect(() => {
    // If both items are selected, the get the stops in between
    if (bothItemsSelected) {
      const source = axios.CancelToken.source(); // Set source of cancelToken
      const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env; // Destructure env vars
      // Fetch the stops between
      axios
        .get(
          `${REACT_APP_API_HOST}/Metro/v2/stopsbetween/${selectedItem.id}/${selectedItemTo.id}`,
          {
            headers: {
              'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY,
            },
            cancelToken: source.token, // Set token with API call, so we can cancel this call on unmount
          }
        )
        .then((response) => {
          // Update selectedItem.lines with inbetween lines
          // API returns the stops in the opposite order to the user's input so needs to be reversed
          const lines = response.data?.data.reverse();

          if (lines) {
            autoCompleteDispatch({
              type: 'UDPATE_SELECTED_ITEM_LINES',
              payload: lines,
            });
          }
        })
        .catch((error) => {
          if (!axios.isCancel(error)) {
            // Update error message
            // TODO: Add error message
            // eslint-disable-next-line no-console
            console.log({ error });
          }
        });
    }
  }, [autoCompleteDispatch, bothItemsSelected, selectedItem.id, selectedItemTo.id]);

  return (
    <>
      {/* Update the info depending on how many stops are selected */}
      {!bothItemsSelected ? (
        <>
          <p>
            Press star icon to save the <strong>{currentItem.stopName}</strong> stop to your
            favourites
          </p>
          <FavBtn
            id={currentItem.id}
            text={currentItem.stopName}
            title={currentItem.id}
            mode="tram"
            narrow
          />
        </>
      ) : (
        <>
          <p>
            Stops between <strong>{selectedItem.stopName}</strong> and{' '}
            <strong>{selectedItemTo.stopName}</strong>
          </p>
          <p>Press star icon to save a stop to your favourites.</p>
          {/* Loop through lines selected and show them */}
          {selectedItem.lines &&
            selectedItem.lines.map(({ atcoCode, name }) => (
              <FavBtn
                key={atcoCode}
                id={atcoCode}
                text={name}
                title={atcoCode}
                mode="tram"
                narrow
              />
            ))}
        </>
      )}
    </>
  );
};

export default TramInfoAboutSelectedService;
