"use client";

import styles from "./contactus.module.css";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import Header from "../header/responsive_header";
import Footer from "../footer/responsive_footer";
export default function Contactus() {

            const { user, role, loading } = useAuth();
            
              const handleLogout = async () => {
                const auth = getAuth();
                await signOut(auth);
                window.location.href = "/login";
              };
            
            if (loading) return null;

    return (
  <div className="container">
      <Header user={user} role={role} handleLogout={handleLogout} />

          <main>

            <div className={styles.mainElements}>

                <div className={styles.ride}>
                    <img src="/media/sahdow6.png" className={styles.shadow6} alt="shdw6" />
                    <div className={styles.topBackground}>
                        <h1 className={styles.title1}>Contact</h1>
                        <h1 className={styles.title2}>US</h1>
                    </div>
                </div>

                <div className={styles.contactformandphoto}>
                    <div className={styles.contactform}>
                        <div className={styles.names}>
                            <input type="text" className={styles.firstname} placeholder="First Name" />
                            <input type="text" className={styles.lastname} placeholder="Last Name" />
                        </div>
                        <div className={styles.emailandphone}>
                            <input type="email" className={styles.email} placeholder="Email" />
                            <input type="tel" className={styles.phone} placeholder="Phone Number" />
                        </div>
                        <div className={styles.message}>
                            <textarea placeholder="Leave a message here..." className={styles.textarea}></textarea>
                        </div>
                        <div className={styles.sendmessage}>
                            <button className={styles.sendbtn}>Send Message</button>
                        </div>
                    </div>

                    <div className={styles.imagecontact}>
                        <img src="/media/contactus.png" className={styles.imagecontactus} alt="contactus"/>
                        <img src="/media/shadow7.png" className={styles.shadow7} alt="shadow7"/>
                    </div>
                </div>

                <div className={styles.contactinfo}>
                    <p className={styles.email1}><svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.0832 3.74998C21.0832 2.69581 20.2207 1.83331 19.1665 1.83331H3.83317C2.779 1.83331 1.9165 2.69581 1.9165 3.74998M21.0832 3.74998V15.25C21.0832 16.3041 20.2207 17.1666 19.1665 17.1666H3.83317C2.779 17.1666 1.9165 16.3041 1.9165 15.25V3.74998M21.0832 3.74998L11.4998 10.4583L1.9165 3.74998" stroke="white" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>support@taticalrides.com</p>
                    <p className={styles.phone1}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.9999 16.92V19.92C22.0011 20.1985 21.944 20.4741 21.8324 20.7293C21.7209 20.9845 21.5572 21.2136 21.352 21.4018C21.1468 21.5901 20.9045 21.7335 20.6407 21.8227C20.3769 21.9119 20.0973 21.945 19.8199 21.92C16.7428 21.5856 13.7869 20.5341 11.1899 18.85C8.77376 17.3146 6.72527 15.2661 5.18993 12.85C3.49991 10.2412 2.44818 7.27097 2.11993 4.17997C2.09494 3.90344 2.12781 3.62474 2.21643 3.3616C2.30506 3.09846 2.4475 2.85666 2.6347 2.6516C2.82189 2.44653 3.04974 2.28268 3.30372 2.1705C3.55771 2.05831 3.83227 2.00024 4.10993 1.99997H7.10993C7.59524 1.9952 8.06572 2.16705 8.43369 2.48351C8.80166 2.79996 9.04201 3.23942 9.10993 3.71997C9.23656 4.68004 9.47138 5.6227 9.80993 6.52997C9.94448 6.8879 9.9736 7.27689 9.89384 7.65086C9.81408 8.02482 9.6288 8.36809 9.35993 8.63998L8.08993 9.90997C9.51349 12.4135 11.5864 14.4864 14.0899 15.91L15.3599 14.64C15.6318 14.3711 15.9751 14.1858 16.3491 14.1061C16.723 14.0263 17.112 14.0554 17.4699 14.19C18.3772 14.5285 19.3199 14.7634 20.2799 14.89C20.7657 14.9585 21.2093 15.2032 21.5265 15.5775C21.8436 15.9518 22.0121 16.4296 21.9999 16.92Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>+961 03 001 075</p>   
                </div>
            </div>
          </main>

        <Footer />
    </div>
  );
}