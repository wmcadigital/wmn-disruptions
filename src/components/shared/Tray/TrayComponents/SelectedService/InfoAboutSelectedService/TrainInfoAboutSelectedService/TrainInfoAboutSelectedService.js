import React, { useContext } from 'react';
import { AutoCompleteContext } from 'globalState';
import FavBtn from 'components/shared/FavBtn/FavBtn';
import numberToWord from '../helpers/numberToWord';

function TranInfoAboutSelectedService() {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { selectedItem, selectedItemTo } = autoCompleteState;

  // Placeholder vars for train lines
  let linesToCompareWith;
  let linesToShow;
  // If both selected item and selectedTo item then do logic
  if (selectedItem.lines && selectedItemTo.lines) {
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

      const infoToSave = {
        from: selectedItem.id,
        to: selectedItemTo.id,
        line,
      };

      return (
        <FavBtn key={line} id={infoToSave} text={lineName()} title={line} mode="train" narrow />
      );
    });
  }

  return (
    <>
      <p>
        {numberToWord(linesToCompareWith.length)} train line
        {linesToCompareWith.length > 1 ? 's are' : ' is'} available between{' '}
        <strong>{selectedItem.stopName}</strong> and <strong>{selectedItemTo.stopName}</strong>{' '}
        train stations.
      </p>
      <p>Select the star icon to add a line to the homepage.</p>
      {/* Loop through lines selected and show them */}
      {linesToShow}
    </>
  );
}

export default TranInfoAboutSelectedService;
