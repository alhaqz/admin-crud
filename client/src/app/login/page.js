'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/redux/feature/authSlice';
import { useRouter } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  console.log('userrr==<', user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(login({ username, password }));
      console.log(response);

      if (response.type === 'auth/login/fulfilled') {
        router.push('/');
      } else {
        console.error('Login failed:', response.data.error);
        setLoginError(true);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError(true);
    }
  };

  return (
    <div className="flex items-center flex-col mx-auto w-screen max-w-[1080px]">
      <div className="mt-[8vh] text-center">
        <h1 className="text-2xl">Login Page</h1>
        <p>Please enter the username and password</p>
        <form
          onSubmit={handleSubmit}
          className="border-2 p-5 w-[400px] rounded-md shadow-md text-md mt-6"
        >
          <div className="flex mt-1 flex-col items-start">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 w-full"
            />
          </div>
          <div className="flex mt-1 flex-col items-start">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="mx-2 mt-2 rounded-md px-2 py-1 bg-blue-400 text-white border-2 transition-all hover:bg-white hover:text-blue-400 hover:border-2 hover:border-blue-400"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Masuk'}
          </button>
        </form>
        {loginError && (
          <p className=" text-red-500">Incorrect username or password.</p>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
