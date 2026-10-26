import { vulnerabilities } from './data';
import { topics, topicOf, bountyValue, bountyLabel, selectReports } from './library';

test('every original report belongs to exactly one browsable topic', () => {
  const ids = topics.slice(1).map(t => t.id);
  expect(vulnerabilities).toHaveLength(20);
  expect(new Set(vulnerabilities.map(b => b.id)).size).toBe(20);
  expect(vulnerabilities.every(b => ids.includes(topicOf(b)))).toBe(true);
  expect(ids.reduce((count, topic) => count + selectReports(vulnerabilities, { topic }).length, 0)).toBe(20);
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
