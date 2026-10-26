import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { vulnerabilities } from './data';
import { topics, topicOf, bountyValue, bountyLabel, selectReports, readPreference, writePreference } from './library';
import Modal from './components/Modal';
import Icon from './components/Icon';

function Brand() {
  return <span className="brand"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>Bounty<span className="brand-light">Bricks</span><small>THE RESEARCH LIBRARY</small></span></span>;
}
function ReportCard({ bug, index, saved, read, toggleSave, openReport, searchTag }) {
  return <article className={`report-card ${read ? 'is-read' : ''}`}>
    <div className="card-top"><span className="report-id">BRK / {String(index + 1).padStart(3, '0')}</span><button className={`icon-button save-button ${saved ? 'is-saved' : ''}`} onClick={() => toggleSave(bug.id)} aria-label={`${saved ? 'Unsave' : 'Save'} ${bug.name}`} aria-pressed={saved} title={saved ? 'Remove from saved' : 'Save report'}><Icon name="bookmark" size={17} /></button></div>
    <div className="card-meta"><span className={`severity severity-${bug.severity.toLowerCase()}`}><i />{bug.severity}</span><span className="card-category">{bug.type}</span></div>
    <h3><button onClick={() => openReport(bug)}>{bug.name}</button></h3>
    <p className="card-description">{bug.description}</p>
    <div className="card-tags">{bug.tags.slice(0, 2).map(tag => <button key={tag} onClick={() => searchTag(tag)} title={`Search ${tag}`}>#{tag}</button>)}</div>
    <div className="card-bottom"><span className="card-company" title={bug.company}><span className="company-avatar">{bug.company.replaceAll('[', '').replaceAll(']', '').charAt(0)}</span>{bug.company}</span><span className={`card-bounty ${bountyValue(bug) ? '' : 'undisclosed'}`}>{bountyLabel(bug)}</span></div>
    <button className="card-open" onClick={() => openReport(bug)}><span>{read ? 'Read again' : 'Read report'}</span><Icon name="arrow" size={16} /></button>
  </article>;
}
function App() {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('all');
  const [severity, setSeverity] = useState('all');
  const [sort, setSort] = useState('collection');
  const [collection, setCollection] = useState('all');
  const [theme, setTheme] = useState(() => readPreference('bricks-theme', 'dark'));
  const [view, setView] = useState(() => readPreference('bricks-view', 'grid'));
  const [saved, setSaved] = useState(() => { const v = readPreference('bricks-saved', []); return Array.isArray(v) ? v.filter(id => vulnerabilities.some(b => b.id === id)) : []; });
  const [read, setRead] = useState(() => { const v = readPreference('bricks-read', []); return Array.isArray(v) ? v.filter(id => vulnerabilities.some(b => b.id === id)) : []; });
  const [selectedBug, setSelectedBug] = useState(null);
  const [mobileFilters, setMobileFilters] = useState(false);
  const searchRef = useRef(null);
  const featured = useMemo(() => [...vulnerabilities].sort((a, b) => bountyValue(b) - bountyValue(a))[0], []);
  const counts = useMemo(() => topics.reduce((a, t) => ({ ...a, [t.id]: t.id === 'all' ? vulnerabilities.length : vulnerabilities.filter(b => topicOf(b) === t.id).length }), {}), []);
  const reports = useMemo(() => selectReports(vulnerabilities, { query, topic, severity, sort, collection, saved, read }), [query, topic, severity, sort, collection, saved, read]);
  const activeFilters = Boolean(query.trim() || topic !== 'all' || severity !== 'all');
  const collectionTitle = collection === 'saved' ? 'Saved reports' : collection === 'read' ? 'Recently read' : 'Report library';
  useEffect(() => { document.documentElement.setAttribute('data-color-scheme', theme === 'light' ? 'light' : 'dark'); writePreference('bricks-theme', theme); }, [theme]);
  useEffect(() => { writePreference('bricks-saved', saved); }, [saved]);
  useEffect(() => { writePreference('bricks-read', read); }, [read]);
  useEffect(() => { writePreference('bricks-view', view); }, [view]);
  useEffect(() => {
    const onKey = event => {
      const typing = /INPUT|TEXTAREA|SELECT/.test(event.target.tagName) || event.target.isContentEditable;
      if (!selectedBug && ((event.key === 'k' && (event.ctrlKey || event.metaKey)) || (event.key === '/' && !typing))) { event.preventDefault(); searchRef.current?.focus(); }
      if (event.key === 'Escape' && !selectedBug) { setMobileFilters(false); if (document.activeElement === searchRef.current) searchRef.current.blur(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedBug]);
  const toggleSave = id => setSaved(values => values.includes(id) ? values.filter(v => v !== id) : [...values, id]);
  const openReport = bug => { setSelectedBug(bug); setRead(values => [bug.id, ...values.filter(id => id !== bug.id)]); };
  const resetFilters = () => { setQuery(''); setTopic('all'); setSeverity('all'); };
  const searchTag = tag => { resetFilters(); setCollection('all'); setQuery(tag); setSelectedBug(null); searchRef.current?.focus(); };
  const chooseCollection = next => { setCollection(next); resetFilters(); setMobileFilters(false); };
  return <div className="app-shell">
    <a className="skip-link" href="#report-library">Skip to reports</a>
    <aside className="sidebar" aria-label="Library navigation">
      <a className="brand-link" href="#main-heading" onClick={event => { event.preventDefault(); chooseCollection('all'); }} aria-label="Bounty Bricks home"><Brand /></a>
      <div className="sidebar-label">WORKSPACE</div>
      <nav className="workspace-nav" aria-label="Collections">{[{ id: 'all', name: 'All reports', icon: 'layers', count: vulnerabilities.length }, { id: 'saved', name: 'Saved reports', icon: 'bookmark', count: saved.length }, { id: 'read', name: 'Recently read', icon: 'clock', count: read.length }].map(item => <button key={item.id} className={collection === item.id ? 'active' : ''} aria-current={collection === item.id ? 'page' : undefined} onClick={() => chooseCollection(item.id)}><Icon name={item.icon} /><span>{item.name}</span><span className="nav-count">{item.count}</span></button>)}</nav>
      <div className="topic-nav"><div className="sidebar-label">EXPLORE BY TOPIC</div>{topics.slice(1).map(item => <button key={item.id} className={topic === item.id ? 'selected' : ''} aria-pressed={topic === item.id} onClick={() => { setTopic(topic === item.id ? 'all' : item.id); setCollection('all'); }}><Icon name={item.icon} size={16} /><span>{item.name}</span><span className="nav-count">{counts[item.id]}</span></button>)}</div>
      <div className="sidebar-study"><div className="study-icon"><Icon name="book" size={20} /></div><strong>One report.<br />A new perspective.</strong><p>Build your intuition, one finding at a time.</p><div className="study-progress"><span style={{ width: `${read.length / vulnerabilities.length * 100}%` }} /></div><small>{read.length} of {vulnerabilities.length} reports explored</small></div>
      <div className="sidebar-bottom"><a href="https://github.com/Atharv834/Bricks" target="_blank" rel="noreferrer"><Icon name="code" size={16} />View on GitHub<Icon name="external" size={13} /></a><span><i className="status-dot" />Built for curious researchers</span></div>
    </aside>
    <div className="main-shell">
      <header className="topbar"><div className="breadcrumb"><Icon name="layers" size={16} /><span>Workspace</span><span className="breadcrumb-slash">/</span><strong>{collectionTitle}</strong></div><div className="topbar-actions"><span className="library-status"><i className="status-dot" />Independent research archive</span><button className="icon-button theme-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button><span className="profile-avatar" aria-label="Bounty Bricks">BB</span></div></header>
      <main className="main-content">
        <div className="mobile-brand"><Brand /><button className="button secondary" aria-expanded={mobileFilters} aria-controls="mobile-filters" onClick={() => setMobileFilters(!mobileFilters)}><Icon name="filter" size={16} />Browse</button></div>
        {mobileFilters && <nav id="mobile-filters" className="mobile-filter-tray" aria-label="Browse library"><div className="mobile-collections">{['all', 'saved', 'read'].map(id => <button className={collection === id ? 'active' : ''} key={id} onClick={() => chooseCollection(id)}>{id === 'all' ? 'All reports' : id === 'saved' ? 'Saved reports' : 'Recently read'}</button>)}</div><label htmlFor="mobile-topic">Topic</label><select id="mobile-topic" value={topic} onChange={e => setTopic(e.target.value)}>{topics.map(t => <option value={t.id} key={t.id}>{t.name} ({counts[t.id]})</option>)}</select></nav>}
        {collection === 'all' && <><section className="intro" aria-labelledby="main-heading"><div className="intro-copy"><span className="eyebrow"><span />A LIBRARY OF REAL-WORLD FINDINGS</span><h1 id="main-heading">Break down the bug.<br /><span>Build up your craft.</span></h1><p>Go beyond the headline. Explore vulnerability reports,<br className="desktop-break" /> understand the method, and take the lesson with you.</p><a className="button primary" href="#report-library" onClick={() => searchRef.current?.focus()}>Explore the library<Icon name="arrow" size={16} /></a><span className="intro-footnote">Curated notes. Practical takeaways.</span></div><button className="featured-report" onClick={() => openReport(featured)} aria-label={`Read featured report: ${featured.name}`}><div className="featured-label"><Icon name="shield" size={15} />THE DEEP DIVE<span>FEATURED</span></div><div className="featured-illustration" aria-hidden="true"><span className="orbit orbit-one" /><span className="orbit orbit-two" /><span className="orbit orbit-three" /><span className="illustration-lock"><Icon name="lock" size={30} /></span><span className="diagram-node node-one"><Icon name="user" size={13} /></span><span className="diagram-node node-two"><Icon name="server" size={13} /></span><span className="diagram-node node-three"><Icon name="code" size={13} /></span><code>userId=123 → 9999</code></div><div className="featured-content"><span className="featured-type">ACCESS CONTROL · HIGH SEVERITY</span><h2>{featured.name}</h2><div><span>{bountyLabel(featured)}<small>listed bounty</small></span><span className="featured-arrow"><Icon name="arrow" size={19} /></span></div></div></button></section>
        <section className="stats-strip" aria-label="Library at a glance"><div><Icon name="layers" /><strong>{vulnerabilities.length}<span>Reports to explore</span></strong></div><div><Icon name="shield" /><strong>{vulnerabilities.filter(b => ['Critical', 'High'].includes(b.severity)).length}<span>High & critical findings</span></strong></div><div><Icon name="code" /><strong>{new Set(vulnerabilities.map(b => b.type)).size}<span>Vulnerability types</span></strong></div><div><Icon name="bookmark" /><strong>{bountyLabel(featured)}<span>Highest listed bounty</span></strong></div></section></>}
        <section id="report-library" className="library" aria-labelledby="library-title"><div className="library-heading"><div><span className="eyebrow">THE COLLECTION</span><h2 id="library-title">{collectionTitle}<span>{collection === 'saved' ? saved.length : collection === 'read' ? read.length : vulnerabilities.length}</span></h2></div><p>{collection === 'saved' ? 'Your next deep dive, kept close.' : collection === 'read' ? 'Pick up where your curiosity left off.' : 'Every finding has something to teach.'}</p></div>
          <div className="filter-toolbar"><div className="search-box"><Icon name="search" size={19} /><input ref={searchRef} id="searchInput" aria-label="Search reports" placeholder="Search reports, techniques, companies…" value={query} onChange={e => setQuery(e.target.value)} />{query ? <button className="icon-button" onClick={() => { setQuery(''); searchRef.current?.focus(); }} aria-label="Clear search"><Icon name="close" size={15} /></button> : <kbd>/</kbd>}</div><label className="select-control"><Icon name="filter" size={16} /><span className="sr-only">Filter by severity</span><select aria-label="Filter by severity" value={severity} onChange={e => setSeverity(e.target.value)}><option value="all">All severities</option>{['Critical', 'High', 'Medium', 'Low'].map(s => <option key={s}>{s}</option>)}</select></label><label className="select-control sort-control"><span className="sr-only">Sort reports</span><select aria-label="Sort reports" value={sort} onChange={e => setSort(e.target.value)}><option value="collection">{collection === 'read' ? 'Recently opened' : 'Collection order'}</option><option value="bounty">Highest bounty</option><option value="severity">Highest severity</option><option value="name">Name A–Z</option></select></label><div className="view-toggle" role="group" aria-label="Report layout"><button aria-label="Grid view" aria-pressed={view !== 'list'} className={view !== 'list' ? 'active' : ''} onClick={() => setView('grid')}><Icon name="grid" size={16} /></button><button aria-label="List view" aria-pressed={view === 'list'} className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><Icon name="list" size={17} /></button></div></div>
          <div className="results-bar"><div className="quick-filters" aria-label="Quick topic filters">{['all', 'identity', 'injection', 'logic'].map(id => <button key={id} className={topic === id ? 'active' : ''} aria-pressed={topic === id} onClick={() => setTopic(id)}>{topics.find(t => t.id === id).name}</button>)}{!['all', 'identity', 'injection', 'logic'].includes(topic) && <button className="active" onClick={() => setTopic('all')}>{topics.find(t => t.id === topic)?.name}<Icon name="close" size={12} /></button>}</div><span className="result-count" role="status">{reports.length} {reports.length === 1 ? 'report' : 'reports'}{activeFilters ? <button onClick={resetFilters}>Reset filters<Icon name="close" size={12} /></button> : null}</span></div>
          {reports.length ? <div className={`reports-grid ${view === 'list' ? 'list-view' : ''}`}>{reports.map(bug => <ReportCard key={bug.id} bug={bug} index={vulnerabilities.indexOf(bug)} saved={saved.includes(bug.id)} read={read.includes(bug.id)} toggleSave={toggleSave} openReport={openReport} searchTag={searchTag} />)}</div> : <div className="empty-state"><span><Icon name={collection === 'saved' ? 'bookmark' : 'search'} size={28} /></span><h3>{activeFilters ? 'No reports match these filters' : collection === 'saved' ? 'Your reading list starts here' : 'Your next discovery is waiting'}</h3><p>{activeFilters ? 'Try a broader keyword or clear your filters to explore again.' : collection === 'saved' ? 'Tap the bookmark on any report to keep it for later.' : 'Open a report and it will appear here for an easy return.'}</p><button className="button primary" onClick={() => activeFilters ? resetFilters() : chooseCollection('all')}>{activeFilters ? 'Clear filters' : 'Explore all reports'}<Icon name="arrow" size={16} /></button></div>}
          <div className="collection-end"><span className="end-line" /><Icon name="layers" size={16} /><span>{reports.length ? 'You’re up to date with this collection.' : 'A little curiosity goes a long way.'}</span><span className="end-line" /></div>
        </section>
        <footer className="footer"><span>BountyBricks<span className="footer-dot">·</span>Keep learning. Keep questioning.</span><span>Research notes; source disclosures not independently verified.<a href="https://github.com/Atharv834/Bricks" target="_blank" rel="noreferrer">Source<Icon name="external" size={12} /></a></span></footer>
      </main>
    </div>
    {selectedBug && <Modal bug={selectedBug} closeModal={() => setSelectedBug(null)} applyTagSearch={searchTag} saved={saved.includes(selectedBug.id)} toggleSave={() => toggleSave(selectedBug.id)} />}
  </div>;
}
export default App;
