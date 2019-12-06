import React, { Component } from 'react';
import axios from 'axios';
import SingleBus from './SingleBus';

class NewBusses extends Component {

       constructor() {
        super();
        this.state = {
            busData: []
        };
    }

    async componentDidMount() {        
          const res = await axios.get('https://raw.githubusercontent.com/wmcadigital/wmn-disruptions/master/public/newBusData.json');

          console.log(`New Bus Data`, res.data);     

          this.setState({
              busData: []
          })
    }    



    render() {
        return (
            <div>
                <SingleBus />
            </div>
        )
    }
}

export default NewBusses;
