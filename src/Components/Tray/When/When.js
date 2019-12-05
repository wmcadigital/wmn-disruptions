import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

class When extends Component {
    render() {



            

        return (
            <div>
       <Moment />
            
                <button >Now Current Time </button>                
                <button>Tomorrow</button>                
                <button>Choose Date</button>                
            </div>
        )
    }
}

export default When
