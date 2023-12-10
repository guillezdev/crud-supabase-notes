import React, { useEffect } from 'react'
import { useNotes } from "../context/NoteContext";
import deleteimg from '../assets/delete.svg';

function NoteList() {

  const { myNotes, getNotes, deleteNote } = useNotes();

  useEffect(() => {
    getNotes();
  }, [])

  const handleDeleteNote = async (id) => {
    deleteNote(id)
  }

  return (
    <div className='p-5 mx-auto max-w-3xl space-y-4'>
      <div className='flex gap-1 items-center'>
        <h1 className='text-xl font-semibold'>My Notes</h1>
        {!!myNotes && <sup>({myNotes.length})</sup>}
      </div>

      {!myNotes && <h2>You don't have notes yet</h2>}
      {!!myNotes && myNotes.map((el) => {
        return (
          <div key={el.id} className='p-5 border space-y-1 shadow-md rounded max-h-96 overflow-y-auto relative pr-10'>
            <h4 className='text-xl'>{el.name}</h4>
            <p className='p-2'>{el.description}</p>
            <button onClick={() => { handleDeleteNote(el.id) }} className='absolute right-4 top-4'><img src={deleteimg} alt="delete" /></button>
          </div>
        )
      })}
    </div>
  )
}

export default NoteList