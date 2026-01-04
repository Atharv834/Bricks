import React from 'react';
import PropTypes from 'prop-types';
import { sanitizeInput } from '../utils/security';

const iconMap = {
  'Authentication Bypass': '🔐',
  'Access Control': '🔐',
  'Account Takeover': '🧑‍💻',
  'Business Logic': '🧠',
  'Privilege Escalation': '📈',
  'Insecure Direct Object Reference': '🆔',
  'IDOR': '🆔',
  'SQL Injection': '🗄️',
  'Command Injection': '💉',
  'Injection': '💉',
  'Information Disclosure': '📤',
  'Sensitive Panel Exposure': '🖥️',
  'Sensitive Data Exposure / Logic Bypass': '🧪'
};

const Search = ({
  setSearchTerm,
  currentSort,
  setCurrentSort,
  bugCount,
  clearAllFilters,
  currentFilter,
  handleFilter,
  searchTerm,
  categories
}) => {
  const handleSearchChange = (e) => {
    try {
      const sanitized = sanitizeInput(e.target.value);
      setSearchTerm(sanitized);
    } catch (error) {
      console.error('Error handling search change:', error);
    }
  };

  const handleClearSearch = () => {
    try {
      setSearchTerm('');
    } catch (error) {
      console.error('Error clearing search:', error);
    }
  };

  const handleSortChange = (e) => {
    try {
      setCurrentSort(e.target.value);
    } catch (error) {
      console.error('Error handling sort change:', error);
    }
  };

  const handleFilterClick = (cat) => {
    try {
      handleFilter(cat);
    } catch (error) {
      console.error('Error handling filter:', error);
    }
  };

  const handleClearFilters = () => {
    try {
      clearAllFilters();
    } catch (error) {
      console.error('Error clearing filters:', error);
    }
  };

  return (
    <section className="search-section" aria-labelledby="search-heading">
      <h2 id="search-heading" className="sr-only">Search and Filter Vulnerabilities</h2>

      <div className="search-container">
        <label htmlFor="searchInput" className="sr-only">Search vulnerabilities</label>
        <span className="search-icon glow-icon" aria-hidden="true">🔍</span>
        <input
          type="text"
          id="searchInput"
          className="search-input form-control glow-focus"
          placeholder="Search vulnerabilities, methodologies, techniques..."
          aria-describedby="search-help"
          value={searchTerm}
          onChange={handleSearchChange}
          maxLength={500}
        />
        {searchTerm && (
          <button
            className="btn btn--sm"
            onClick={handleClearSearch}
            aria-label="Clear search"
            style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)'}}
          >
            Clear
          </button>
        )}
      </div>
      <div id="search-help" className="sr-only">Search across all vulnerability data including names, types, descriptions, and tags</div>

      <div className="controls-row">
        <div className="sort-container">
          <label htmlFor="sortSelect" className="control-label">Sort by:</label>
          <select
            id="sortSelect"
            className="form-control sort-select glow-focus"
            aria-label="Sort vulnerabilities"
            value={currentSort}
            onChange={handleSortChange}
          >
            <option value="date-desc">🕒 Newest First</option>
            <option value="date-asc">⏰ Oldest First</option>
            <option value="severity-desc">🔥 Highest Severity</option>
            <option value="severity-asc">✅ Lowest Severity</option>
            <option value="bounty-desc">💰 Highest Bounty</option>
            <option value="bounty-asc">💸 Lowest Bounty</option>
            <option value="name-asc">📝 A-Z</option>
            <option value="name-desc">📝 Z-A</option>
          </select>
        </div>

        <div className="results-counter glow-subtle" id="resultsCounter" aria-live="polite" aria-atomic="true">
          <span className="counter-icon">📊</span>
          Showing <span id="resultCount" className="count-number">{bugCount}</span> vulnerabilities
        </div>

        <button
          id="clearFilters"
          className="btn btn--secondary btn--sm glow-hover"
          aria-label="Clear all search and filter criteria"
          onClick={handleClearFilters}
        >
          🗑️ Clear All Filters
        </button>
      </div>

      <div className="filter-container" role="group" aria-labelledby="filter-heading">
        <h3 id="filter-heading" className="sr-only">Filter by category</h3>
        {categories.map(cat => {
          const active = currentFilter === cat;
          const label = cat === 'all' ? 'All' : cat;
          const icon = cat === 'all' ? '🌟' : (iconMap[cat] || '🔎');
          return (
            <button
              key={cat}
              className={`filter-btn glow-hover ${active ? 'active' : ''}`}
              data-filter={cat}
              aria-pressed={active}
              onClick={() => handleFilterClick(cat)}
            >
              {icon} {label}
            </button>
          );
        })}
      </div>
    </section>
  );
};

Search.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
  currentSort: PropTypes.string.isRequired,
  setCurrentSort: PropTypes.func.isRequired,
  bugCount: PropTypes.number.isRequired,
  clearAllFilters: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Search;