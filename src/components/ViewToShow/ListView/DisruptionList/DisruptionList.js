/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
// Import contexts
import useFilterLogic from 'customHooks/useFilterLogic';
import GoodServiceMessage from 'components/shared/Tray/TrayComponents/SelectedService/GoodServiceMessage/GoodServiceMessage';
import DisruptionItem from './DisruptionItem/DisruptionItem';

const DisruptionList = () => {
  const filteredData = useFilterLogic(); // Use filter logic based on tray selections
  const disruptionsTotal = filteredData.length;

  const increment = 50;
  const [disruptionsShowing, setDisruptionsShowing] = useState(increment);
  const amountLeftToShow = Math.min(increment, disruptionsTotal - increment);

  const showMoreDisruptions = () => {
    setDisruptionsShowing((prevAmount) => Math.min(prevAmount + increment));
  };

  useEffect(() => {
    setDisruptionsShowing(increment);
  }, [disruptionsTotal]);

  return disruptionsTotal > 1 ? (
    <>
      {filteredData.slice(0, disruptionsShowing).map((disruption) => (
        <DisruptionItem disruption={disruption} key={disruption.id} />
      ))}
      {disruptionsTotal > disruptionsShowing && (
        <button
          className="wmnds-btn wmnds-btn--primary"
          type="button"
          onClick={showMoreDisruptions}
        >
          Show {amountLeftToShow} more disruptions
        </button>
      )}
    </>
  ) : (
    <GoodServiceMessage isListView />
  );
};

export default DisruptionList;
