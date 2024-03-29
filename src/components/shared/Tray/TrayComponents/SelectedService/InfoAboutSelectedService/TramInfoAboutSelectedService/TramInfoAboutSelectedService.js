import React from 'react';
// Components
import FavBtn from 'components/shared/FavBtn/FavBtn';
import Message from 'components/shared/Message/Message';
// Local
import numberToWord from '../helpers/numberToWord';
import useGetTramStopByStop from './customHooks/useGetTramStopByStop';

function TramInfoAboutSelectedService() {
  const { autoCompleteState, loading, errorInfo, getInBetweenTramStops } = useGetTramStopByStop();
  const { selectedItem, selectedItemTo } = autoCompleteState;

  // Don't return anything until both items are selected
  if (!selectedItem.id || !selectedItemTo.id) {
    return <div />;
  }

  // Show save text for only 1 selected stop
  if (selectedItem.id === selectedItemTo.id) {
    return (
      <>
        <p>
          Select the star icon to add the <strong>{selectedItem.stopName}</strong> stop to the
          homepage
        </p>
        <FavBtn
          id={selectedItem.id}
          text={selectedItem.stopName}
          title={selectedItem.id}
          mode="tram"
          narrow
        />
      </>
    );
  }

  // Handle any errors
  if (errorInfo && !loading) {
    const { title, message } = errorInfo;
    return (
      <Message
        type="error"
        title={title}
        message={message}
        showRetry
        retryCallback={getInBetweenTramStops}
      />
    );
  }

  // Show loading spinner
  if (loading || !selectedItem.lines || (selectedItem.lines && selectedItem.lines.length === 0)) {
    return (
      <div className="wmnds-loader" role="alert" aria-live="assertive">
        <p className="wmnds-loader__content">Content is loading...</p>
      </div>
    );
  }

  // Finally show in between stops
  return (
    <>
      <p>
        {numberToWord(selectedItem.lines.length)} stop
        {selectedItem.lines.length > 1 ? 's are' : ' is'}
        available between <strong>{selectedItem.stopName}</strong> and{' '}
        <strong>{selectedItemTo.stopName}</strong>.
      </p>
      <p>Select the star icon to add a stop to the homepage.</p>
      {/* Loop through lines selected and show them */}
      {[selectedItem, selectedItemTo].map(({ id, stopName }) => (
        <FavBtn
          key={id}
          id={id}
          text={stopName || ''}
          title={`${stopName} tram stop`}
          mode="tram"
          narrow
        />
      ))}
    </>
  );
}

export default TramInfoAboutSelectedService;
