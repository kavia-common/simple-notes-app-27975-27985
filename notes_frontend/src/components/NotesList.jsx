import React from 'react';
import NoteItem from './NoteItem';
import '../styles/theme.css';

/**
 * PUBLIC_INTERFACE
 * NotesList renders the list of notes and handles selection.
 */
export default function NotesList({ notes, selectedId, onSelect, loading }) {
  return (
    <div className="card" aria-label="Notes list">
      <div className="card-header">
        <div className="card-title">Notes</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="badge">{notes.length} total</span>
        </div>
      </div>
      <div className="card-body scroll-y" style={{ maxHeight: 'calc(100vh - 64px - 16px - 56px)' }}>
        {loading ? (
          <div style={{ display: 'grid', gap: 8 }}>
            <div className="shimmer" style={{ height: 60 }} />
            <div className="shimmer" style={{ height: 60 }} />
            <div className="shimmer" style={{ height: 60 }} />
          </div>
        ) : notes.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>No notes yet</div>
            <div>Create your first note using the “New Note” button.</div>
          </div>
        ) : (
          <div className="list">
            {notes.map((n) => (
              <NoteItem
                key={n.id}
                note={n}
                active={n.id === selectedId}
                onClick={() => onSelect(n.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
