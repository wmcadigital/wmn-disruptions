import React, { useContext } from 'react';
import { AutoCompleteContext, ModeContext } from 'globalState';
import FavBtn from 'components/shared/FavBtn/FavBtn';

const InfoAboutSelectedService = () => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const [modeState] = useContext(ModeContext);
  const { selectedItem, selectedItemTo } = autoCompleteState;

  let linesToCompareWith;
  if (selectedItem.lines && selectedItemTo.lines) {
    // Join the lines array of the from/to selected stations
    const allLines = selectedItem.lines.concat(selectedItemTo.lines);
    // Then get any duplicates found and pluck them out. If duplicates are found then this means the user MUST be interested in only them lines as that line was part of their from AND to station search.
    const getDuplicates = allLines.filter((item, index) => allLines.indexOf(item) !== index);
    // If duplicates exist, use them as that's what the user is interested in. Otherwise default to all lines (all will be unique)...this usually means the user has selected two stations that are on seperate lines.
    linesToCompareWith = getDuplicates.length ? getDuplicates : allLines;
    // Then filter out any disruptions that don't contain lines the user is interested in
  }

  let serviceText;
  let service;

  switch (modeState.mode) {
    case 'tram':
      serviceText = 'stop';
      service = selectedItem.stopName;
      break;

    case 'train':
      serviceText = 'line(s)';
      break;

    default:
      serviceText = 'service';
      service = selectedItem.serviceNumber.toUpperCase();
      break;
  }

  return (
    <div className="wmnds-col-1 wmnds-p-t-md">
      <hr />
      {/* Mode is not train */}
      {modeState.mode !== 'train' ? (
        <>
          <p>
            Press star icon to save {serviceText} <strong>{service}</strong> to your favourites
          </p>

          <FavBtn
            id={selectedItem.id}
            severity={selectedItem.severity}
            text={service}
            title={`${selectedItem.routeName} (${selectedItem.operator})`}
            mode={modeState.mode}
            narrow
          />
        </>
      ) : (
        // Mode is train...
        <>
          <p>
            {linesToCompareWith.length} train line(s) are available between{' '}
            <strong>{selectedItem.stopName}</strong> and <strong>{selectedItemTo.stopName}</strong>{' '}
            train stations.
          </p>
          {/* Loop through lines selected */}
          {linesToCompareWith.map((line) => (
            <FavBtn
              key={line}
              id={line}
              text={line}
              title={`${selectedItem.stopName} to ${selectedItemTo.stopName}`}
              mode={modeState.mode}
              narrow
            />
          ))}
        </>
      )}
    </div>
  );
};

export default InfoAboutSelectedService;
