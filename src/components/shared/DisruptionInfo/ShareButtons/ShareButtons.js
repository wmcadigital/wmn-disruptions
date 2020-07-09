import React, { useState } from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  LinkedinIcon,
  LinkedinShareButton,
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

const ShareButtons = ({ isMapVisible }) => {
  const [showShareBtns, setShowShareBtns] = useState(false);

  return (
    <>
      <div className={`wmnds-col-1 ${isMapVisible ? s.mapBtn : `${s.listBtn} wmnds-col-sm-1-2`}`}>
        <Button
          btnClass={`wmnds-col-1 ${showShareBtns ? 'wmnds-is--active' : ''}`}
          text="Share disruption"
          iconRight="general-share"
          onClick={() => setShowShareBtns(!showShareBtns)}
        />

        <div
          className={`wmnds-m-t-md ${shareBtns.wrapper} ${
            showShareBtns ? `${shareBtns.active}` : ''
          }`}
        >
          <div className={`${shareBtns.innerWrapper} wmnds-p-t-xs`}>
            <EmailShareButton className="wmnds-m-r-md wmnds-m-b-md">
              <EmailIcon size={45} />
            </EmailShareButton>

            <FacebookShareButton
              className="wmnds-m-r-md wmnds-m-b-sm"
              url={window.location.href}
              hashtag="#wmn-disruptions"
            >
              <FacebookIcon size={45} />
            </FacebookShareButton>

            <FacebookMessengerShareButton
              className="wmnds-m-r-md wmnds-m-b-sm"
              url={window.location.href}
              hashtag="#wmn-disruptions"
            >
              <FacebookMessengerIcon size={45} />
            </FacebookMessengerShareButton>

            <TwitterShareButton className="wmnds-m-r-md wmnds-m-b-sm" url={window.location.href}>
              <TwitterIcon size={45} />
            </TwitterShareButton>

            {/* <LinkedinShareButton className="wmnds-m-r-md wmnds-m-b-md" url={window.location.href}>
          <LinkedinIcon size={45} />
        </LinkedinShareButton> */}

            <WhatsappShareButton url={window.location.href}>
              <WhatsappIcon size={45} />
            </WhatsappShareButton>
          </div>
        </div>
      </div>
    </>
  );
};

ShareButtons.propTypes = {
  isMapVisible: PropTypes.bool.isRequired,
};

export default ShareButtons;
