import React from 'react';
import '../styles/theme.css';

/**
 * PUBLIC_INTERFACE
 * TopNav renders the app's top navigation bar with branding and quick actions.
 */
export default function TopNav({ onNew }) {
  return (
    <div className="topnav" role="navigation" aria-label="Top navigation">
      <div className="brand">
        <div className="brand-logo" aria-hidden="true" />
        <div className="brand-title">Ocean Notes</div>
        <span className="badge" style={{ marginLeft: 8 }}>Beta</span>
      </div>
      <div className="topnav-actions">
        <button className="btn btn-primary" onClick={onNew} aria-label="Create new note">
          ＋ New Note
        </button>
        <a
          className="btn btn-ghost"
          href="https://react.dev"
          target="_blank"
          rel="noreferrer"
          aria-label="Open React documentation"
        >
          Docs
        </a>
      </div>
    </div>
  );
}
