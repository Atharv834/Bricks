import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ currentTheme, toggleTheme }) => {
  return (
    <header className="header" role="banner">
      <div className="container">
        <div className="header-top">
          <div className="header-text">
            <h1 className="title glow-text" id="main-heading">CyberSec BountyBricks</h1>
            <p className="subtitle glow-subtitle">Methodologies That Pay</p>
          </div>
          <button
            className="theme-toggle glow-hover"
            id="themeToggle"
            aria-label="Toggle between light and dark theme"
            title="Switch theme"
            onClick={toggleTheme}
          >
            <svg className="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
              <mask className="moon" id="moon-mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <circle cx="24" cy="10" r="6" fill="black" />
              </mask>
              <circle className="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
              <g className="sun-beams" stroke="currentColor">
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </g>
            </svg>
          </button>
        </div>

        <div className="about-section">
          <div className="about-content">
            <h2 className="about-title">🔐 What Makes This Platform Unique?</h2>
            <div className="about-grid">
              <div className="about-item glow-card">
                <div className="about-icon">🎯</div>
                <h3>Real Vulnerability Reports</h3>
                <p>Actual findings from top bug bounty platforms with detailed methodologies and lessons learned</p>
              </div>
              <div className="about-item glow-card">
                <div className="about-icon">🧠</div>
                <h3>Educational Insights</h3>
                <p>Each vulnerability includes "When to Use" and "Lesson Learned" sections for practical application</p>
              </div>
              <div className="about-item glow-card">
                <div className="about-icon">💎</div>
                <h3>Professional Documentation</h3>
                <p>Curated collection of high-value findings with bounty amounts and company information</p>
              </div>
              <div className="about-item glow-card">
                <div className="about-icon">🚀</div>
                <h3>Advanced Filtering</h3>
                <p>Sophisticated search and filter system to find exactly what you need for your testing scenarios</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  currentTheme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default Header;
