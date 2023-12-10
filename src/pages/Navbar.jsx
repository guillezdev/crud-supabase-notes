import { supabase } from '../supabase/supabase'
import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [user, setUser] = useState()

  useEffect(() => {

    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session.user.email)
    })
    return () => {
      setUser(null)
    }
  }, [])



  const handleSingOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (!error) {
        console.error('A ocurrido un error', error);
      }
      else
        console.log('logout');

    } catch (error) {
      console.error(error);
    }
  }
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
   

      <div className="text-white">
        <span className="text-lg">{user || 'User@email.com'}</span>
      </div>

      <div>
        <button
          onClick={handleSingOut}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
