import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { sanitizeText } from '../utils/security';

const Modal = ({ bug, closeModal, handleFilter }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [closeModal]);

  if (!bug) {
    return null;
  }

  // Sanitize all data to prevent XSS attacks
  const sanitizedBug = {
    name: sanitizeText(bug.name || ''),
    type: sanitizeText(bug.type || ''),
    severity: sanitizeText(bug.severity || ''),
    bounty: sanitizeText(bug.bounty || ''),
    company: sanitizeText(bug.company || ''),
    description: sanitizeText(bug.description || ''),
    lessonLearned: sanitizeText(bug.lessonLearned || ''),
    method: sanitizeText(bug.method || ''),
    whenToUse: sanitizeText(bug.whenToUse || ''),
    tags: (bug.tags || []).map(tag => sanitizeText(tag))
  };

  const { name, type, severity, bounty, company, description, lessonLearned, method, whenToUse, tags } = sanitizedBug;

  const handleTagClick = (tag, event) => {
    try {
      event.stopPropagation();
      handleFilter(tag);
      closeModal();
    } catch (error) {
      console.error('Error handling tag click:', error);
    }
  };


  return (
    <div className="modal-overlay active" id="modalOverlay" role="dialog" aria-modal="true" aria-labelledby="modalTitle" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 id="modalTitle" className="modal-title">{name}</h2>
          <button className="modal-close" id="modalClose" aria-label="Close modal" onClick={closeModal}>&times;</button>
        </div>
        <div className="modal-content" id="modalContent">
          <div className="modal-badges">
            <span className="modal-badge bug-type">{type}</span>
            <span className={`modal-badge severity ${severity.toLowerCase().replace(' ', '')}`}>{severity}</span>
            <span className={`modal-badge bounty${bounty === 'N/A' ? ' no-bounty' : ''}`}>{bounty}</span>
            <span className="modal-badge company">{company}</span>
          </div>

          <div className="modal-section">
            <h3>📝 Description</h3>
            <p>{description}</p>
          </div>

          <div className="modal-section">
            <h3>🧠 Lesson Learned</h3>
            <p>{lessonLearned}</p>
          </div>

          <div className="modal-section">
            <h3>🧠 Methodology</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{method}</p>
          </div>

          <div className="modal-section">
            <h3>🎯 When to Use/Look For</h3>
            <p>{whenToUse}</p>
          </div>

          <div className="modal-section">
            <h3>🏷️ Tags</h3>
            <div className="modal-tags">
              {tags.map((tag, index) => (
                <span key={`${tag}-${index}`} className="tag" onClick={(e) => handleTagClick(tag, e)}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  bug: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    severity: PropTypes.string.isRequired,
    bounty: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    lessonLearned: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    whenToUse: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default Modal;
