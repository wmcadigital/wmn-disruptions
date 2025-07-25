import React, { useState } from 'react';
// External components
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
// Components
import PropTypes from 'prop-types';
import Button from 'components/shared/Button/Button';
// Import styles
import s from '../DisruptionInfo.module.scss';
import shareBtns from './ShareButtons.module.scss';

function ShareButtons({ isMapVisible, disruption }) {
  const [showShareBtns, setShowShareBtns] = useState(false);

  return (
    <div className={`wmnds-col-1 ${isMapVisible ? s.mapBtn : `${s.listBtn} wmnds-col-sm-1-2`}`}>
      <Button
        btnClass={`wmnds-col-1 ${showShareBtns ? 'wmnds-is--active' : ''}`}
        text="Share disruption"
        ariaLabel={`Share disruption at ${disruption.title}`}
        iconRight="general-share"
        onClick={() => setShowShareBtns(!showShareBtns)}
      />
      {/* Toggle active class to wrapper when share button (above) is toggled */}
      <div className={`${shareBtns.wrapper} ${showShareBtns ? `${shareBtns.active}` : ''}`}>
        <EmailShareButton
          resetButtonStyle={false}
          className="wmnds-m-r-md wmnds-m-b-md"
          subject="Shared from tfwm.org.uk"
          url={window.location.href}
        >
          <EmailIcon size={45} />
        </EmailShareButton>

        <FacebookShareButton
          resetButtonStyle={false}
          className="wmnds-m-r-md wmnds-m-b-sm"
          url={window.location.href}
          hashtag="#TfWMDisruption"
        >
          <FacebookIcon size={45} />
        </FacebookShareButton>

        <FacebookMessengerShareButton
          resetButtonStyle={false}
          className="wmnds-m-r-md wmnds-m-b-sm"
          url={window.location.href}
        >
          <FacebookMessengerIcon size={45} />
        </FacebookMessengerShareButton>

        <TwitterShareButton
          resetButtonStyle={false}
          className="wmnds-m-r-md wmnds-m-b-sm"
          url={`\n${window.location.href}\n\n`}
          title={`TransportForWM - Disruption: ${disruption.title} at ${disruption.subtitle} \n`}
          hashtags={['TfWMDisruption ']}
          via="TransportForWM"
          related={['TransportForWM']}
        >
          <TwitterIcon size={45} />
        </TwitterShareButton>

        <WhatsappShareButton resetButtonStyle={false} url={window.location.href}>
          <WhatsappIcon size={45} />
        </WhatsappShareButton>
      </div>
    </div>
  );
}

ShareButtons.propTypes = {
  disruption: PropTypes.oneOfType([PropTypes.object]).isRequired,
  isMapVisible: PropTypes.bool.isRequired,
};

export default ShareButtons;
