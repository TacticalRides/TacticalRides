import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = ({ user, role, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        !event.target.closest('.mobile-menu') &&
        !event.target.closest('.hamburger-menu')
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header>
      <div className="logo">
        <img
          src="/logo final/TACTICAL RIDES-01.png"
          id="logo-header"
          alt="logo-header"
        />
      </div>

      {/* Desktop Navigation */}
      <div className="elements">
        <Link href="/">Home</Link>

        {/* Public or Customer View */}
        {(!user || role === 'Customer') && (
          <>
            <Link href="/aboutus">About Us</Link>
            <Link href="/ride">Ride</Link>
            <Link href="/contactus">Contact Us</Link>
            {role === 'Customer' && user?.photoURL && (
              <Image
                src={user.photoURL}
                alt="Profile"
                width={35}
                height={35}
                style={{ borderRadius: '50%' }}
              />
            )}
            {role === 'Customer' && (
              <button id="logout-header" onClick={handleLogout}>Logout</button>
            )}
          </>
        )}

        {/* Driver View */}
        {role === 'Driver' && (
          <>
            <Link href="/drive">Drive</Link>
            {user?.photoURL && (
              <Image
                src={user.photoURL}
                alt="Profile"
                width={35}
                height={35}
                style={{ borderRadius: '50%' }}
              />
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

        {/* Admin View */}
        {role === 'Admin' && (
          <>
            <Link href="/ride">Ride</Link>
            <Link href="/drive">Drive</Link>
            <button id="logout-header" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>

      {/* Login/Signup for unauthenticated users */}
      {!user && (
        <div className="buttons-header">
          <Link href="/login">
            <button id="login-header">Login</button>
          </Link>
          <Link href="/signup">
            <button id="signup-header">Sign up</button>
          </Link>
        </div>
      )}

      {/* Hamburger Button for Mobile */}
      <button
        className="hamburger-menu"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>

        {/* Public or Customer View */}
        {(!user || role === 'Customer') && (
          <>
            <Link href="/aboutus" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link href="/ride" onClick={() => setIsMenuOpen(false)}>Ride</Link>
            <Link href="/contactus" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
            {role === 'Customer' && user?.photoURL && (
              <Image
                src={user.photoURL}
                alt="Profile"
                width={35}
                height={35}
                style={{ borderRadius: '50%' }}
              />
            )}
            {role === 'Customer' && (
              <button
                id="logout-header"
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
              >
                Logout
              </button>
            )}
          </>
        )}

        {/* Driver View */}
        {role === 'Driver' && (
          <>
            <Link href="/drive" onClick={() => setIsMenuOpen(false)}>Drive</Link>
            {user?.photoURL && (
              <Image
                src={user.photoURL}
                alt="Profile"
                width={35}
                height={35}
                style={{ borderRadius: '50%' }}
              />
            )}
            <button
              onClick={() => { handleLogout(); setIsMenuOpen(false); }}
            >
              Logout
            </button>
          </>
        )}

        {/* Admin View */}
        {role === 'Admin' && (
          <>
            <Link href="/ride" onClick={() => setIsMenuOpen(false)}>Ride</Link>
            <Link href="/drive" onClick={() => setIsMenuOpen(false)}>Drive</Link>
            <button
              id="logout-header"
              onClick={() => { handleLogout(); setIsMenuOpen(false); }}
            >
              Logout
            </button>
          </>
        )}

        {/* Mobile Login/Signup */}
        {!user && (
          <div className="mobile-buttons">
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
              <button id="login-header">Login</button>
            </Link>
            <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
              <button id="signup-header">Sign up</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
