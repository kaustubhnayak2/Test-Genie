import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Simple error boundary for the entire app
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; errorMessage: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Fatal app error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#ef4444', marginBottom: '10px' }}>
            Something went wrong
          </h2>
          <p style={{ marginBottom: '20px', color: '#4b5563' }}>
            There was an error loading the application. Please try refreshing.
          </p>
          <details style={{ marginBottom: '20px', color: '#6b7280', fontSize: '14px' }}>
            <summary>Error details</summary>
            <p>{this.state.errorMessage}</p>
          </details>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '10px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Error handling
const handleRenderError = (error: Error) => {
  console.error('Error rendering app:', error);
  
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center; padding: 20px;">
        <h2 style="color: #ef4444; margin-bottom: 10px; font-size: 24px;">Failed to start application</h2>
        <p style="margin-bottom: 20px; color: #4b5563;">There was an error loading Test Genie. Please try refreshing the page.</p>
        <p style="margin-bottom: 20px; color: #6b7280; font-size: 14px;">Error: ${error.message}</p>
        <button 
          onclick="window.location.reload()" 
          style="background-color: #3b82f6; color: white; border: none; padding: 10px 16px; border-radius: 4px; cursor: pointer; font-size: 16px;"
        >
          Refresh Page
        </button>
      </div>
    `;
  }
};

try {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('Root element not found');
  }

  // Remove the fallback loading UI
  const fallbackElement = document.querySelector('.loading-fallback');
  if (fallbackElement && fallbackElement.parentNode === rootElement) {
    fallbackElement.remove();
  }

  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
} catch (error) {
  handleRenderError(error as Error);
}
