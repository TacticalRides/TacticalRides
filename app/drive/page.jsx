"use client";
import styles from"./drive.module.css"; 
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import Header from "../header/responsive_header";
import Footer from "../footer/responsive_footer";

export default function Drive() {   
    
      const { user, role, loading } = useAuth();
    
      const handleLogout = async () => {
        const auth = getAuth();
        await signOut(auth);
        window.location.href = "/login";
      };
    
      if (loading) return null;

    return (
  <div className="container">

        <Header user={user} role={role} handleLogout={handleLogout}/>

          <main>
            <div className={styles.mainElements}>
                <div className={styles.ride}>
                    <img src="/media/sahdow6.png" className={styles.shadow6} alt="shdw6" />
                    <div className={styles.topBackground}>
                        <h1>Drive</h1>
                    </div>
                </div>
                <div className={styles.mapdrive}>
                    <img src="/media/mapdrive.png" className={styles.mapd} alt="mapdrive" />
                </div>
                <div className={styles.destination}>
                    <h1 className={styles.h11}>10 MINS AWAY</h1>
                    <div className={styles.titleOrder}>
                        <div className={styles.decor}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '10px', height: '10px', backgroundColor: 'black', borderRadius: '50%' }}></div>
                                <div style={{ width: '1.5px', height: '35px', backgroundColor: '#C10606' }}></div>
                                <div style={{ width: '10px', height: '10px', backgroundColor: 'black' }}></div>
                            </div>
                        </div>
                        <div className={styles.go}>
                            <svg width="18" height="18" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.2674 21.6381L0.717438 16.5006L42.8449 0.0606384L26.4049 42.1881L21.2674 21.6381Z" fill="black"/>
                            </svg>
                        </div>
                        <div className={styles.pickupInput}>
                            <input type="text" className={styles.pickup} id="pickup" placeholder="Pickup Location"/>
                            <input type="text" className={styles.dropoff} id="dropoff" placeholder="Dropoff Location"/>
                        </div>

                        <div className={styles.dateTime}>
                            <input type="date" className={styles.date} id="date" placeholder="Date"/>
                            <input type="time" className={styles.time} id="time" placeholder="time"/>
                        </div>

                        <div className={styles.orderbuttons}>
                            <button className={styles.call} id="book">Call Customer</button>
                            <button className={styles.gmaps} id="book">Google Maps</button>
                        </div>
                    </div>
                </div>
            </div>
          </main>
          <Footer/>
    </div>
  );
}