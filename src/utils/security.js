/**
 * Security Utilities Module
 * Provides input sanitization, validation, and XSS protection
 * Compliant with OWASP Top 10 security guidelines
 */

import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param {string} dirty - Potentially unsafe HTML string
 * @returns {string} - Sanitized HTML string safe for rendering
 */
export const sanitizeHTML = (dirty) => {
  try {
    if (typeof dirty !== 'string') {
      return '';
    }
    
    // Configure DOMPurify with strict settings
    const config = {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'code', 'pre'],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true,
      RETURN_DOM: false,
      RETURN_DOM_FRAGMENT: false,
      RETURN_DOM_IMPORT: false,
      FORCE_BODY: true
    };
    
    return DOMPurify.sanitize(dirty, config);
  } catch (error) {
    console.error('Error sanitizing HTML:', error);
    return '';
  }
};

/**
 * Escape HTML special characters to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text safe for HTML context
 */
export const escapeHTML = (text) => {
  try {
    if (typeof text !== 'string') {
      return String(text || '');
    }
    
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;',
    };
    
    return text.replace(/[&<>"'/]/g, (char) => map[char]);
  } catch (error) {
    console.error('Error escaping HTML:', error);
    return '';
  }
};

/**
 * Sanitize user input for search queries
 * @param {string} input - User input string
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  try {
    if (typeof input !== 'string') {
      return '';
    }
    
    // Remove any HTML tags
    let sanitized = input.replace(/<[^>]*>/g, '');
    
    // Remove null bytes
    sanitized = sanitized.replace(/\0/g, '');
    
    // Trim whitespace
    sanitized = sanitized.trim();
    
    // Limit length to prevent DoS
    const MAX_LENGTH = 500;
    if (sanitized.length > MAX_LENGTH) {
      sanitized = sanitized.substring(0, MAX_LENGTH);
    }
    
    return sanitized;
  } catch (error) {
    console.error('Error sanitizing input:', error);
    return '';
  }
};

/**
 * Validate and sanitize filter values
 * @param {string} filter - Filter value to validate
 * @param {Array<string>} allowedFilters - Array of allowed filter values
 * @returns {string} - Validated filter or 'all' as default
 */
export const validateFilter = (filter, allowedFilters = []) => {
  try {
    if (typeof filter !== 'string') {
      return 'all';
    }
    
    const sanitized = sanitizeInput(filter);
    
    if (allowedFilters.length > 0 && !allowedFilters.includes(sanitized)) {
      return 'all';
    }
    
    return sanitized;
  } catch (error) {
    console.error('Error validating filter:', error);
    return 'all';
  }
};

/**
 * Validate sort parameter
 * @param {string} sort - Sort parameter to validate
 * @returns {string} - Validated sort parameter or default
 */
export const validateSort = (sort) => {
  try {
    const allowedSorts = [
      'date-desc', 'date-asc',
      'severity-desc', 'severity-asc',
      'bounty-desc', 'bounty-asc',
      'name-asc', 'name-desc'
    ];
    
    if (typeof sort !== 'string' || !allowedSorts.includes(sort)) {
      return 'date-desc';
    }
    
    return sort;
  } catch (error) {
    console.error('Error validating sort:', error);
    return 'date-desc';
  }
};

/**
 * Sanitize text for display (converts to plain text, preserves line breaks)
 * @param {string} text - Text to sanitize
 * @returns {string} - Sanitized text
 */
export const sanitizeText = (text) => {
  try {
    if (typeof text !== 'string') {
      return String(text || '');
    }
    
    // Escape HTML but preserve line breaks
    return escapeHTML(text);
  } catch (error) {
    console.error('Error sanitizing text:', error);
    return '';
  }
};

/**
 * Validate and sanitize tag values
 * @param {string} tag - Tag value to validate
 * @returns {string} - Sanitized tag
 */
export const sanitizeTag = (tag) => {
  try {
    if (typeof tag !== 'string') {
      return '';
    }
    
    // Remove special characters that could be used for injection
    let sanitized = tag.replace(/[<>'"&]/g, '');
    
    // Trim and limit length
    sanitized = sanitized.trim();
    if (sanitized.length > 100) {
      sanitized = sanitized.substring(0, 100);
    }
    
    return sanitized;
  } catch (error) {
    console.error('Error sanitizing tag:', error);
    return '';
  }
};

/**
 * Safe JSON parse with error handling
 * @param {string} jsonString - JSON string to parse
 * @param {any} defaultValue - Default value if parsing fails
 * @returns {any} - Parsed object or default value
 */
export const safeJSONParse = (jsonString, defaultValue = null) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return defaultValue;
  }
};

/**
 * Safe localStorage operations with error handling
 */
export const safeLocalStorage = {
  getItem: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? item : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },
  
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  }
};

/**
 * Validate vulnerability data structure
 * @param {object} vuln - Vulnerability object to validate
 * @returns {boolean} - True if valid
 */
export const validateVulnerabilityData = (vuln) => {
  try {
    if (!vuln || typeof vuln !== 'object') {
      return false;
    }
    
    const requiredFields = ['id', 'name', 'type', 'severity', 'bounty', 'company', 'description'];
    
    for (const field of requiredFields) {
      if (!(field in vuln)) {
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error validating vulnerability data:', error);
    return false;
  }
};
