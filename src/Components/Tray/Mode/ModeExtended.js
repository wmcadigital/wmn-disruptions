import React, { Component } from 'react';

/*
Importing Modes of travel
*/
import Bus from '../Bus/Bus';
import Tram from '../Tram/Tram';
import Train from '../Train/Train';

// Import Styles
import Button from '../../Button/Button';

class ModeExtended extends Component {
  constructor() {
    super();

    this.busButton = this.busButton.bind(this);
    this.trainButton = this.trainButton.bind(this);
    this.tramButton = this.tramButton.bind(this);
    this.roadButton = this.roadButton.bind(this);

    this.state = {
      isHiddenBus: false,
      isHiddenTrain: false,
      isHiddenTram: false,
      isHiddenRoad: false
    };
  }

  busButton() {
    this.setState(prevState => {
      return {
        isHiddenBus: !prevState.isHiddenBus,
        isHiddenTram: false,
        isHiddenTrain: false,
        isHiddenRoad: false
      };
    });
  }

  trainButton() {
    this.setState(prevState => {
      return {
        isHiddenTrain: !prevState.isHiddenTrain,
        isHiddenBus: false,
        isHiddenTram: false,
        isHiddenRoad: false
      };
    });
  }

  tramButton() {
    this.setState(prevState => {
      return {
        isHiddenTram: !prevState.isHiddenTram,
        isHiddenTrain: false,
        isHiddenBus: false,
        isHiddenRoad: false
      };
    });
  }

  roadButton() {
    this.setState(prevState => {
      return {
        isHiddenRoad: !prevState.isHiddenRoad,
        isHiddenBus: false,
        isHiddenTrain: false,
        isHiddenTram: false
      };
    });
  }

  render() {
    const { state } = this;

    return (
      <>
        <div className="wmnds-grid wmnds-grid--justify-between">
          <div className="wmnds-col-1">
            <h5>Select a mode of travel</h5>
          </div>
          {/* Bus mode button */}
          <Button
            btnClass="wmnds-col-auto wmnds-btn--small wmnds-btn--mode"
            onClick={this.busButton}
            iconLeft="modes-isolated-bus"
            text="Bus"
          />
          {/* Train mode button */}
          <Button
            btnClass="wmnds-col-auto wmnds-btn--small wmnds-btn--mode"
            onClick={this.trainButton}
            iconLeft="modes-isolated-rail"
            text="Train"
          />
          {/* Tram mode button */}
          <Button
            btnClass="wmnds-col-auto wmnds-btn--small wmnds-btn--mode"
            onClick={this.tramButton}
            iconLeft="modes-isolated-rail"
            text="Tram"
          />
          {/* Roads mode button */}
          <Button
            btnClass="wmnds-col-auto wmnds-btn--small wmnds-btn--mode"
            onClick={this.roadButton}
            iconLeft="modes-isolated-rail"
            text="Roads"
          />
        </div>

        {state.isHiddenBus && (
          <div>
            <Bus />
          </div>
        )}

        {state.isHiddenTrain && (
          <div>
            <Train />
          </div>
        )}
        {state.isHiddenTram && (
          <div>
            <Tram />
          </div>
        )}
        {state.isHiddenRoad && (
          <div>
            <h6>Roads Data Here</h6>
          </div>
        )}
      </>
    );
  }
}

export default ModeExtended;
