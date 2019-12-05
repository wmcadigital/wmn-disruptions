import React, { Component } from 'react'

class Mode extends Component {
    render() {
        return (
            <div>
                <button className="wmnds-btn wmnds-btn--secondary ">Bus</button>
                <button className="wmnds-btn wmnds-btn--secondary ">Train</button>
                <button className="wmnds-btn wmnds-btn--secondary ">Trams</button>
                <button className="wmnds-btn wmnds-btn--secondary ">Roads</button>
            </div>
        )
    }
}

export default Mode
