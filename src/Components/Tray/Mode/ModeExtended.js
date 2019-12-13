import React, { Component } from 'react';

/*
Importing Modes of travel
*/
import Bus from '../Bus/Bus';

// Import Styles
import './mode.scss';

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
      <div>
        <div className="pure-g gutters">
          <div className="modeBtns">
            {/* Icons still not coming through! 
            
              Will leave this here for now.
            
          <button type="button" className="wmnds-btn wmnds-btn--secondary">
              Secondary icon button
              <svg className="wmnds-btn__icon wmnds-btn__icon--right">
                <use
                  xlinkHref="https://wmnetwork.netlify.com/img/svg-sprite.min.svg#wmnds-general-chevron-right"
                  href="https://wmnetwork.netlify.com/img/svg-sprite.min.svg#wmnds-general-chevron-right"
                />
              </svg>
            </button>

              */}

            <button className="wmnds-btn wmnds-btn--secondary" onClick={this.busButton} type="button">
              Bus
            </button>
            <button className="wmnds-btn wmnds-btn--secondary" onClick={this.trainButton} type="button">
              Train
            </button>
            <button className="wmnds-btn wmnds-btn--secondary" onClick={this.tramButton} type="button">
              Tram
            </button>
            <button className="wmnds-btn wmnds-btn--secondary" onClick={this.roadButton} type="button">
              Roads
            </button>
          </div>
        </div>

        {state.isHiddenBus && (
          <div>
            <Bus />
          </div>
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
