import React from 'react';
// Import styling
import s from './LoadingView.module.scss';

function LoadingView() {
  const loadingText = 'Getting the latest disruptions';

  return (
    <div className={`wmnds-p-t-xl wmnds-p-b-xl ${s.loadingWrapper}`}>
      {/* <!-- large sized loader --> */}
      <div className="wmnds-loader" role="alert" aria-live="assertive">
        <p className="wmnds-loader__content">{loadingText}</p>
      </div>
      <br />
      <h3>{loadingText}</h3>
    </div>
  );
}

export default LoadingView;
