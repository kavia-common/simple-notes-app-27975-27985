import React from 'react';
import './styles/theme.css';
import TopNav from './components/TopNav';
import Sidebar from './components/Sidebar';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';
import { NotesProvider, useNotes } from './context/NotesContext';

/**
 * PUBLIC_INTERFACE
 * AppShell composes the layout using context state.
 */
function AppShell() {
  const { notes, selectedId, selectedNote, loading, actions } = useNotes();

  return (
    <div className="app-shell">
      <TopNav onNew={actions.createNote} />
      <Sidebar
        onNew={actions.createNote}
        onDelete={() => selectedId && actions.deleteNote(selectedId)}
        canDelete={!!selectedId}
      />
      <main className="main">
        <NotesList
          notes={notes}
          selectedId={selectedId}
          onSelect={actions.selectNote}
          loading={loading}
        />
        <NoteEditor
          note={selectedNote}
          onUpdate={actions.updateNote}
          onDelete={actions.deleteNote}
        />
      </main>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * App is the root component with NotesProvider context.
 */
export default function App() {
  return (
    <NotesProvider>
      <AppShell />
    </NotesProvider>
  );
}
