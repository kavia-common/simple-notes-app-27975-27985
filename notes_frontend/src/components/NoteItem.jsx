import React, { useMemo } from 'react';
import '../styles/theme.css';

/**
 * PUBLIC_INTERFACE
 * NoteItem renders a single note teaser in the list.
 */
export default function NoteItem({ note, active, onClick }) {
  const preview = useMemo(() => {
    const text = (note.content || '').replace(/\n/g, ' ').trim();
    return text.length > 80 ? text.slice(0, 77) + '…' : text || 'No content yet';
  }, [note.content]);

  const updated = new Date(note.updatedAt);
  const subtitle = `${updated.toLocaleDateString()} ${updated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  return (
    <div
      className={`list-item ${active ? 'active' : ''}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      aria-pressed={active}
    >
      <div style={{ fontWeight: 700, marginBottom: 4 }}>{note.title || 'Untitled note'}</div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>{subtitle}</div>
      <div style={{ fontSize: 13, color: 'var(--text)' }}>{preview}</div>
    </div>
  );
}
