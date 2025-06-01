"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import Header from "../app/header/responsive_header";
import Footer from "../app/footer/responsive_footer";

export default function Home() {
  const { user, role, loading } = useAuth();
  const [date, setDate] = useState(""); // Keeps YYYY-MM-DD string from input
    const [time, setTime] = useState(""); // Keeps HH:MM string from input

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
              <div className={styles.welcomeOrder}>
                  <div className={styles.titleOrder}>
                      <h1 className={styles.h11} id="h1-1">Arrive Safely, Every time</h1>
                      <h1 className={styles.h12} id="h1-2">With Tactical Rides.</h1>
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
                      <Link href="/ride">
                          <button className={styles.ridee} style={{ cursor: "pointer" }}>Ride</button>
                      </Link>
                  </div>
                  <div className={styles.mapdes}>
                      <img src="/media/map.png" className={styles.mapHome} id="map-home" alt="map"/>
                      <img src="/media/red.png" className={styles.redMap} id="red-map" alt="red"/>
                  </div>
              </div>


              <div className={styles.aboutUs}>
                  <div className={styles.picAbout}>
                      <img src="/media/about-pic.png" className={styles.AboutPic} id="about-pic" alt="about"/>
                      <img src="/media/shadow1.png" className={styles.sh1} id="sh1" alt="sh1"/>
                  </div>
                  <div className={styles.textAbt}>
                      <div className={styles.titleAbt}>
                          <h1 className={styles.h13} id="h1-3">About</h1>
                          <h1 className={styles.h14} id="h1-4">Tactical Rides</h1>
                      </div>
                      <p>Tactical Rides is a premium ride-sharing service dedicated to </p>
                      <p>providing passengers with the highest level of safety and</p>
                      <p>comfort. We believe that every journey should be an experience</p>
                      <p>of peace of mind, and we've built our platform around this core</p>
                      <p>principle all over Lebanon.</p>
                      <Link href="/aboutus">
                          <button className={styles.readAbt} id="read-abt">Read More</button>
                      </Link>
                  </div>
              </div>

              <div className={styles.setsUs}>

                  <div className={styles.setsTitle}>
                      <h1 className={styles.h15}id="h1-5">Your Safe Ride: </h1>
                      <h1 className={styles.h16}id="h1-6">What Sets Us Apart</h1>
                  </div>

                  <div className={styles.setSections}>
                      <div className={styles.safety}>
                          <h1><svg width="33" height="36" viewBox="0 0 33 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_7_914)">
                              <path d="M16.5002 36C16.405 36 16.3087 35.9911 16.2135 35.9737C16.1001 35.9526 15.0756 35.7544 13.5732 35.1451C12.1907 34.5849 10.104 33.5456 8.01685 31.7746C5.67379 29.7868 3.80939 27.3056 2.47507 24.4001C0.832583 20.8253 0 16.6032 0 11.852V7.56628C0 6.79287 0.552355 6.13255 1.31326 5.99676C3.20763 5.65991 5.13561 5.15079 7.04415 4.48318C8.5773 3.9469 10.1019 3.30766 11.5752 2.58411C14.0142 1.38549 15.5052 0.345765 15.5801 0.29307C16.1325 -0.0984989 16.8728 -0.0976883 17.4239 0.295502C17.4373 0.304825 18.9441 1.36482 21.4252 2.58452C22.8989 3.30847 24.4235 3.94731 25.9567 4.48358C27.8652 5.1512 29.7932 5.66032 31.6863 5.99676C32.448 6.13255 33.0004 6.79287 33.0004 7.56628V11.852C33.0004 16.6028 32.1678 20.8249 30.5253 24.4009C29.191 27.3064 27.3262 29.7876 24.9836 31.775C22.8964 33.5456 20.8101 34.5853 19.4272 35.1455C17.9252 35.7544 16.9003 35.953 16.7885 35.9737C16.6922 35.9911 16.5958 36 16.5006 36H16.5002ZM1.79839 7.73815V11.8516C1.79839 16.3417 2.5759 20.3109 4.10906 23.649C5.33242 26.3133 7.03848 28.5857 9.17947 30.4021C11.0848 32.0187 12.9876 32.9664 14.2483 33.4771C15.4534 33.9655 16.3143 34.1577 16.5006 34.1962C16.6841 34.1585 17.5458 33.9668 18.7525 33.4775C20.0136 32.9668 21.916 32.0187 23.8213 30.4025C25.9623 28.5861 27.6684 26.3142 28.8922 23.6494C30.4253 20.3105 31.2028 16.3413 31.2028 11.852V7.73855C29.2704 7.38549 27.3068 6.86218 25.3642 6.18282C23.7634 5.62303 22.172 4.95582 20.634 4.20024C18.3885 3.09688 16.9173 2.12809 16.5014 1.84435C16.0754 2.13458 14.6066 3.10012 12.3685 4.19984C10.8309 4.95541 9.2394 5.62222 7.63822 6.18241C5.69606 6.86178 3.73285 7.38468 1.7992 7.73815H1.79839Z" fill="black"/>
                              <path d="M16.5002 27.3599C14.1466 27.3599 11.934 26.4426 10.2696 24.7766C8.60525 23.1106 7.68884 20.8958 7.68884 18.5399C7.68884 16.184 8.60525 13.9691 10.2696 12.3031C11.934 10.6372 14.1466 9.71985 16.5002 9.71985C18.8538 9.71985 21.0665 10.6372 22.7308 12.3031C24.3952 13.9691 25.3116 16.184 25.3116 18.5399C25.3116 20.8958 24.3952 23.1106 22.7308 24.7766C21.0665 26.4426 18.8538 27.3599 16.5002 27.3599ZM16.5002 11.52C12.6329 11.52 9.48683 14.6692 9.48683 18.5403C9.48683 22.4114 12.6329 25.5605 16.5002 25.5605C20.3675 25.5605 23.5136 22.4114 23.5136 18.5403C23.5136 14.6692 20.3675 11.52 16.5002 11.52Z" fill="black"/>
                              <path d="M15.664 22.1499C15.434 22.1499 15.2039 22.062 15.0282 21.8865L12.5722 19.4284C12.2211 19.077 12.2211 18.5071 12.5722 18.1556C12.9233 17.8042 13.4926 17.8042 13.8437 18.1556L15.664 19.9773L19.1567 16.4811C19.5078 16.1297 20.0771 16.1297 20.4282 16.4811C20.7793 16.8325 20.7793 17.4025 20.4282 17.7539L16.2997 21.8865C16.124 22.0624 15.894 22.1499 15.664 22.1499Z" fill="black"/>
                              </g>
                              <defs>
                              <clipPath id="clip0_7_914">
                              <rect width="33" height="36" fill="white"/>
                              </clipPath>
                              </defs>
                              </svg>
                              Safety</h1>
                          <li>Throughly screened drivers</li>
                          <li>Advanced safety features</li>
                          <li>Well-maintained vehicles</li>
                      </div>
                      <div className={styles.Reliability}>
                          <h1><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15 7.5V15L20 17.5M27.5 15C27.5 21.9036 21.9036 27.5 15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Reliability</h1>
                          <li>Real-time tracking</li>
                          <li>On-time arrivals</li>
                          <li>Professional drivers</li>
                      </div>
                      <div className={styles.convenience}>
                          <h1><svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M13.5 16.5L18 21L33 6M31.5 18V28.5C31.5 29.2956 31.1839 30.0587 30.6213 30.6213C30.0587 31.1839 29.2956 31.5 28.5 31.5H7.5C6.70435 31.5 5.94129 31.1839 5.37868 30.6213C4.81607 30.0587 4.5 29.2956 4.5 28.5V7.5C4.5 6.70435 4.81607 5.94129 5.37868 5.37868C5.94129 4.81607 6.70435 4.5 7.5 4.5H24" stroke="#1E0606" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Convenience</h1>
                          <li>User-friendly website</li>
                          <li>Choose your ride</li>
                          <li>24/7 support</li>
                      </div>
                  </div>
                  <Link href="/ride">                     
                      <button className={styles.bookHome} id="book-home">Book Now</button>                  
                  </Link>
              </div>


              <div className={styles.ourServices}>
                  <div className={styles.textOurservices}>
                      <div className={styles.ourServicesttl}>
                          <h1 className={styles.h17} id="h1-7">Our</h1>
                          <h1>Services</h1>
                      </div>

                      <div className={styles.safeServices}>
                          <h1>Safe and Reliable Rides</h1>
                          <li>Real-time ride tracking</li>
                          <li>On-time arrivals</li>
                          <li>Professional and courteous drivers</li>
                      </div>

                      <div className={styles.ConvenientEasy}>
                          <h1>Convenient & Easy</h1>
                          <li>User-friendly website with easy booking</li>
                          <li>Choose from various ride options</li>
                          <li>24/7 customer support</li>
                      </div>

                      <button className={styles.bookHome} id="book-home">Book Now</button>
                  </div>

                  <div className={styles.ServicesPic}>
                      <img src="/media/services-home.png" className={styles.servicesh} id="services-h" alt="services"/>
                      <img src="/media/shadow4.png" id="shadow-3" className={styles.shw3} alt="shadow-3"/>
                  </div>
              </div>

              <div className={styles.homeQuaote}>
                  <div className={styles.pictextquaote}>
                      <img src="/media/shadow5.png" className={styles.sh5} id="shadow5" alt="shadow"/>
                      <div className={styles.textQ}>
                          <h1 className={styles.h18} id="h1-8">Go Anywhere with Confidence.</h1>
                          <h1 className={styles.h19} id="h1-9">Tactical Rides: Safety-Focused Transportation.</h1>
                      </div>
                  </div>
              </div>
          </div>
      </main>

      <Footer />
    </div>
  );
}
