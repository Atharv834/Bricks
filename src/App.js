import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { vulnerabilities, severityOrder } from './data';
import Header from './components/Header';
import Search from './components/Search';
import VulnerabilityGrid from './components/VulnerabilityGrid';
import Footer from './components/Footer';
import Modal from './components/Modal';
import ErrorBoundary from './components/ErrorBoundary';
import { sanitizeInput, validateFilter, validateSort, safeLocalStorage } from './utils/security';

function App() {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentSort, setCurrentSort] = useState('date-desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Safely load theme from localStorage with error handling
    return safeLocalStorage.getItem('cybersec-theme', 'dark');
  });
  const [selectedBug, setSelectedBug] = useState(null);

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-color-scheme', currentTheme);
      safeLocalStorage.setItem('cybersec-theme', currentTheme);
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  }, [currentTheme]);

  const bugs = useMemo(() => {
    try {
      let filteredBugs = [...vulnerabilities];

      // Sanitize search term before use
      const sanitizedSearchTerm = sanitizeInput(searchTerm);

      if (sanitizedSearchTerm) {
        filteredBugs = filteredBugs.filter(bug => {
          try {
            const searchableContent = [
              bug.name,
              bug.type,
              bug.description,
              bug.lessonLearned,
              bug.method,
              bug.company,
              bug.whenToUse,
              ...(bug.tags || [])
            ].join(' ').toLowerCase();
            return searchableContent.includes(sanitizedSearchTerm.toLowerCase());
          } catch (error) {
            console.error('Error filtering bug:', error);
            return false;
          }
        });
      }

      // Validate filter value
      const validatedFilter = validateFilter(currentFilter, categories);

      if (validatedFilter !== 'all') {
        filteredBugs = filteredBugs.filter(bug => bug.type === validatedFilter);
      }

      // Validate sort parameter
      const validatedSort = validateSort(currentSort);
      const [criteria, order] = validatedSort.split('-');
      
      const sortedBugs = [...filteredBugs].sort((a, b) => {
        try {
          let valueA, valueB;

          switch (criteria) {
            case 'date':
              valueA = new Date(a.dateAdded || '1970-01-01');
              valueB = new Date(b.dateAdded || '1970-01-01');
              break;
            case 'severity':
              valueA = severityOrder[a.severity] || 0;
              valueB = severityOrder[b.severity] || 0;
              break;
            case 'bounty':
              valueA = parseFloat((a.bounty || '0').replace(/[$,]/g, '')) || 0;
              valueB = parseFloat((b.bounty || '0').replace(/[$,]/g, '')) || 0;
              break;
            case 'name':
              valueA = (a.name || '').toLowerCase();
              valueB = (b.name || '').toLowerCase();
              break;
            default:
              return 0;
          }

          if (order === 'desc') {
            return valueB > valueA ? 1 : valueB < valueA ? -1 : 0;
          } else {
            return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
          }
        } catch (error) {
          console.error('Error sorting bugs:', error);
          return 0;
        }
      });

      return sortedBugs;
    } catch (error) {
      console.error('Error processing bugs:', error);
      return [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, currentFilter, currentSort]);

  // Dynamic category list (unique vulnerability types)
  const categories = useMemo(() => {
    try {
      const typeSet = new Set(vulnerabilities.map(v => v.type));
      return ['all', ...Array.from(typeSet).sort((a,b) => a.localeCompare(b))];
    } catch (error) {
      console.error('Error generating categories:', error);
      return ['all'];
    }
  }, []);

  const toggleTheme = () => {
    try {
      setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark');
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };

  const openModal = (bug) => {
    try {
      setSelectedBug(bug);
    } catch (error) {
      console.error('Error opening modal:', error);
    }
  };

  const closeModal = () => {
    try {
      setSelectedBug(null);
    } catch (error) {
      console.error('Error closing modal:', error);
    }
  };

  const handleFilter = (filter) => {
    try {
      const validated = validateFilter(filter, categories);
      setCurrentFilter(validated);
    } catch (error) {
      console.error('Error handling filter:', error);
    }
  };

  const clearAllFilters = () => {
    try {
      setSearchTerm('');
      setCurrentFilter('all');
      setCurrentSort('date-desc');
    } catch (error) {
      console.error('Error clearing filters:', error);
    }
  };

  return (
    <ErrorBoundary>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header currentTheme={currentTheme} toggleTheme={toggleTheme} />
      <main id="main-content" role="main">
        <div className="container">
          <ErrorBoundary>
            <Search
              setSearchTerm={setSearchTerm}
              currentSort={currentSort}
              setCurrentSort={setCurrentSort}
              bugCount={bugs.length}
              clearAllFilters={clearAllFilters}
              currentFilter={currentFilter}
              handleFilter={handleFilter}
              searchTerm={searchTerm}
              categories={categories}
            />
          </ErrorBoundary>
          <ErrorBoundary>
            <VulnerabilityGrid bugs={bugs} openModal={openModal} />
          </ErrorBoundary>
        </div>
      </main>
      <ErrorBoundary>
        <Footer handleFilter={handleFilter} />
      </ErrorBoundary>
      {selectedBug && (
        <ErrorBoundary>
          <Modal bug={selectedBug} closeModal={closeModal} handleFilter={handleFilter} />
        </ErrorBoundary>
      )}
    </ErrorBoundary>
  );
}

export default App;