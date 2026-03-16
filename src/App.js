import React, { useEffect, useMemo, useState } from 'react';
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
  const [currentTheme, setCurrentTheme] = useState(() => localStorage.getItem('cybersec-theme') || 'dark');
  const [selectedBug, setSelectedBug] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    localStorage.setItem('cybersec-theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    document.body.style.overflow = selectedBug ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedBug]);

  const categoryCounts = useMemo(() => {
    return vulnerabilities.reduce((accumulator, bug) => {
      accumulator[bug.type] = (accumulator[bug.type] || 0) + 1;
      return accumulator;
    }, {});
  }, []);

  const categories = useMemo(() => {
    return [
      { id: 'all', label: 'All reports', count: vulnerabilities.length },
      ...Object.entries(categoryCounts)
        .sort(([typeA], [typeB]) => typeA.localeCompare(typeB))
        .map(([type, count]) => ({ id: type, label: type, count }))
    ];
  }, [categoryCounts]);

  const dashboardStats = useMemo(() => {
    const bounties = vulnerabilities
      .map((bug) => Number.parseFloat(bug.bounty.replace(/[$,]/g, '')) || 0)
      .filter((value) => value > 0);

    const highSignalCount = vulnerabilities.filter((bug) => ['Critical', 'High'].includes(bug.severity)).length;
    const companyCount = new Set(vulnerabilities.map((bug) => bug.company)).size;
    const topBounty = bounties.length ? Math.max(...bounties) : 0;

    return {
      totalReports: vulnerabilities.length,
      highSignalCount,
      companyCount,
      categoryTypeCount: Object.keys(categoryCounts).length,
      topBounty
    };
  }, [categoryCounts]);

  const featuredTypes = useMemo(() => {
    return Object.entries(categoryCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 4)
      .map(([type, count]) => ({ type, count }));
  }, [categoryCounts]);

  const bugs = useMemo(() => {
    let filteredBugs = [...vulnerabilities];

    if (searchTerm) {
      filteredBugs = filteredBugs.filter((bug) => {
        const searchableContent = [
          bug.name,
          bug.type,
          bug.description,
          bug.lessonLearned,
          bug.method,
          bug.company,
          bug.whenToUse,
          ...bug.tags
        ]
          .join(' ')
          .toLowerCase();

        return searchableContent.includes(searchTerm.toLowerCase());
      });
    }

    if (currentFilter !== 'all') {
      filteredBugs = filteredBugs.filter((bug) => bug.type === currentFilter);
    }

    const [criteria, order] = currentSort.split('-');

    return [...filteredBugs].sort((bugA, bugB) => {
      let valueA;
      let valueB;

      switch (criteria) {
        case 'date':
          valueA = new Date(bugA.dateAdded || '1970-01-01');
          valueB = new Date(bugB.dateAdded || '1970-01-01');
          break;
        case 'severity':
          valueA = severityOrder[bugA.severity] || 0;
          valueB = severityOrder[bugB.severity] || 0;
          break;
        case 'bounty':
          valueA = Number.parseFloat(bugA.bounty.replace(/[$,]/g, '')) || 0;
          valueB = Number.parseFloat(bugB.bounty.replace(/[$,]/g, '')) || 0;
          break;
        case 'name':
          valueA = bugA.name.toLowerCase();
          valueB = bugB.name.toLowerCase();
          break;
        default:
          return 0;
      }

      if (order === 'desc') {
        return valueB > valueA ? 1 : valueB < valueA ? -1 : 0;
      }

      return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
    });
  }, [searchTerm, currentFilter, currentSort]);

  const toggleTheme = () => {
    setCurrentTheme((theme) => (theme === 'dark' ? 'light' : 'dark'));
  };

  const openModal = (bug) => {
    setSelectedBug(bug);
  };

  const closeModal = () => {
    setSelectedBug(null);
  };

  const handleFilter = (filter) => {
    setCurrentFilter(filter);
  };

  const handleTagSearch = (tag) => {
    setCurrentFilter('all');
    setSearchTerm(tag);
    setSelectedBug(null);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setCurrentFilter('all');
    setCurrentSort('date-desc');
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header
        currentTheme={currentTheme}
        toggleTheme={toggleTheme}
        stats={dashboardStats}
        featuredTypes={featuredTypes}
      />
      <main id="main-content" role="main">
        <div className="container">
          <Search
            setSearchTerm={setSearchTerm}
            currentSort={currentSort}
            setCurrentSort={setCurrentSort}
            bugCount={bugs.length}
            totalCount={vulnerabilities.length}
            clearAllFilters={clearAllFilters}
            currentFilter={currentFilter}
            handleFilter={handleFilter}
            searchTerm={searchTerm}
            categories={categories}
          />
          <VulnerabilityGrid bugs={bugs} openModal={openModal} />
        </div>
      </main>
      <Footer
        handleFilter={handleFilter}
        featuredTypes={featuredTypes}
        totalCount={vulnerabilities.length}
      />
      {selectedBug ? (
        <Modal bug={selectedBug} closeModal={closeModal} applyTagSearch={handleTagSearch} />
      ) : null}
    </>
  );
}

export default App;
