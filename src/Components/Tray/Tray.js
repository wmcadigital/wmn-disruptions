import React, { Component } from 'react';
import Mode from './Mode/Mode'; 

//Import Tray Styles
import './Tray.scss'

class Tray extends Component {
    render() {
        return (
            <div className='tray'>
                <Mode />
            </div>
        )
    }
}

export default Tray;
