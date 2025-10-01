const STORAGE_KEY = 'notes.v1';
const SELECTED_KEY = 'notes.selected.v1';
const FIRST_RUN_KEY = 'notes.firstrun.v1';

const sampleNotes = [
  {
    id: crypto.randomUUID(),
    title: 'Welcome to Ocean Notes',
    content: 'This is your first note. Edit the title and content to get started.\n\nTips:\n- Use the New Note button to create.\n- Your notes auto-save.\n- They persist in your browser.',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: crypto.randomUUID(),
    title: 'Ocean Professional Theme',
    content: 'Primary #2563EB, Secondary #F59E0B, Error #EF4444, Background #f9fafb, Surface #ffffff, Text #111827.',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

export function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First run seed
      if (!localStorage.getItem(FIRST_RUN_KEY)) {
        localStorage.setItem(FIRST_RUN_KEY, '1');
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleNotes));
        return sampleNotes;
      }
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveNotes(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // ignore
  }
}

export function loadSelectedId() {
  try {
    return localStorage.getItem(SELECTED_KEY) || null;
  } catch {
    return null;
  }
}

export function saveSelectedId(id) {
  try {
    if (id) localStorage.setItem(SELECTED_KEY, id);
    else localStorage.removeItem(SELECTED_KEY);
  } catch {
    // ignore
  }
}
