"use client";

import styles from"./ride.module.css"; 
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import Header from "../header/responsive_header";
import Footer from "../footer/responsive_footer";
import { useRouter } from 'next/navigation';
import { getFirestore, collection, addDoc, serverTimestamp, doc, getDoc, Timestamp } from "firebase/firestore";
import { format, parse } from 'date-fns';

export default function Ride() {      
    
        const { user, role, loading } = useAuth();
        const [pickup, setPickup] = useState("");
        const [dropoff, setDropoff] = useState("");
        const [date, setDate] = useState(""); // Keeps YYYY-MM-DD string from input
        const [time, setTime] = useState(""); // Keeps HH:MM string from input
        const [selectedVehicle, setSelectedVehicle] = useState("");

        const router = useRouter();
        useEffect(() => {
          if (!loading && !user) {
            router.push("/login");
          }
        }, [loading, user]);

        const handleSubmit = async () => {
            if (!user) {
              alert("Please log in to book a ride.");
              return;
            }
          
            if (!pickup || !dropoff || !date || !time || !selectedVehicle) {
              alert("Please fill out all fields and select a vehicle.");
              return;
            }
          
            const db = getFirestore();

            // --- Date/Time Processing with date-fns ---
            let formattedDateForTelegram = date; // Default to original string
            let formattedTimeForTelegram = time; // Default to original string
            let rideDateTimeStamp = null; // To store combined timestamp for Firestore

            try {
                // Combine date and time strings from state (YYYY-MM-DD and HH:MM)
                const dateTimeString = `${date}T${time}:00`; 
                // Parse the combined string into a JavaScript Date object
                const combinedDateTime = parse(dateTimeString, "yyyy-MM-dd'T'HH:mm:ss", new Date());

                if (!isNaN(combinedDateTime)) { // Check if parsing was successful
                    // Format for display (e.g., in Telegram message)
                    formattedDateForTelegram = format(combinedDateTime, 'PPP'); // e.g., "May 31st, 2025"
                    formattedTimeForTelegram = format(combinedDateTime, 'p');   // e.g., "1:01 PM"
                    
                    // Create a Firestore Timestamp object for storage
                    rideDateTimeStamp = Timestamp.fromDate(combinedDateTime);
                } else {
                    console.warn("Could not parse date/time string:", dateTimeString);
                    // Keep default string values if parsing fails
                }
            } catch (parseError) {
                console.error("Error parsing or formatting date/time:", parseError);
                // Keep default string values in case of error
            }
            // --- End Date/Time Processing ---
          
            try {
              // Save ride to main "rides" collection
              // Store the combined Firestore Timestamp if available, otherwise store original strings
              await addDoc(collection(db, "rides"), {
                userId: user.uid,
                pickup,
                dropoff,
                ...(rideDateTimeStamp ? { rideDateTime: rideDateTimeStamp } : { date, time }), // Store combined timestamp OR original strings
                vehicle: selectedVehicle,
                createdAt: serverTimestamp(),
              });
          
              // Save under user-specific rides (using the same logic for date/time)
              const userDocRefForRide = doc(db, "users", user.uid);
              await addDoc(collection(userDocRefForRide, "rides"), {
                pickup,
                dropoff,
                 ...(rideDateTimeStamp ? { rideDateTime: rideDateTimeStamp } : { date, time }), // Store combined timestamp OR original strings
                vehicle: selectedVehicle,
                createdAt: serverTimestamp(),
              });
          
              // Fetch user details
              let userName = "N/A";
              let userLastName = "";
              let userPhone = "N/A";
          
              try {
                const userDocRef = doc(db, "users", user.uid);
                const userDocSnap = await getDoc(userDocRef);
          
                if (userDocSnap.exists()) {
                  const userData = userDocSnap.data();
                  userName = userData.name || "N/A";
                  userLastName = userData.lastName || "";
                  userPhone = userData.phone || "N/A";
                } else {
                  console.log("User document not found for UID:", user.uid);
                }
              } catch (fetchError) {
                console.error("Error fetching user details for notification:", fetchError);
              }
          
              const fullUserName = `${userName} ${userLastName}`.trim();
          
              // Use the formatted date/time for the Telegram message
              const telegramMessage = `
          🚗 *New Ride Booked!*
          👤 *User:* ${fullUserName}
          📞 *Phone:* ${userPhone}
          📍 *From:* ${pickup}
          🏁 *To:* ${dropoff}
          📅 *Date:* ${formattedDateForTelegram}
          ⏰ *Time:* ${formattedTimeForTelegram}
          🚘 *Vehicle:* ${selectedVehicle}
              `.trim();
          
              // Send Telegram message
              const telegramRes = await fetch(`https://api.telegram.org/bot7393416999:AAEPWpc8mwGua4oBoW_KTAtmgqQIk1C8HHw/sendMessage`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  chat_id: "-1002516763289",
                  text: telegramMessage,
                  parse_mode: "Markdown",
                }),
              });
          
              const resJson = await telegramRes.json();
              if (!resJson.ok) {
                console.error("Telegram API error:", resJson);
                alert("Ride booked, but Telegram notification failed.");
              } else {
                console.log("Telegram message sent:", resJson);
              }
          
              alert("Ride booked successfully!");
          
              // Reset form
              setPickup("");
              setDropoff("");
              setDate("");
              setTime("");
              setSelectedVehicle("");
            } catch (error) {
              console.error("Error booking ride:", error);
              alert("Failed to book ride. Please check console for details.");
            }
          };
                  
          
        
        const handleLogout = async () => {
            const auth = getAuth();
            await signOut(auth);
            window.location.href = "/login"; // Redirect to login after logout
        };
        
        // Show loading indicator or null while auth state is loading
        if (loading) return <div>Loading...</div>; 

  // --- JSX remains the same, using standard date/time inputs --- 
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
                            <input
                                type="text"
                                className={styles.pickup}
                                id="pickup"
                                placeholder="Pickup Location"
                                value={pickup}
                                onChange={(e) => setPickup(e.target.value)}
                                /> 

                            <input
                                type="text"
                                className={styles.dropoff}
                                id="dropoff"
                                placeholder="Dropoff Location"
                                value={dropoff}
                                onChange={(e) => setDropoff(e.target.value)}
                                />         
                        </div>

                    <div className={styles.dateTime}>
                        <div className={styles.inputWrapper}>
                            <label className={`${!date ? styles.placeholder : styles.filled}`} htmlFor="date">
                            Date
                            </label>
                            <input
                            type="date"
                            className={styles.date}
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputWrapper}>
                            <label className={`${!time ? styles.placeholder : styles.filled}`} htmlFor="time">
                            Time
                            </label>
                            <input
                            type="time"
                            className={styles.time}
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            />
                        </div>
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
                            <button
                                className={`${styles.price} ${selectedVehicle === "Car" ? styles.active : ""}`}
                                onClick={() => setSelectedVehicle("Car")}
                                >
                                25$ / 10KM
                            </button>
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
                        <button
                            className={`${styles.price} ${selectedVehicle === "premium" ? styles.active : ""}`}
                            onClick={() => setSelectedVehicle("premium")}
                            >
                            25$ / 10KM
                        </button>
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
                            <button
                                className={`${styles.price} ${selectedVehicle === "moto" ? styles.active : ""}`}
                                onClick={() => setSelectedVehicle("moto")}
                                >
                                10$ / 10KM
                            </button>
                        </div>
                    </div>
                    <button className={styles.book} onClick={handleSubmit}>Book Now</button>
                </div>


            </div>
        </main>

      <Footer />
    </div>
  );
}

