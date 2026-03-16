import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ bug, closeModal, applyTagSearch }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
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

  const { name, type, severity, bounty, company, description, lessonLearned, method, whenToUse, tags } = bug;

  const handleTagClick = (tag, event) => {
    event.stopPropagation();
    applyTagSearch(tag);
  };

  return (
    <div
      className="modal-overlay active"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      onClick={closeModal}
    >
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="modal-kicker">Report briefing</span>
            <h2 id="modalTitle" className="modal-title">{name}</h2>
          </div>
          <button className="modal-close" type="button" aria-label="Close modal" onClick={closeModal}>
            Close
          </button>
        </div>

        <div className="modal-content">
          <aside className="modal-sidebar">
            <div className="modal-badges">
              <span className="modal-badge">{type}</span>
              <span className={`modal-badge severity ${severity.toLowerCase().replace(/\s+/g, '')}`}>{severity}</span>
              <span className={`modal-badge bounty${bounty === 'N/A' ? ' no-bounty' : ''}`}>{bounty}</span>
            </div>
            <div className="modal-side-card">
              <span className="modal-side-label">Company</span>
              <strong>{company}</strong>
            </div>
            <div className="modal-side-card">
              <span className="modal-side-label">Use this report for</span>
              <p>{whenToUse}</p>
            </div>
          </aside>

          <div className="modal-main">
            <section className="modal-section">
              <h3>Description</h3>
              <p>{description}</p>
            </section>

            <section className="modal-section">
              <h3>Lesson learned</h3>
              <p>{lessonLearned}</p>
            </section>

            <section className="modal-section">
              <h3>Methodology</h3>
              <p className="method-copy">{method}</p>
            </section>

            <section className="modal-section">
              <div className="modal-section-head">
                <h3>Tags</h3>
                <span>Click a tag to launch a keyword search across the archive</span>
              </div>
              <div className="modal-tags">
                {tags.map((tag) => (
                  <button key={tag} className="tag modal-tag-button" type="button" onClick={(event) => handleTagClick(tag, event)}>
                    {tag}
                  </button>
                ))}
              </div>
            </section>
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
    tags: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
  applyTagSearch: PropTypes.func.isRequired
};

export default Modal;
