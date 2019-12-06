import React, { Component } from 'react';

class BusInfo extends Component {
    constructor() {
        super();
        this.state = {
            busData: []
        };
    }

    componentDidMount() {
        const url = 'https://raw.githubusercontent.com/wmcadigital/wmn-disruptions/master/public/newBusData.json';
        fetch(url)
            .then(response => response.json())
            .then(results => {
                const busRoutes = results.map(item => {
                    return item;
                });
                this.setState({
                    busData: busRoutes
                });
            });
        console.log(url);
    }

    render() {
        const listItems = this.state.busData.map(item => (
            <div key={item.id}>
                Train:{item.operatorName}<br />
                Train:{item.routeDesc}<br />
                Train:{item.serviceNumber} <br />
                Train:{item.direction} <br />
            </div>
        ));

        return (
            <div className="train-info">
                <h2>Train Information</h2>
                {listItems}
            </div>
        )
    }
}


export default BusInfo;