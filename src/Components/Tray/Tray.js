import React, { Component } from 'react';
import Mode from './Mode/Mode'; 
import When from './When/When'

//Import Tray Styles
import './Tray.scss'

class Tray extends Component {
    render() {
        return (
            <div className='tray'>
                <Mode />
                <When />

                <div className="wmnds-disruption-indicator-large wmnds-disruption-indicator-large--undefined"> 
                    <div className="wmnds-disruption-indicator-large__left-wrapper"> 
                        <span className="wmnds-disruption-indicator-large__left-icon-wrapper"> 
                            <svg class="wmnds-disruption-indicator-large__icon"> 
                                <use xlinkHref="https://wmnetwork.netlify.com/img/svg-sprite.min.svg#wmnds-modes-isolated-rail" href="https://wmnetwork.netlify.com/img/svg-sprite.min.svg#wmnds-modes-isolated-rail"></use> </svg> 
                                Train </span> 
                                <span className="wmnds-disruption-indicator-large__text"> <strong>Good service</strong><br />Cross City Line </span> </div> <svg class="wmnds-disruption-indicator-large__icon wmnds-disruption-indicator-large__icon--right"> 
                    <use xlinkHref="https://wmnetwork.netlify.com/img/svg-sprite.min.svg#wmnds-general-success" href="https://wmnetwork.netlify.com/img/svg-sprite.min.svg#wmnds-general-success">
                                    </use> 
                                </svg> 
                                </div>
                            

            
                <span className="wmnds-disruption-indicator-small">
                    <svg className="wmnds-disruption-indicator-small__icon">
                        <use xlinkHref="https://wmnetwork.netlify.com/img/svg-sprite.min.svg#wmnds-modes-isolated-bus" href="https://wmnetwork.netlify.com/img/svg-sprite.min.svg#wmnds-modes-isolated-bus"></use>
                    </svg>
                    
                    <svg className="wmnds-disruption-indicator-small__icon">
                        <use xlinkHref="https://wmnetwork.netlify.com/img/svg-sprite.min.svg#wmnds-general-warning-circle" href="https://wmnetwork.netlify.com/img/svg-sprite.min.svg#wmnds-general-warning-circle"></use>
                    </svg>
                </span>
            


            <div class="wmnds-disruption-indicator-medium wmnds-disruption-indicator-medium--with-icon wmnds-disruption-indicator-medium--error wmnds-disruption-indicator-medium--narrow"><svg class="wmnds-disruption-indicator-medium__icon wmnds-disruption-indicator-medium__icon--left">
                    <use xlinkHref="https://wmnetwork.netlify.com/img/svg-sprite.min.svg#wmnds-modes-isolated-bus" href="https://wmnetwork.netlify.com/img/svg-sprite.min.svg#wmnds-modes-isolated-bus"></use>
                    </svg>
                    X15
            <svg class="wmnds-disruption-indicator-medium__icon wmnds-disruption-indicator-medium__icon--right" >
                        <use xlinkHref="https://wmnetwork.netlify.com/img/svg-sprite.min.svg#wmnds-general-warning-triangle" href="https://wmnetwork.netlify.com/img/svg-sprite.min.svg#wmnds-general-warning-triangle"></use>
        </svg>
        </div>


</div>



        )
    }
}

export default Tray;
