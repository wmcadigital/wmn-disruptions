// // bus icons
// import busMinor from 'assets/map-icons/bus-minor.jpg';
// import busMajor from 'assets/map-icons/bus-major.jpg';
// import busSevere from 'assets/map-icons/bus-severe.jpg';
// // tram icons
// import tramMinor from 'assets/map-icons/tram-minor.jpg';
// import tramMajor from 'assets/map-icons/tram-major.jpg';
// import tramSevere from 'assets/map-icons/tram-severe.jpg';
// // train icons
// import trainMinor from 'assets/map-icons/train-minor.jpg';
// import trainMajor from 'assets/map-icons/train-major.jpg';
// import trainSevere from 'assets/map-icons/train-severe.jpg';
// // roads icons
// import roadsMinor from 'assets/map-icons/roads-minor.jpg';
// import roadsMajor from 'assets/map-icons/roads-major.jpg';
// import roadsSevere from 'assets/map-icons/roads-severe.jpg';

const modeIcon = (mode, _severity, selected) => {
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
  return import(`assets/map-icons/${mode}-${severity}${selected ? '-hover' : ''}.jpg`).then(
    (image) => {
      return image.default;
    }
  );
};

export default modeIcon;
