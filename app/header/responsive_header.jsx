import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = ({ user, role, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.hamburger-menu')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header>
      <div className="logo">
        <img src="/logo final/TACTICAL RIDES-01.png" id="logo-header" alt="logo-header" />
      </div>

      {/* Desktop Navigation */}
      <div className="elements">
        <Link href="/">Home</Link>

        {role === "Customer" && (
          <>
            <Link href="/aboutus">About Us</Link>
            <Link href="/ride">Ride</Link>
            <Link href="/contactus">Contact Us</Link>
            {user?.photoURL && (
              <Image
                src={user.photoURL}
                alt="Profile"
                width={35}
                height={35}
                style={{ borderRadius: "50%" }}
              />
            )}
            <button id="logout-header" onClick={handleLogout}>Logout</button>
          </>
        )}

        {role === "Driver" && (
          <>
            <Link href="/aboutus">About Us</Link>
            <Link href="/drive">Drive</Link>
            {user?.photoURL && (
              <Image
                src={user.photoURL}
                alt="Profile"
                width={35}
                height={35}
                style={{ borderRadius: "50%" }}
              />
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

        {role === "Admin" && (
          <>
            <Link href="/ride">Ride</Link>
            <Link href="/drive">Drive</Link>
            <div className="buttons-header">
              <button id="logout-header" onClick={handleLogout}>Logout</button>
            </div>
          </>
        )}
      </div>

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

      {/* Mobile Hamburger Menu */}
      <button 
        className="hamburger-menu" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        
        {role === "Customer" && (
          <>
            <Link href="/aboutus" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link href="/ride" onClick={() => setIsMenuOpen(false)}>Ride</Link>
            <Link href="/contactus" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
            {user?.photoURL && (
              <Image
                src={user.photoURL}
                alt="Profile"
                width={35}
                height={35}
                style={{ borderRadius: "50%" }}
              />
            )}
            <button id="logout-header" onClick={() => {handleLogout(); setIsMenuOpen(false);}}>Logout</button>
          </>
        )}

        {role === "Driver" && (
          <>
            <Link href="/aboutus" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link href="/drive" onClick={() => setIsMenuOpen(false)}>Drive</Link>
            {user?.photoURL && (
              <Image
                src={user.photoURL}
                alt="Profile"
                width={35}
                height={35}
                style={{ borderRadius: "50%" }}
              />
            )}
            <button onClick={() => {handleLogout(); setIsMenuOpen(false);}}>Logout</button>
          </>
        )}

        {role === "Admin" && (
          <>
            <Link href="/ride" onClick={() => setIsMenuOpen(false)}>Ride</Link>
            <Link href="/drive" onClick={() => setIsMenuOpen(false)}>Drive</Link>
            <button id="logout-header" onClick={() => {handleLogout(); setIsMenuOpen(false);}}>Logout</button>
          </>
        )}

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
