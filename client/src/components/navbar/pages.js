'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

function Navbar() {
  const isAdmin = useSelector((state) => state.auth.isAdmin || false);
  const user = useSelector((state) => state.auth.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(user);
    console.log('user is===?', user);
  }, [user]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mx-auto fixed inset-x-0 z-50 font-semibold font-balto">
      <div className="bg-[#fbfefd] border-b-green-500 shadow-md border-b-2 w-full flex items-center justify-center mx-auto">
        <div className="max-w-[1080px] mx-5 flex flex-row items-center  h-[6vh]">
          <nav className="flex flex-row items-center justify-between font-balto">
            <Link href="/" onClick={scrollToTop}>
              <div className="mx-4 text-green-600">MyCompany.id</div>
            </Link>
            {!isAdmin && (
              <Link href="/" onClick={scrollToTop}>
                <div className="mx-4">Home</div>
              </Link>
            )}
            {isLoggedIn && !isAdmin && (
              <>
                <Link href="/users" onClick={scrollToTop}>
                  <div className="mx-4">Users</div>
                </Link>
                <Link href="/employee" onClick={scrollToTop}>
                  <div className="mx-4">Employee</div>
                </Link>
                <div className="bg-gray-400 p-[0.1em] rounded-md text-white hover:bg-gray-700">
                  <Link href="/logout" onClick={scrollToTop}>
                    <div className="mx-4 ">Logout</div>
                  </Link>
                </div>
              </>
            )}
            {!isAdmin && !isLoggedIn && (
              <>
                <div className="bg-gray-400 p-[0.1em] rounded-md text-white hover:bg-gray-700">
                  <Link href="/login" onClick={scrollToTop}>
                    <div className="mx-4 ">Login</div>
                  </Link>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
