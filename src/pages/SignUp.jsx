import React, { useState } from 'react';
import { supabase } from '../supabase/supabase';
import { Link } from 'react-router-dom'

import { Toaster, toast } from 'sonner'

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });


      if (error) {
        console.error('Error al registrar:', error.message);
        toast.error('Try again with another email')

      } else {
        console.log('Usuario registrado:', data);
        toast.success('Account has been created')
        toast.warning('Verify your email')

      }
    } catch (error) {
      console.error('Error al registrar:', error.message);

    }
  };

  return (
    <div>

      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-5 lg:max-w-lg lg:m-auto lg:mt-40 mt-40"
        onSubmit={handleSubmit}
      >
        <h1 className='text-3xl mb-6 text-blue-500'>Sign UP</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Correo Electrónico
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 h-12 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 h-12 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Enviar
          </button>

          <Link to={'/login'} className='underline text-blue-700'>Ya tienes cuenta?</Link>
        </div>
      </form>
      <Toaster richColors expand={true} />
    </div>
  );
}
