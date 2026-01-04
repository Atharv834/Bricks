import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ handleFilter }) => {
  const handleCategoryClick = (e) => {
    e.preventDefault();
    const filter = e.target.getAttribute('data-filter');
    if (filter) {
      handleFilter(filter);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">🔐 CyberSec Hub</h3>
            <p className="footer-desc">Elite vulnerability documentation platform for cybersecurity professionals and bug bounty hunters.</p>
            <div className="footer-features">
              <span className="feature-tag">📚 Educational</span>
              <span className="feature-tag">🎯 Professional</span>
              <span className="feature-tag">🚀 Advanced</span>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#main-content" className="footer-link">🏠 Home</a></li>
              <li><a href="#search-heading" className="footer-link">🔍 Search</a></li>
              <li><a href="#bugs-heading" className="footer-link">🎯 Vulnerabilities</a></li>
              <li><a href="#about" className="footer-link">ℹ️ About</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Categories</h4>
            <ul className="footer-links" onClick={handleCategoryClick}>
              <li><button type="button" className="footer-link" data-filter="Authentication">🔐 Authentication</button></li>
              <li><button type="button" className="footer-link" data-filter="Injection">💉 Injection</button></li>
              <li><button type="button" className="footer-link" data-filter="XSS">🔥 XSS</button></li>
              <li><button type="button" className="footer-link" data-filter="Critical">🚨 Critical</button></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Stay Updated</h4>
            <p className="newsletter-desc">Get notified about new vulnerabilities and methodologies</p>
            <form className="newsletter-form" id="newsletterForm" onSubmit={(e) => e.preventDefault()}>
              <input type="email" className="newsletter-input" placeholder="your@email.com" required />
              <button type="submit" className="newsletter-btn">📧 Subscribe</button>
            </form>
            <div className="social-links">
              <button type="button" className="social-link" aria-label="Twitter">🐦</button>
              <button type="button" className="social-link" aria-label="GitHub">🐙</button>
              <button type="button" className="social-link" aria-label="LinkedIn">💼</button>
              <button type="button" className="social-link" aria-label="Discord">💬</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-legal">
              <p>&copy; 2024 CyberSec Bug Bounty Hub. All rights reserved.</p>
              <div className="legal-links">
                <button type="button" className="legal-link">Privacy Policy</button>
                <button type="button" className="legal-link">Terms of Service</button>
                <button type="button" className="legal-link">Cookie Policy</button>
              </div>
            </div>
            <div className="footer-attribution">
              <p className="made-by">
                Made by <span className="creator-name">lordofheaven</span> with
                <span className="heart-container">
                  <span className="heart" aria-label="love">🩷</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};

export default Footer;
