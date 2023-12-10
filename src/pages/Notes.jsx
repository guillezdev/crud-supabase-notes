import React from 'react'
import Navbar from './Navbar'
import NoteForm from '../components/NoteForm'
import NoteList from '../components/NoteList'

export default function Notes() {
 

  return (
    <div>
      <Navbar />
      <NoteForm />
      <NoteList />
    </div>
  )
}
