import React, { useEffect } from 'react'
import { useNotes } from "../context/NoteContext";

function NoteList() {
  const { myNotes, getNotes } = useNotes();

  useEffect(() => {
    getNotes();
  }, [])

  return (
    <div className='p-5 mx-auto max-w-3xl space-y-4'>
      <div className='flex gap-1 items-center'>
        <h1 className='text-xl font-semibold'>My Notes</h1>
        {!!myNotes && <sup>({myNotes.length})</sup>}
      </div>

      {!myNotes && <h2>You don't have notes yet</h2>}
      {!!myNotes && myNotes.map((el) => {
        return (
          <div key={el.id} className='p-5 border space-y-1 shadow-md rounded max-h-96 overflow-y-auto'>
            <h4 className='text-xl'>{el.name}</h4>
            <p className='p-2'>{el.description}</p>
          </div>
        )
      })}
    </div>
  )
}

export default NoteList