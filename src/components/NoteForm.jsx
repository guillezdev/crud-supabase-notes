import React, { useState } from 'react';
import { useNotes } from "../context/NoteContext";

const NoteForm = () => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDescription] = useState('');
  const { setNotes } = useNotes();

  const handleTitleChange = (e) => {
    setNoteTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNoteDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNotes(noteTitle, noteDescription);
    setNoteTitle('')
    setNoteDescription('')

  };

  return (
    <form onSubmit={handleSubmit} className="my-4 px-5 max-w-3xl mx-auto">
      <div className="mb-4">
        <label htmlFor="noteTitle" className="block text-gray-700 font-bold mb-2">
          Título de la Nota
        </label>
        <input
          type="text"
          id="noteTitle"
          value={noteTitle}
          onChange={handleTitleChange}
          placeholder="Ingrese el título de la nota"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="noteDescription" className="block text-gray-700 font-bold mb-2">
          Descripción de la Nota
        </label>
        <textarea
          id="noteDescription"
          value={noteDescription}
          onChange={handleDescriptionChange}
          placeholder="Ingrese la descripción de la nota"
          required
          className="w-full p-2 border rounded"
        ></textarea>
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;
