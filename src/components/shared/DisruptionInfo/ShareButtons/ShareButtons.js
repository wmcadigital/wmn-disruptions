import React from 'react';
// External Components
import {
  EmailIcon,
  EmailShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  WorkplaceShareButton,
  TwitterIcon,
  FacebookIcon,
} from 'react-share';
// Components
import PropTypes from 'prop-types';
import Button from 'components/shared/Button/Button';
// Import styles
import s from '../DisruptionInfo.module.scss';

const ShareButtons = ({ isMapVisible }) => {
  return (
    <>
      <span className={`wmnds-col-1 ${isMapVisible ? s.mapBtn : `${s.listBtn} wmnds-col-sm-1-2`}`}>
        <Button btnClass="wmnds-col-1" text="Share disruption" iconRight="general-share" />
      </span>
      <br />
      <EmailShareButton className="wmnds-m-r-sm">
        <EmailIcon size={45} />
      </EmailShareButton>

      <FacebookShareButton
        className="wmnds-m-r-sm"
        url={window.location.href}
        hashtag="#wmn-disruptions"
      >
        <FacebookIcon size={45} />
      </FacebookShareButton>

      <FacebookMessengerShareButton
        className="wmnds-m-r-sm"
        url={window.location.href}
        hashtag="#wmn-disruptions"
      >
        <FacebookMessengerIcon size={45} />
      </FacebookMessengerShareButton>

      <TwitterShareButton className="wmnds-m-r-sm" url={window.location.href}>
        <TwitterIcon size={45} />
      </TwitterShareButton>

      <WhatsappShareButton className="wmnds-m-r-sm" url={window.location.href}>
        <WhatsappIcon size={45} />
      </WhatsappShareButton>
    </>
  );
};

ShareButtons.propTypes = {
  isMapVisible: PropTypes.bool.isRequired,
};

export default ShareButtons;
