import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Notes from './pages/Notes'
import NotFound from './pages/NotFound'
import LogIn from './pages/LogIn'
import supabase from './supabase/supabase'
import { useNotes } from "./context/NoteContext";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/Login')
      }
      else
        navigate('/Notes');
    })

  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/Login' element={<LogIn />} />
        <Route path='/Notes' element={<Notes />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
