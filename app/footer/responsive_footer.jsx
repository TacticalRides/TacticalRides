import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer-elements">
        <div className="logo-footer">
          <img src="/logo final/TACTICAL RIDES-03.png" id="logo-footer1" alt="logo-footer"/>
        </div>
        <div className="text-ft">
          <p>Arrive Safely. Arrive Confidently.</p>
          <p id="p-down">Arrive with Tactical Rides.</p>
        </div>
        <div className="pages-footer">
          <div className="pages-1">
            <a href="">Rides</a>
            <a href="">Drives</a>
          </div>
          <div className="pages-2">
            <a href="">About Us</a>
            <a href="">Contact Us</a>
          </div>
          <div className="social-media">
            <p>Follow Us</p>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.instagram.com" target="_blank" className="social-icon"><i className="fab fa-instagram"></i></a>
              <a href="https://www.tiktok.com" target="_blank" className="social-icon"><i className="fab fa-tiktok"></i></a>
            </div>
          </div>
        </div>
      </div>
      <hr style={{border: "1px solid white"}} id="line-footer"/>
      <p id="c-footer">Copyright © All rights reserved, tacticalrides</p>
    </footer>
  );
};

export default Footer;
