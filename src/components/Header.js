import React from 'react';
import PropTypes from 'prop-types';

const formatCurrency = (value) => {
  if (!value) {
    return 'N/A';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

const Header = ({ currentTheme, toggleTheme, stats, featuredTypes }) => {
  return (
    <header className="header" role="banner">
      <div className="header-noise" aria-hidden="true" />
      <div className="container header-shell">
        <div className="topbar reveal rise-1">
          <a href="#main-content" className="brand-lockup" aria-label="Bounty Bricks home">
            <span className="brand-kicker">Threat archive</span>
            <span className="brand-name">Bounty Bricks</span>
          </a>
          <div className="topbar-actions">
            <a href="#bugs-heading" className="topbar-link">Browse collection</a>
            <button
              className="theme-toggle"
              type="button"
              aria-label="Toggle between light and dark theme"
              title="Switch theme"
              onClick={toggleTheme}
            >
              <span className="theme-toggle-label">{currentTheme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
            </button>
          </div>
        </div>

        <div className="hero-grid">
          <section className="hero-copy reveal rise-2" aria-labelledby="main-heading">
            <div className="eyebrow">Curated playbooks for bug bounty operators</div>
            <h1 className="title" id="main-heading">
              Study real bug bounty reports faster.
            </h1>
            <p className="subtitle">
              Search proven findings, compare signal, and open concise exploit briefings without the clutter.
            </p>
            <div className="hero-actions">
              <a href="#search-heading" className="btn btn--primary">Start filtering</a>
              <a href="#bugs-heading" className="btn btn--ghost">Inspect reports</a>
            </div>
            <div className="stat-strip" role="list" aria-label="Platform highlights">
              <div className="stat-chip reveal rise-3" role="listitem">
                <span className="stat-label">Reports</span>
                <strong>{stats.totalReports}</strong>
              </div>
              <div className="stat-chip reveal rise-4" role="listitem">
                <span className="stat-label">High signal</span>
                <strong>{stats.highSignalCount}</strong>
              </div>
              <div className="stat-chip reveal rise-5" role="listitem">
                <span className="stat-label">Max bounty</span>
                <strong>{formatCurrency(stats.topBounty)}</strong>
              </div>
            </div>
          </section>

          <aside className="hero-panel reveal rise-3" aria-label="Threat briefing">
            <div className="panel-header">
              <span className="panel-kicker">Mission briefing</span>
              <span className="panel-status">Live archive</span>
            </div>
            <div className="panel-metric-grid">
              <div className="panel-metric">
                <span>Tracked organizations</span>
                <strong>{stats.companyCount}</strong>
              </div>
              <div className="panel-metric">
                <span>Indexed categories</span>
                <strong>{stats.categoryTypeCount}</strong>
              </div>
            </div>
            <div className="panel-divider" />
            <div className="featured-type-list">
              {featuredTypes.map((item) => (
                <div key={item.type} className="featured-type-row">
                  <span>{item.type}</span>
                  <strong>{item.count}</strong>
                </div>
              ))}
            </div>
            <p className="panel-footnote">
              Focus by category, then open the modal for method, context, and lessons learned.
            </p>
          </aside>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  currentTheme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  stats: PropTypes.shape({
    totalReports: PropTypes.number.isRequired,
    highSignalCount: PropTypes.number.isRequired,
    companyCount: PropTypes.number.isRequired,
    categoryTypeCount: PropTypes.number.isRequired,
    topBounty: PropTypes.number.isRequired
  }).isRequired,
  featuredTypes: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Header;
