import React from 'react';
import './MainHeader.scss';

function MainHeader(){
        return (
            <div>
                <header className="wmnds-header wmnds-grid">

                    <div className="wmnds-header__vertical-align wmnds-col-1 wmnds-col-md-1-3">
                        <a className="wmnds-header__logo-link" href="/" title="West Midlands Network Design System">
                            <img className="wmnds-header__logo" alt="West Midlands Network" src="https://wmnetwork.netlify.com/img/logo.svg" />
                        </a>
                        <a href="/" title="West Midlands Network Design System Alpha" className="wmnds-phase-indicator">
                            Alpha
    </a>
                    </div>


                    <nav className="wmnds-header__vertical-align wmnds-col-1 wmnds-col-md-2-3">
                        <ul className="wmnds-header__links">

                            <li className="wmnds-header__link">
                                <a href="/journey/" title="Styles page" target="_self" className="wmnds-link" >
                                    Plan a journey
        </a>
                            </li>

                            <li className="wmnds-header__link">
                                <a href="/tickets/" title="Components page" target="_self" className="wmnds-link" >
                                    Tickets
        </a>
                            </li>

                            <li classNameName="wmnds-header__link">
                                <a href="/help/" title="Patterns page" target="_self" className="wmnds-link" >
                                    Help        </a>
                            </li>

                        </ul>
                    </nav>
                </header>
            </div>
        )
}

export default MainHeader
