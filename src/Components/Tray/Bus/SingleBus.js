import React, { Component } from 'react';

class SingleBus extends Component {

    //This is the fake API data that I am using.
    state = {
        bus: [
    {
        "id": "56262",
        "mode": "bus",
        "operatorCode": "CLA",
        "operatorName": "Claribel Coaches",
        "routeDesc": "Sutton Cold field to Erdington",
        "serviceNumber": "162",
        "direction": "inbound",
        "currentlyDisrupted": true,
            "servicesAffected": {
                "disruptionStart": "2019-10-23T15:30:59",
                "disruptionEnd": "2019-10-25T16:00:00",
                "disruptionSeverity": "Major",
                "disruptionTitle": "More works at Broad Street, Wolvehampton City Centre",
                "disruptionDescription": "<strong>Wednesday 23rd October</strong><br /><strong>09.30 - 15.30&nbsp;</strong><br /><br />Ivyhouse Lane             will be closed at the junction of Birmingham New Road for resurfacing works.<br /><br /> <strong>NXWM Wolverhampton 81</strong>",
                "disruptionLatLng": [
                    52.4785592,
                    -1.8909537
                ]
            }
    },
    {
        "id": "562362",
        "mode": "bus",
        "operatorCode": "CLA",
        "operatorName": "Claribel Busses",
        "routeDesc": "Sutton Coldfield to New Street",
        "serviceNumber": "167",
        "direction": "outbound",
        "currentlyDisrupted": true,
        "servicesAffected": {
            "disruptionStart": "2019-10-23T15:30:59",
            "disruptionEnd": "2019-10-25T16:00:00",
            "disruptionSeverity": "Major",
            "disruptionTitle": "Resurfacing works at Main Street, Birmingham City Centre",
            "disruptionDescription": "<strong>Wednesday 23rd October</strong><br /><strong>09.30 - 15.30&nbsp;</strong><br /><br />Ivyhouse Lane             will be closed at the junction of Birmingham New Road for resurfacing works.<br /><br /> <strong>NXWM Wolverhampton 81</strong>",
            "disruptionLatLng": [
                52.4785592,
                -1.8909537
            ]
        }
    },
    {
        "id": "56236322322",
        "mode": "bus",
        "operatorCode": "CLA",
        "operatorName": "Johns Busses",
        "routeDesc": "UpTown to New Street",
        "serviceNumber": "169",
        "direction": "outbound",
        "currentlyDisrupted": false
    },
    {
        "id": "5620987362",
        "mode": "bus",
        "operatorCode": "CLA",
        "operatorName": "Pete Waterman Busses",
        "routeDesc": "Colville to Really Old Street",
        "serviceNumber": "101",
        "direction": "outbound",
        "currentlyDisrupted": false
    }
]
    }

    render() {
        return (   
            //Using .map to go through each of the distruptions.
            //Need to be using a truthy statment here as we only 
            //Buses that are delayed etc.
            <div>            
                {this.state.bus.map(bus => (
                    <div key={bus.id}>
                        <em>{bus.disruptionStart}</em><br />
                        <em>Service Number:{bus.serviceNumber}</em><br />
                        <em>{bus.direction}</em><br />
                        <em>{bus.routeDesc}</em><br />
                        <em>{bus.operatorCode}</em><br />
                    </div>
                ))}               
            </div>
        )
    }
}

export default SingleBus
