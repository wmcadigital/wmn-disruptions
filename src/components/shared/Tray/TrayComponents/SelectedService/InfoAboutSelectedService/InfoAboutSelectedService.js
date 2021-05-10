import React, { useContext } from 'react';
import { ModeContext } from 'globalState';
// Import info about selected services
import TramInfoAboutSelectedService from './TramInfoAboutSelectedService/TramInfoAboutSelectedService';
import TrainInfoAboutSelectedService from './TrainInfoAboutSelectedService/TrainInfoAboutSelectedService';
import BusInfoAboutSelectedService from './BusInfoAboutSelectedService/BusInfoAboutSelectedService';
// import RoadsInfoAboutSelectedService from './RoadsInfoAboutSelectedService/RoadsInfoAboutSelectedService';

const InfoAboutSelectedService = () => {
  const [modeState] = useContext(ModeContext);

  // Check which mode to show
  const infoAboutSelectedServiceToShow = () => {
    switch (modeState.mode) {
      case 'train':
        return <TrainInfoAboutSelectedService />;

      case 'tram':
        return <TramInfoAboutSelectedService />;

      case 'bus':
        return <BusInfoAboutSelectedService />;

      // case 'roads':
      //   return <RoadsInfoAboutSelectedService />;

      default:
        return <div />;
    }
  };

  return <div className="wmnds-col-1">{infoAboutSelectedServiceToShow()}</div>;
};

export default InfoAboutSelectedService;
