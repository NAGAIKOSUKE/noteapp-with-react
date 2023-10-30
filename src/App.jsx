import { useEffect, useState } from "react";
import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    setActiveNote(notes[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddNote = () => {
    const newNote = {
      id: uuidv4(),
      title: "新しいノート",
      content: "",
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
  };

  const onDeleteNote = (deleteid) => {
    const filterNotes = notes.filter((note) => note.id !== deleteid);
    setNotes(filterNotes);
  };
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id == updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    });
    setNotes(updatedNotesArray);
  };

  return (
    <div className="App">
      <Sidebar
        onAddNote={onAddNote}
        notes={notes}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
