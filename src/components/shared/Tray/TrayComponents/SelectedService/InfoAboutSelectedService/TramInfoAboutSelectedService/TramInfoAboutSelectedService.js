import React, { useContext, useEffect, useState } from 'react';
import { AutoCompleteContext } from 'globalState';
import axios from 'axios';
// Components
import FavBtn from 'components/shared/FavBtn/FavBtn';
import Message from 'components/shared/Message/Message';
// Local
import numberToWord from '../helpers/numberToWord';

const TramInfoAboutSelectedService = () => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext);
  const { selectedItem, selectedItemTo } = autoCompleteState;
  const [state, setState] = useState({
    loading: false,
    error: false,
  });

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
      setState({ loading: true, error: false });
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
          // to match the user's input
          const lines = response.data?.data;
          setState({ loading: false, error: false });
          if (lines) {
            autoCompleteDispatch({
              type: 'UDPATE_SELECTED_ITEM_LINES',
              // API returns the stops in a certain direction so we check the first element to see if it must be reversed
              payload: lines[0].atcoCode === selectedItem.id ? lines : lines.reverse(),
            });
          }
        })
        .catch((error) => {
          if (!axios.isCancel(error)) {
            // Update error message
            setState({
              loading: false,
              error: {
                title: 'Please try again',
                message: 'Apologies, we are having technical difficulties.',
              },
            });
            // eslint-disable-next-line no-console
            console.log({ error });
          }
        });
    }
  }, [autoCompleteDispatch, bothItemsSelected, selectedItem.id, selectedItemTo.id]);

  // Info to show for only one item selected
  if (!bothItemsSelected) {
    return (
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
    );
  }

  if (state.error) {
    const { error } = state;
    return <Message type="error" title={error.title} message={error.message} />;
  }

  return state.loading || !selectedItem.lines ? (
    <div className="wmnds-loader" role="alert" aria-live="assertive">
      <p className="wmnds-loader__content">Content is loading...</p>
    </div>
  ) : (
    <>
      <p>
        {numberToWord(selectedItem.lines.length)} stop{selectedItem.lines.length > 1 ? 's' : ''} are
        available between <strong>{selectedItem.stopName}</strong> and{' '}
        <strong>{selectedItemTo.stopName}</strong> stops.
      </p>
      <p>Press star icon to save a stop to your favourites.</p>
      {/* Loop through lines selected and show them */}
      {selectedItem.lines &&
        selectedItem.lines.map(({ atcoCode, name }) => (
          <FavBtn
            key={atcoCode}
            id={atcoCode}
            text={name}
            title={`${name} stop`}
            mode="tram"
            narrow
          />
        ))}
    </>
  );
};

export default TramInfoAboutSelectedService;
