import React, { useEffect, useState } from 'react';
import '../styles/theme.css';

/**
 * PUBLIC_INTERFACE
 * NoteEditor provides inputs to edit the selected note. Auto-saves on change.
 */
export default function NoteEditor({ note, onUpdate, onDelete }) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  // Sync local state when note changes
  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
  }, [note?.id]);

  // Auto-save debounce
  useEffect(() => {
    if (!note) return;
    const h = setTimeout(() => {
      if (title !== note.title || content !== note.content) {
        onUpdate(note.id, { title, content });
      }
    }, 300);
    return () => clearTimeout(h);
  }, [title, content, note, onUpdate]);

  if (!note) {
    return (
      <div className="card" aria-live="polite" aria-busy="false">
        <div className="card-header">
          <div className="card-title">Editor</div>
        </div>
        <div className="card-body">
          <div className="empty-state">Select a note on the left to begin editing.</div>
        </div>
      </div>
    );
  }

  const updated = new Date(note.updatedAt);

  return (
    <div className="card" aria-label="Note editor">
      <div className="card-header">
        <div className="card-title">Editor</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="btn"
            onClick={() => {
              if (window.confirm('Delete this note? This cannot be undone.')) {
                onDelete(note.id);
              }
            }}
            aria-label="Delete note"
          >
            🗑 Delete
          </button>
          <button
            className="btn btn-warning"
            onClick={() => onUpdate(note.id, { title, content })}
            aria-label="Save note"
            title="Save (changes auto-save too)"
          >
            ⬇ Save
          </button>
        </div>
      </div>
      <div className="card-body" style={{ display: 'grid', gap: 8 }}>
        <input
          className="note-title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          aria-label="Note title"
        />
        <div className="note-meta">Last updated {updated.toLocaleString()}</div>
        <textarea
          className="textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
          aria-label="Note content"
        />
      </div>
    </div>
  );
}
