import React from 'react';

const ErrorPage = () => {
  return (
    <div className="wmnds-container">
      <div className="wmnds-col-1 wmnds-col-md-3-4 wmnds-col-lg-1-2">
        {/* Error message */}
        <h3>Sorry, there is a problem with this service</h3>
        <p>Try again later.</p>
        <p>
          View a list of current disruptions on the existing{' '}
          <a
            href="https://www.wmnetwork.co.uk/plan-your-journey/disruptions/?utm_source=beta&utm_medium=errorpage&utm_campaign=disruptions"
            title="Current disruptions on the existing West Midlands Network website"
            target="_self"
            className="wmnds-link"
          >
            West Midlands Network website
          </a>
          .
        </p>

        <p>
          Contact the{' '}
          <a
            href="https://www.wmnetwork.co.uk/get-in-touch/contact-us/?utm_source=service&utm_medium=errorpage&utm_campaign=covid-dd"
            title="Customer Services Team Contact Details"
            target="_self"
            className="wmnds-link"
          >
            Customer Services team
          </a>{' '}
          if you continue to have problems.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
