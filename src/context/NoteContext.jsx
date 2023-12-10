import { createContext, useContext, useState } from 'react'
import { supabase } from '../supabase/supabase'
export const NoteContext = createContext();


export const useNotes = () => {
  const context = useContext(NoteContext)
  return context
}


export function NoteContextProvider({ children }) {
  const [myNotes, setMyNotes] = useState()

  const setNotes = async (noteTitle, noteDescription) => {
    try {
      const userid = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('notes')
        .insert([
          {
            name: noteTitle,
            description: noteDescription,
            user_id: userid.data.user.id
          },
        ])
        .select()
      setMyNotes([...myNotes, ...data]);
      getNotes();
    } catch (error) {
      console.log(error);
    }
  }

  const getNotes = async () => {
    try {
      const userid = await supabase.auth.getUser();
      console.log(userid.data.user.id);
      const { data, error } = await supabase.from('notes').select().eq('user_id', userid.data.user.id)
      console.log(data);
      setMyNotes(data);
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <NoteContext.Provider value={{ myNotes, setNotes, getNotes }}>
      {children}
    </NoteContext.Provider>
  )
}
