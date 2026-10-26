import React, { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { bountyLabel } from '../library';
export default function Modal({ bug, closeModal, applyTagSearch, saved, toggleSave }) {
  const dialog = useRef(null);
  const [copyState, setCopyState] = useState('Copy method');
  const timer = useRef(null);
  useEffect(() => {
    const el = dialog.current;
    const previousFocus = document.activeElement;
    el.showModal();
    el.querySelector('[data-close-report]')?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { clearTimeout(timer.current); document.body.style.overflow = previousOverflow; el.close(); previousFocus?.focus(); };
  }, []);
  const copyMethod = async () => {
    try { await navigator.clipboard.writeText(bug.method); setCopyState('Copied'); } catch { setCopyState('Copy unavailable'); }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyState('Copy method'), 2200);
  };
  return <dialog ref={dialog} className="report-dialog" aria-labelledby="modalTitle" onCancel={e => { e.preventDefault(); closeModal(); }} onClick={e => { if (e.target === e.currentTarget) { const r = e.currentTarget.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeModal(); } }}>
    <div className="dialog-top"><span><Icon name="book" size={16} />REPORT BRIEFING</span><div><button className={`button secondary dialog-save ${saved ? 'is-saved' : ''}`} aria-pressed={saved} onClick={toggleSave}><Icon name="bookmark" size={15} />{saved ? 'Saved' : 'Save report'}</button><button data-close-report="true" className="icon-button" onClick={closeModal} aria-label="Close report"><Icon name="close" size={20} /></button></div></div>
    <div className="dialog-body"><div className="dialog-title"><span className={`severity severity-${bug.severity.toLowerCase()}`}><i />{bug.severity}</span><span className="dialog-category">{bug.type}</span><h2 id="modalTitle">{bug.name}</h2><div className="dialog-metadata"><span>{bug.company}</span><span className="metadata-separator" /><strong>{bountyLabel(bug)}</strong><span>listed bounty</span></div></div>
      <section className="briefing-section"><h3><span>01</span>The finding</h3><p>{bug.description}</p></section>
      <section className="lesson-section"><Icon name="info" size={20} /><div><h3>The lesson to take away</h3><p>{bug.lessonLearned}</p></div></section>
      <section className="briefing-section"><h3><span>02</span>When to look for it</h3><p>{bug.whenToUse || 'No testing context is recorded for this report.'}</p></section>
      <section className="briefing-section"><div className="method-heading"><h3><span>03</span>The methodology</h3>{bug.method && <button className="button secondary" aria-label={copyState} onClick={copyMethod}><Icon name={copyState === 'Copied' ? 'check' : 'copy'} size={14} /><span role="status">{copyState}</span></button>}</div>{bug.sources?.length ? <p className="method-attribution">Study summary; original disclosure linked below.</p> : null}<pre className="method-content">{bug.method || 'No methodology has been recorded for this report.'}</pre></section>
      {bug.sources?.length ? <section className="briefing-section briefing-sources" aria-labelledby="source-heading">
        <h3 id="source-heading">Original disclosures &amp; sources</h3>
        <div className="disclosure-status"><Icon name="check" size={15} /><span>{bug.disclosureStatus}</span></div>
        <p>{bug.patchNote}</p>
        <ul>{bug.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer"><span>{source.title}</span><Icon name="external" size={14} /></a><div><span>{source.author}</span>{source.published ? <time dateTime={source.published}>{source.published}</time> : null}</div></li>)}</ul>
      </section> : null}
      <section className="briefing-section related-tags"><h3>Keep exploring</h3><p>Follow a tag to find related notes across the collection.</p><div>{bug.tags.map(tag => <button key={tag} onClick={() => applyTagSearch(tag)}>#{tag}<Icon name="arrow" size={13} /></button>)}</div></section>
      <p className="briefing-note">{bug.sources?.length ? 'A study summary of the credited public disclosures. Severity is marked Unrated when the source gives no rating; bounty amounts are shown only when stated.' : 'From the BountyBricks collection. Original notes and listed bounties are preserved; source disclosures have not been independently verified.'}</p>
    </div>
  </dialog>;
}
