import { severityOrder } from './data';
export const topics = [
  { id: 'all', name: 'All topics', icon: 'layers' },
  { id: 'identity', name: 'Account takeover', icon: 'user' },
  { id: 'auth', name: 'Authentication', icon: 'key' },
  { id: 'access', name: 'Access control & IDOR', icon: 'lock' },
  { id: 'injection', name: 'Injection', icon: 'code' },
  { id: 'logic', name: 'Business logic', icon: 'workflow' },
  { id: 'exposure', name: 'Data & infrastructure', icon: 'server' }
];
export function topicOf(bug) {
  const type = bug.type.toLowerCase();
  if (type.includes('account takeover')) return 'identity';
  if (type.includes('authentication')) return 'auth';
  if (/access control|idor|direct object|privilege/.test(type)) return 'access';
  if (type.includes('injection')) return 'injection';
  if (type.includes('business logic')) return 'logic';
  return 'exposure';
}
export function bountyValue(bug) { return Number.parseFloat(bug.bounty.replace(/[$,]/g, '')) || 0; }
export function bountyLabel(bug) {
  const value = bountyValue(bug);
  return value ? `$${value.toLocaleString('en-US')}${bug.bounty.includes('+') ? '+' : ''}` : bug.bounty === 'N/A' ? 'Not listed' : 'Undisclosed';
}
export function selectReports(reports, { query = '', topic = 'all', severity = 'all', collection = 'all', saved = [], read = [], sort = 'collection' } = {}) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const result = reports.filter(bug => {
    const content = [bug.name, bug.company, bug.type, bug.description, bug.lessonLearned, bug.method, bug.whenToUse, ...(bug.tags || [])].join(' ').toLowerCase();
    return words.every(word => content.includes(word)) && (topic === 'all' || topicOf(bug) === topic) && (severity === 'all' || bug.severity === severity) && (collection !== 'saved' || saved.includes(bug.id)) && (collection !== 'read' || read.includes(bug.id));
  });
  return result.sort((a, b) => {
    if (sort === 'bounty') return bountyValue(b) - bountyValue(a);
    if (sort === 'severity') return (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0);
    if (sort === 'name') return a.name.localeCompare(b.name);
    if (collection === 'read') return read.indexOf(a.id) - read.indexOf(b.id);
    return Date.parse(b.dateAdded || '1970-01-01') - Date.parse(a.dateAdded || '1970-01-01');
  });
}
export function readPreference(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
export function writePreference(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Remain usable when storage is unavailable. */ } }
