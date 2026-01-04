import React from 'react';
import PropTypes from 'prop-types';

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * Prevents entire app crashes and provides graceful error handling
 * Compliant with OWASP security practices - doesn't expose sensitive information
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging (in production, send to logging service)
    // SECURITY: Never expose stack traces or internal details to users
    console.error('Error caught by boundary:', {
      error: error.toString(),
      // Only log in development
      ...(process.env.NODE_ENV === 'development' && { errorInfo })
    });
    
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // Render fallback UI - no sensitive information exposed
      return (
        <div className="error-boundary" role="alert" aria-live="assertive">
          <div className="error-boundary-content">
            <h2>⚠️ Something went wrong</h2>
            <p>
              We apologize for the inconvenience. An error occurred while displaying this content.
            </p>
            <p>
              Please try refreshing the page or contact support if the problem persists.
            </p>
            <div className="error-boundary-actions">
              <button 
                className="btn btn--primary"
                onClick={this.handleReset}
                aria-label="Try again"
              >
                🔄 Try Again
              </button>
              <button 
                className="btn btn--secondary"
                onClick={() => window.location.reload()}
                aria-label="Reload page"
              >
                🔃 Reload Page
              </button>
            </div>
            
            {/* Only show technical details in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  Development Error Details
                </summary>
                <pre style={{ marginTop: '10px', fontSize: '12px', overflow: 'auto' }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
