import { createContext, useContext, useState } from 'react'
import { Toaster, toast } from 'sonner'
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
      toast.error('An error occurred trying to create a note')
    }
  }

  const getNotes = async () => {
    try {
      const userid = await supabase.auth.getUser();
      const { data, error } = await supabase.from('notes').select().eq('user_id', userid.data.user.id).order('id', { ascending: false })
      setMyNotes(data);
    } catch (error) {
      console.log(error);
    }

  }

  const deleteNote = async (id) => {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id)
      if (error) toast.error('An error occurred while deleting the note')
      else toast.info('Note has been removed')
    } catch (error) {
      error
    } finally {
      getNotes();
    }
  }
  
  return (
    <NoteContext.Provider value={{ myNotes, setNotes, getNotes, deleteNote }}>
      {children}
      <Toaster richColors />
    </NoteContext.Provider>
  )
}
