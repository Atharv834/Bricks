import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { vulnerabilities, severityOrder } from './data';
import Header from './components/Header';
import Search from './components/Search';
import VulnerabilityGrid from './components/VulnerabilityGrid';
import Footer from './components/Footer';
import Modal from './components/Modal';

function App() {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentSort, setCurrentSort] = useState('date-desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [selectedBug, setSelectedBug] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    localStorage.setItem('cybersec-theme', currentTheme);
  }, [currentTheme]);

  const bugs = useMemo(() => {
    let filteredBugs = [...vulnerabilities];

    if (searchTerm) {
      filteredBugs = filteredBugs.filter(bug => {
        const searchableContent = [
          bug.name,
          bug.type,
          bug.description,
          bug.lessonLearned,
          bug.method,
          bug.company,
          bug.whenToUse,
          ...bug.tags
        ].join(' ').toLowerCase();
        return searchableContent.includes(searchTerm.toLowerCase());
      });
    }

    if (currentFilter !== 'all') {
      // category filter now matches exact vulnerability type
      filteredBugs = filteredBugs.filter(bug => bug.type === currentFilter);
    }

    const [criteria, order] = currentSort.split('-');
    const sortedBugs = [...filteredBugs].sort((a, b) => {
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
          valueA = parseFloat(a.bounty.replace(/[$,]/g, '')) || 0;
          valueB = parseFloat(b.bounty.replace(/[$,]/g, '')) || 0;
          break;
        case 'name':
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
          break;
        default:
          return 0;
      }

      if (order === 'desc') {
        return valueB > valueA ? 1 : valueB < valueA ? -1 : 0;
      } else {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      }
    });

    return sortedBugs;
  }, [searchTerm, currentFilter, currentSort]);

  // Dynamic category list (unique vulnerability types)
  const categories = useMemo(() => {
    const typeSet = new Set(vulnerabilities.map(v => v.type));
    return ['all', ...Array.from(typeSet).sort((a,b) => a.localeCompare(b))];
  }, []);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  const openModal = (bug) => {
    setSelectedBug(bug);
  };

  const closeModal = () => {
    setSelectedBug(null);
  };

  const handleFilter = (filter) => {
    setCurrentFilter(filter);
  }

  const clearAllFilters = () => {
    setSearchTerm('');
    setCurrentFilter('all');
    setCurrentSort('date-desc');
  }

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header currentTheme={currentTheme} toggleTheme={toggleTheme} />
      <main id="main-content" role="main">
        <div className="container">
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
          <VulnerabilityGrid bugs={bugs} openModal={openModal} />
        </div>
      </main>
      <Footer handleFilter={handleFilter} />
      {selectedBug && <Modal bug={selectedBug} closeModal={closeModal} handleFilter={handleFilter} />}
    </>
  );
}

export default App;