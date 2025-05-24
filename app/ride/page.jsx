"use client";

import styles from"./ride.module.css"; 
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import Header from "../header/responsive_header";
import Footer from "../footer/responsive_footer";


export default function Ride() {      
    
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
                        <h1>Ride</h1>
                    </div>
                </div>

                <div className={styles.welcomeOrder}>
                    <div className={styles.titleOrder}>
                        <h1 className={styles.h11} id="h1-1">Destination</h1>
                        <div className={styles.pickupInput}>
                            <input type="text" className={styles.pickup} id="pickup" placeholder="Pickup Location"/>
                            <input type="text" className={styles.dropoff} id="dropoff" placeholder="Dropoff Location"/>
                        </div>

                        <div className={styles.dateTime}>
                            <input type="date" className={styles.date} id="date" placeholder="Date"/>
                            <input type="time" className={styles.time} id="time" placeholder="time"/>
                        </div>
                    </div>
                    <div className={styles.mapdes}>
                        <img src="/media/map.png" className={styles.mapHome} id="map-home" alt="map"/>
                        <img src="/media/red.png" className={styles.redMap} id="red-map" alt="red"/>
                    </div>
                </div>

                <div className={styles.rideVehicle}>
                    <h1 className={styles.rideTitle}>Ride</h1>

                    <div className={styles.rideVehicle1}>
                        <img src="/media/carwhite.png" className={styles.ride1} alt="ride1"/>
                        <div className={styles.ride1Details}>
                            <p>4 People<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M23 18.9999V16.9999C22.9993 16.1136 22.7044 15.2527 22.1614 14.5522C21.6184 13.8517 20.8581 13.3515 20 13.1299" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 1.12988C16.8604 1.35018 17.623 1.85058 18.1676 2.55219C18.7122 3.2538 19.0078 4.11671 19.0078 5.00488C19.0078 5.89305 18.7122 6.75596 18.1676 7.45757C17.623 8.15918 16.8604 8.65958 16 8.87988" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg></p>
                            <p>Affordable, Every Rides <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 10L20 1L11 20L9 12L1 10Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            </p>
                            <button className={styles.price}>25$ / 10KM</button>
                        </div>

                    </div>
                    <svg width="100%" height="2" viewBox="0 0 1746 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="-0.00146484" y1="1" x2="1746" y2="1" stroke="black"/>
                    </svg>

                    <div className={styles.rideVehicle2}>
                        <div className={styles.ride2Details}>
                            <p>5 People<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z" stroke="black" strokeWidth="2" strokeWinecap="round" strokeWinejoin="round"/>
                            <path d="M23 18.9999V16.9999C22.9993 16.1136 22.7044 15.2527 22.1614 14.5522C21.6184 13.8517 20.8581 13.3515 20 13.1299" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 1.12988C16.8604 1.35018 17.623 1.85058 18.1676 2.55219C18.7122 3.2538 19.0078 4.11671 19.0078 5.00488C19.0078 5.89305 18.7122 6.75596 18.1676 7.45757C17.623 8.15918 16.8604 8.65958 16 8.87988" stroke="black" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg></p>
                            <p>Premuim, Comfortable <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 10L20 1L11 20L9 12L1 10Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </p>
                            <button className={styles.price}>25$ / 10KM</button>
                        </div>
                        <img src="/media/blackrange.png" className={styles.ride2} alt="ride2"/>
                    </div>
                    <svg width="100%" height="2" viewBox="0 0 1746 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="-0.00146484" y1="1" x2="1746" y2="1" stroke="black"/>
                    </svg>
                    <div className={styles.rideVehicle3}>
                        <img src="/media/moto.png" className={styles.ride3} alt="ride3"/>
                        <div className={styles.ride3Details}>
                            <p>1 Person<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M23 18.9999V16.9999C22.9993 16.1136 22.7044 15.2527 22.1614 14.5522C21.6184 13.8517 20.8581 13.3515 20 13.1299" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16 1.12988C16.8604 1.35018 17.623 1.85058 18.1676 2.55219C18.7122 3.2538 19.0078 4.11671 19.0078 5.00488C19.0078 5.89305 18.7122 6.75596 18.1676 7.45757C17.623 8.15918 16.8604 8.65958 16 8.87988" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg></p>
                            <p>Affordable, Fast<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 10L20 1L11 20L9 12L1 10Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg></p>
                            <button className={styles.price}>10$ / 10KM</button>
                        </div>
                    </div>
                    <button className={styles.book}>Book Now</button>
                </div>


            </div>
        </main>

      <Footer />
    </div>
  );
}