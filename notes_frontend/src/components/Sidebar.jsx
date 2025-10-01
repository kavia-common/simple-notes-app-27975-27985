import React from 'react';
import '../styles/theme.css';

/**
 * PUBLIC_INTERFACE
 * Sidebar provides actions and secondary information.
 */
export default function Sidebar({ onNew, onDelete, canDelete }) {
  return (
    <aside className="sidebar" aria-label="Sidebar">
      <div className="sidebar-card">
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Quick Actions</div>
        <div className="sidebar-actions">
          <button className="btn btn-primary" onClick={onNew}>
            ＋ New Note
          </button>
          <button
            className="btn"
            onClick={onDelete}
            disabled={!canDelete}
            aria-disabled={!canDelete}
            style={{ opacity: canDelete ? 1 : 0.5 }}
          >
            🗑 Delete Selected
          </button>
        </div>
      </div>

      <div className="sidebar-card" style={{ marginTop: 12 }}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Tips</div>
        <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-muted)' }}>
          <li>Click a note to view or edit.</li>
          <li>Changes auto-save.</li>
          <li>Notes persist in your browser.</li>
        </ul>
      </div>
    </aside>
  );
}
