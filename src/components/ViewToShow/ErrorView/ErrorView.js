import React, { useState, useEffect } from 'react';

function ErrorPage() {
  const [timeLeft, setTimeLeft] = useState(60); // set timeleft state
  useEffect(() => {
    // Set an interval to run every one second
    const countDown = setInterval(() => {
      setTimeLeft((seconds) => seconds - 1); // Minus 1 second on timeleft
    }, 1000);

    if (timeLeft === 0) window.location.reload(false); // If 0 time left then refresh page

    return () => clearInterval(countDown); // On unmount clear interval
  }, [timeLeft]);

  return (
    <div className="wmnds-container wmnds-p-t-md wmnds-p-b-md">
      <div className="wmnds-col-1 wmnds-col-md-3-4 wmnds-col-lg-1-2">
        {/* Error message */}
        <h3>Sorry, there is a problem with this service</h3>
        <p>
          This page will refresh in <strong>{timeLeft}</strong> seconds or you can try again later.
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
