import React from 'react';
import PropTypes from 'prop-types';

const Search = ({
  setSearchTerm,
  currentSort,
  setCurrentSort,
  bugCount,
  totalCount,
  clearAllFilters,
  currentFilter,
  handleFilter,
  searchTerm,
  categories
}) => {
  const activeCategory = categories.find((category) => category.id === currentFilter);

  return (
    <section className="search-section" aria-labelledby="search-heading">
      <div className="search-shell">
        <div className="search-heading-block">
          <span className="section-kicker">Signal console</span>
          <h2 id="search-heading" className="search-heading">Search, sort, and isolate the reports worth studying next.</h2>
          <p className="search-copy">
            Combine keyword search with category filters to surface patterns across authentication flaws, business logic breaks, infrastructure leaks, and payout-heavy findings.
          </p>
        </div>

        <div className="search-layout">
          <div className="search-primary">
            <label htmlFor="searchInput" className="field-label">Keyword search</label>
            <div className="search-input-wrap">
              <span className="search-icon" aria-hidden="true">/</span>
              <input
                type="text"
                id="searchInput"
                className="search-input form-control"
                placeholder="Search reports, methods, vendors, or tags"
                aria-describedby="search-help"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              {searchTerm ? (
                <button className="search-clear" type="button" onClick={() => setSearchTerm('')}>
                  Reset
                </button>
              ) : null}
            </div>
            <div id="search-help" className="assistive-copy">
              Search across report titles, methods, lessons learned, companies, and tags.
            </div>
          </div>

          <div className="search-secondary">
            <div className="sort-block">
              <label htmlFor="sortSelect" className="field-label">Sort order</label>
              <select
                id="sortSelect"
                className="form-control sort-select"
                aria-label="Sort vulnerabilities"
                value={currentSort}
                onChange={(event) => setCurrentSort(event.target.value)}
              >
                <option value="date-desc">Newest first</option>
                <option value="date-asc">Oldest first</option>
                <option value="severity-desc">Highest severity</option>
                <option value="severity-asc">Lowest severity</option>
                <option value="bounty-desc">Highest bounty</option>
                <option value="bounty-asc">Lowest bounty</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
              </select>
            </div>

            <div className="results-card" aria-live="polite" aria-atomic="true">
              <span className="results-label">Visible reports</span>
              <strong>{bugCount}</strong>
              <span className="results-meta">of {totalCount} indexed entries</span>
              <span className="results-filter">{activeCategory ? activeCategory.label : 'All reports'}</span>
            </div>

            <button
              className="btn btn--secondary utility-button"
              type="button"
              aria-label="Clear all search and filter criteria"
              onClick={clearAllFilters}
            >
              Clear filters
            </button>
          </div>
        </div>

        <div className="filter-cluster" role="group" aria-labelledby="filter-heading">
          <div className="filter-cluster-header">
            <h3 id="filter-heading">Categories</h3>
            <span>Tap a type to pivot the archive</span>
          </div>
          <div className="filter-container">
            {categories.map((category) => {
              const active = currentFilter === category.id;

              return (
                <button
                  key={category.id}
                  className={`filter-btn ${active ? 'active' : ''}`}
                  type="button"
                  aria-pressed={active}
                  onClick={() => handleFilter(category.id)}
                >
                  <span>{category.label}</span>
                  <strong>{category.count}</strong>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

Search.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
  currentSort: PropTypes.string.isRequired,
  setCurrentSort: PropTypes.func.isRequired,
  bugCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  clearAllFilters: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Search;
