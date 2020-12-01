import React, { useContext } from 'react';
import { AutoCompleteContext, ModeContext } from 'globalState';
import FavBtn from 'components/shared/FavBtn/FavBtn';

const InfoAboutSelectedService = () => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const [modeState] = useContext(ModeContext);
  const { selectedItem, selectedItemTo } = autoCompleteState;
  // These numbers will be used to convert .length into a written number
  const writtenNumbers = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
  ];

  // Placeholder vars for train lines
  let linesToCompareWith;
  let linesToShow;
  // If both selected item and selectedTo item then do logic
  if (selectedItem.lines && selectedItemTo.lines && modeState.mode === 'train') {
    // Join the lines array of the from/to selected stations
    const allLines = selectedItem.lines.concat(selectedItemTo.lines);
    // Then get any duplicates found and pluck them out. If duplicates are found then this means the user MUST be interested in only them lines as that line was part of their from AND to station search.
    const getDuplicates = allLines.filter((item, index) => allLines.indexOf(item) !== index);
    // If duplicates exist, use them as that's what the user is interested in. Otherwise default to all lines (all will be unique)...this usually means the user has selected two stations that are on separate lines.
    linesToCompareWith = getDuplicates.length ? getDuplicates : allLines;

    // Map linesToShow to each line selected and return a fav button for it
    linesToShow = linesToCompareWith.sort().map((line) => {
      // Function used to shorten long train line names
      const lineName = () => {
        switch (line) {
          case 'Coventry via Birmingham International':
            return 'Coventry Via Birmingham Intl';

          case 'Stourbridge Junction to Stourbridge Town':
            return 'Stourbridge Jct to Stourbridge Town';

          default:
            return line;
        }
      };
      return (
        <FavBtn key={line} id={line} text={lineName()} title={line} mode={modeState.mode} narrow />
      );
    });
  }

  // Placeholder vars for favourite message
  let serviceText;
  let service;
  let serviceMessage;
  // Change copy below based on mode
  switch (modeState.mode) {
    case 'tram':
      serviceText = 'stop';
      service = selectedItem.stopName;
      break;

    case 'train':
      // For trains, only set the service message
      serviceMessage =
        linesToCompareWith.length > 1 ? (
          'a train line'
        ) : (
          <>
            the <strong>{linesToCompareWith[0]}</strong> line
          </>
        );
      break;

    default:
      serviceText = 'service';
      service = selectedItem.serviceNumber.toUpperCase();
      break;
  }
  // Set serviceMessage if it hasn't already been set within the switch
  serviceMessage = serviceMessage || (
    <>
      {serviceText} <strong>{service}</strong>
    </>
  );
  // Set the full favourite message
  const favouriteMessage = <p>Press the star icon to save {serviceMessage} to your favourites.</p>;

  return (
    <div className="wmnds-col-1">
      {/* Mode is not train */}
      {modeState.mode !== 'train' ? (
        <>
          {/* Favourite message */}
          {favouriteMessage}

          <FavBtn
            id={selectedItem.id}
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
            {writtenNumbers[linesToCompareWith.length]} train line
            {linesToCompareWith.length > 1 ? 's are' : ' is'} available between{' '}
            <strong>{selectedItem.stopName}</strong> and <strong>{selectedItemTo.stopName}</strong>{' '}
            train stations.
          </p>
          {/* Favourite message */}
          {favouriteMessage}
          {/* Loop through lines selected and show them */}
          {linesToShow}
        </>
      )}
    </div>
  );
};

export default InfoAboutSelectedService;
