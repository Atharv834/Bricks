import { createHash } from 'crypto';
import originalMethodology from './original-methodology.json';
import { vulnerabilities } from './data';
import { topics, topicOf, bountyValue, bountyLabel, selectReports } from './library';

test('every report belongs to exactly one browsable topic', () => {
  const ids = topics.slice(1).map(t => t.id);
  expect(vulnerabilities).toHaveLength(24);
  expect(new Set(vulnerabilities.map(b => b.id)).size).toBe(24);
  expect(vulnerabilities.every(b => ids.includes(topicOf(b)))).toBe(true);
  expect(ids.reduce((count, topic) => count + selectReports(vulnerabilities, { topic }).length, 0)).toBe(24);
  expect(selectReports(vulnerabilities, { topic: 'access' }).map(b => b.id)).toEqual([9, 10, 13, 16]);
});

test('search composes with topic, severity and saved collection without modifying source', () => {
  const originalIds = vulnerabilities.map(b => b.id);
  expect(selectReports(vulnerabilities, { query: '  SAMSUNG   whitespace ', topic: 'auth', severity: 'High', collection: 'saved', saved: [1] }).map(b => b.id)).toEqual([1]);
  expect(selectReports(vulnerabilities, { query: 'Samsung', severity: 'Critical' })).toHaveLength(0);
  expect(selectReports(vulnerabilities, { collection: 'saved', saved: [] })).toHaveLength(0);
  selectReports(vulnerabilities, { sort: 'bounty' });
  expect(vulnerabilities.map(b => b.id)).toEqual(originalIds);
});

test('sorts numeric bounty values and mixed string/numeric report ids correctly', () => {
  const reports = selectReports(vulnerabilities, { sort: 'bounty' });
  expect(reports[0].id).toBe(16);
  expect(bountyValue(reports[0])).toBe(7790);
  expect(bountyLabel(vulnerabilities.find(b => b.id === 13))).toBe('$2,000+');
  expect(bountyLabel(vulnerabilities.find(b => b.id === 14))).toBe('$1,800');
  expect(selectReports(vulnerabilities, { collection: 'read', read: ['BB-2025-005', 1] }).map(b => b.id)).toEqual(['BB-2025-005', 1]);
  expect(selectReports(vulnerabilities, { sort: 'severity' })[0].severity).toBe('Critical');
});


test('preserves all original methodology strings exactly, including missing methodology', () => {
  const original = vulnerabilities.slice(0, 20).map(bug => ({
    id: bug.id,
    sha256: typeof bug.method === 'string' ? createHash('sha256').update(bug.method).digest('hex') : null
  }));
  expect(original).toEqual(originalMethodology);
});

test('adds exactly four attributed reports and exposes additions before the original collection', () => {
  const additions = vulnerabilities.filter(bug => bug.sources?.length);
  expect(additions).toHaveLength(4);
  expect(additions.every(bug => bug.method && bug.disclosureStatus && bug.patchNote && bug.sources.every(source => source.title && source.author && new URL(source.url).protocol === 'https:'))).toBe(true);
  expect(additions.filter(bug => bug.severity === 'Unrated')).toHaveLength(2);
  expect(selectReports(vulnerabilities).slice(0, 4).map(bug => bug.id)).toEqual(additions.map(bug => bug.id));
  expect(selectReports(vulnerabilities).slice(4).map(bug => bug.id)).toEqual(vulnerabilities.slice(0, 20).map(bug => bug.id));
  expect(selectReports(vulnerabilities, { severity: 'Unrated' })).toHaveLength(2);
  expect(selectReports(vulnerabilities, { query: 'CVE-2023-7028' }).map(bug => bug.id)).toEqual(['BB-PUBLIC-021']);
});
