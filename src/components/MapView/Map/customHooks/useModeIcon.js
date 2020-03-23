// // bus icons
// import busMinor from 'assets/map-icons/bus-minor.png';
// import busMajor from 'assets/map-icons/bus-major.png';
// import busSevere from 'assets/map-icons/bus-severe.png';
// // tram icons
// import tramMinor from 'assets/map-icons/tram-minor.png';
// import tramMajor from 'assets/map-icons/tram-major.png';
// import tramSevere from 'assets/map-icons/tram-severe.png';
// // train icons
// import trainMinor from 'assets/map-icons/train-minor.png';
// import trainMajor from 'assets/map-icons/train-major.png';
// import trainSevere from 'assets/map-icons/train-severe.png';
// // roads icons
// import roadsMinor from 'assets/map-icons/roads-minor.png';
// import roadsMajor from 'assets/map-icons/roads-major.png';
// import roadsSevere from 'assets/map-icons/roads-severe.png';

const modeIcon = (mode, _severity) => {
  let severity;
  switch (_severity) {
    // Major disruption (high)
    case 'high':
      severity = 'major';
      break;
    // Severe disruption (veryHigh)
    case 'veryHigh':
    case 'Major':
      severity = 'severe';
      break;
    // Minor disruption (normal)
    default:
      severity = 'minor';
      break;
  }

  // Return the correct icon back (icon variations are commented above)
  return import(`assets/map-icons/${mode}-${severity}.png`).then((image) => {
    return image.default;
  });
};

export default modeIcon;
