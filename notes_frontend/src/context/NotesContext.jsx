import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { loadNotes, saveNotes, loadSelectedId, saveSelectedId } from '../utils/storage';

// PUBLIC_INTERFACE
export const NotesContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * NotesProvider encapsulates notes state, selection, and CRUD handlers with localStorage persistence.
 */
export function NotesProvider({ children }) {
  const [notes, setNotes] = useState(() => loadNotes());
  const [selectedId, setSelectedId] = useState(() => loadSelectedId());
  const [loading, setLoading] = useState(false);

  // Persist notes
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // Persist selected
  useEffect(() => {
    saveSelectedId(selectedId);
  }, [selectedId]);

  const selectNote = useCallback((id) => {
    setSelectedId(id);
  }, []);

  const createNote = useCallback(() => {
    const id = crypto.randomUUID();
    const now = Date.now();
    const newNote = { id, title: 'Untitled note', content: '', createdAt: now, updatedAt: now };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedId(id);
    return id;
  }, []);

  const updateNote = useCallback((id, patch) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n))
    );
  }, []);

  const deleteNote = useCallback((id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setSelectedId((cur) => (cur === id ? null : cur));
  }, []);

  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId]
  );

  const value = useMemo(
    () => ({
      notes,
      selectedId,
      selectedNote,
      loading,
      actions: { selectNote, createNote, updateNote, deleteNote },
    }),
    [notes, selectedId, selectedNote, loading, selectNote, createNote, updateNote, deleteNote]
  );

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useNotes returns the current notes state and actions.
 */
export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error('useNotes must be used within NotesProvider');
  return ctx;
}
