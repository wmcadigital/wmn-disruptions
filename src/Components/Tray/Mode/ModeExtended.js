import React, { Component } from 'react';

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
        }
    }


    busButton() {
        console.log('Bus Button Was Pressed');
        this.setState((prevState) => {
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
        this.setState((prevState) => {
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
        this.setState((prevState) => {
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
        this.setState((prevState) => {
            return {
                isHiddenRoad: !prevState.isHiddenRoad,
                isHiddenBus: false,
                isHiddenTrain: false,
                isHiddenTram: false
            };
        });
    }


    render() {
        return (
            <div>   
                <h5>Mode Extended</h5>

                <button onClick={this.busButton}>Bus</button>
                <button onClick={this.trainButton}>Train</button>
                <button onClick={this.tramButton}>Tram</button>
                <button onClick={this.roadButton}>Roads</button>
                




                {this.state.isHiddenBus && (
                    <div>
                        <h6>You can show Bus Data Now....</h6>
                    </div>
                )}

                {this.state.isHiddenTrain && (
                    <div>
                        <h6>You can show Train Data Now....</h6>
                    </div>
                )}

                {this.state.isHiddenTram && (
                    <div>
                        <h6>You can show Tram Data Now....</h6>
                    </div>
                )}

                {this.state.isHiddenRoad && (
                    <div>
                        <h6>You roads dsedede....</h6>
                    </div>
                )}
                
                
            </div>
        )
    }
}

export default ModeExtended
