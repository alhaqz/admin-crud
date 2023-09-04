'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/feature/authSlice';
import { useRouter } from 'next/navigation';

function LogoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    try {
      dispatch(logout());

      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <div className="flex items-center flex-col mx-auto w-screen max-w-[1080px]">
      <div className="mt-[8vh] text-center shadow-md p-2 border-2 w-[350px] flex h-[200px] flex-col my-auto items-center rounded-md">
        <div className="mt-[60px]">
          <p className=" my-auto">Apakah anda yakin ingin keluar?</p>
          <button
            onClick={handleLogout}
            className="mx-2 mt-2 rounded-md px-2 py-1  text-white  transition-all bg-red-500  border-2 hover:bg-red-700 "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;
