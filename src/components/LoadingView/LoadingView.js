import React from 'react';

const LoadingView = () => {
  return (
    <>
      {/* <!-- large sized loader --> */}
      <div className="wmnds-loader wmnds-loader--large" role="alert" aria-live="assertive">
        <p className="wmnds-loader__content">Content is loading...</p>
      </div>
    </>
  );
};

export default LoadingView;
