import React, { Component } from 'react';

// Import Styles
import './mode.scss';
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
    console.log('Bus Button Was Pressed');
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
    console.log('Train Button Was Pressed');
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
    console.log('Tram Button Was Pressed');
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
    console.log('Whats going on the roads bob....');
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
      <div>
        <div className="pure-g gutters">
          <div className="modeBtns">
            {/* <button className="wmnds-btn wmnds-btn--secondary wmnds-btn-small" onClick={this.busButton} type="button">
              Bus
            </button> */}

            <Button btnClass="wmnds-btn--small wmnds-btn--mode" onClick={this.busButton} iconLeft="modes-isolated-bus">
              Bus
            </Button>
            <button className="wmnds-btn wmnds-btn--secondary wmnds-btn-small" onClick={this.trainButton} type="button">
              Train
            </button>
            <button className="wmnds-btn wmnds-btn--secondary wmnds-btn-small" onClick={this.tramButton} type="button">
              Tram
            </button>
            <button className="wmnds-btn wmnds-btn--secondary wmnds-btn-small" onClick={this.roadButton} type="button">
              Roads
            </button>
          </div>
        </div>
        {state.isHiddenBus && (
          <>
            <h6>You can show Bus Data Now....</h6>
          </>
        )}

        {state.isHiddenTrain && (
          <div>
            <h6>You can show Train Data Now....</h6>
          </div>
        )}

        {state.isHiddenTram && (
          <div>
            <h6>You can show Tram Data Now....</h6>
          </div>
        )}

        {state.isHiddenRoad && (
          <div>
            <h6>You roads dsedede....</h6>
          </div>
        )}
      </div>
    );
  }
}

export default ModeExtended;
