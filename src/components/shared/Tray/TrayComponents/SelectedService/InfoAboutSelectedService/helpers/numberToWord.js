const numberToWord = (number) => {
  // writtenNumbers long enough to fit all tram stops on
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
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
    'Twenty',
    'Twenty-one',
    'Twenty-two',
    'Twenty-three',
    'Twenty-four',
    'Twenty-five',
    'Twenty-six',
    'Twenty-seven',
    'Twenty-eight',
    'Twenty-nine',
    'Thirty',
    'Thirty-one',
    'Thrity-two',
    'Thrity-three',
    'Thrity-four',
    'Thrity-five',
    'Thrity-six',
    'Thrity-seven',
  ];

  return writtenNumbers[number];
};

export default numberToWord;
