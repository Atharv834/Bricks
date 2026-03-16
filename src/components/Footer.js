import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ handleFilter, featuredTypes, totalCount }) => {
  const handleCategoryClick = (event, filter) => {
    event.preventDefault();
    handleFilter(filter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-shell">
        <div className="footer-brand-block">
          <span className="section-kicker">Bounty Bricks</span>
          <h3 className="footer-title">A cleaner interface for turning report archives into working reconnaissance notes.</h3>
          <p className="footer-desc">
            Built for operators who want signal fast: payout context, technique recall, and a layout that keeps the next useful insight within reach.
          </p>
        </div>

        <div className="footer-grid">
          <div className="footer-section">
            <h4 className="footer-subtitle">Jump points</h4>
            <ul className="footer-links">
              <li><a href="#main-heading" className="footer-link">Overview</a></li>
              <li><a href="#search-heading" className="footer-link">Search console</a></li>
              <li><a href="#bugs-heading" className="footer-link">Report archive</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Popular filters</h4>
            <ul className="footer-links">
              {featuredTypes.map((item) => (
                <li key={item.type}>
                  <a
                    href="#search-heading"
                    className="footer-link footer-filter-link"
                    onClick={(event) => handleCategoryClick(event, item.type)}
                  >
                    <span>{item.type}</span>
                    <strong>{item.count}</strong>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Collection status</h4>
            <div className="footer-status-card">
              <span>Total indexed reports</span>
              <strong>{totalCount}</strong>
            </div>
            <p className="footer-note">
              This interface is tuned for study and rapid scanning, so the data stays front-and-center without noisy visual clutter.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  featuredTypes: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    })
  ).isRequired,
  totalCount: PropTypes.number.isRequired
};

export default Footer;
