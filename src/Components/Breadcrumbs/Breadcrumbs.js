import React from 'react';

function Breadcrumbs() {
  return (
    <div>
      {/* Note to self Use router for pages */}
      <nav aria-label="Breadcrumb" className="wmnds-breadcrumb">
        <ol className="wmnds-breadcrumb__list">
          <li className="wmnds-breadcrumb__list-item">
            <a href="/" className="wmnds-breadcrumb__link">
              Home
            </a>
          </li>
          <li className="wmnds-breadcrumb__list-item">
            <a href="/Disruptions/" className="wmnds-breadcrumb__link">
              Disruptions
            </a>
          </li>
          <li className="wmnds-breadcrumb__list-item">
            <a
              href="/Disruptions/listview/"
              className="wmnds-breadcrumb__link wmnds-breadcrumb__link--current"
              aria-current="page"
            >
              List View
            </a>
          </li>
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumbs;
