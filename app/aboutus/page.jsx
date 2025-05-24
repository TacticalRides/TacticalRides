"use client";

import styles from "./aboutus.module.css";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import Header from "../header/responsive_header";
import Footer from "../footer/responsive_footer";

export default function aboutus() {
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
                        <h1 className={styles.title1}>About</h1>
                        <h1 className={styles.title2}>Tactical Rides</h1>
                    </div>
                </div>

                <div className={styles.aboutus}>
                    <div className={styles.picabt}>
                        <img src="/media/about-pic.png" className={styles.abtpic} alt="abtpic" />
                        <img src="/media/shadow2.png" className={styles.sh2} alt="sh2" />
                    </div>

                    <div className={styles.textabt}>
                        <div className={styles.ttlabt}>
                            <h1>About</h1>
                            <h1>Tactical Rides</h1>
                        </div>
                        <p>Tactical Rides is a premium ride-sharing service dedicated to</p>
                        <p>providing passengers with the highest level of safety and</p>
                        <p>comfort throughout Lebanon.We understand the unique</p>
                        <p>challenges of navigating Lebanese roads and are committed</p>
                        <p> to making your journeys as smooth and secure as possible. With</p>
                        <p>rigorously screened drivers, advanced safety features, and a</p>
                        <p>deep understanding of local routes, we offer a reliable and</p>
                        <p>enjoyable ride experience across the country, from the bustling</p>
                        <p>streets of Beirut to the scenic coastal regions and beyond.</p>
                    </div>
                </div>

                <div className={styles.oursrvs}>
                  <div className={styles.textsrvs}>
                        <div className={styles.ttlsrvs}>
                            <h1>Our</h1>
                            <h1>Mission</h1>
                        </div>
                        <p>Tactical Rides is committed to revolutionizing transportation</p>
                        <p>in Lebanon by providing a safe, reliable, and convenient ride-</p>
                        <p>sharing service that empowers individuals and communities.</p>
                        <p>We prioritize passenger safety through rigorous driver</p>
                        <p>screening, advanced safety features, and 24/7 support.</p>
                        <p>We strive to deliver an exceptional customer experience with on</p>
                        <p>-time arrivals, professional drivers, and a user-friendly platform.</p>
                        <p>By fostering a culture of safety and providing a reliable</p>
                        <p>transportation solution, we aim to contribute to the economic</p>
                        <p>growth and sustainable development of Lebanon.</p>
                    </div>
                    <div className={styles.picsrvs}>
                        <img src="/media/directioncar.png" className={styles.srvspic} alt="srvspic" />
                        <img src="/media/shadow4.png" className={styles.sh4} alt="sh2" />
                    </div>
                </div>

                <div className={styles.ourvs}>
                    <div className={styles.picvs}>
                        <img src="/media/rangerover.png" className={styles.vspic} alt="abtpic" />
                        <img src="/media/shadow2.png" className={styles.sh2} alt="sh2" />
                    </div>

                    <div className={styles.textvs}>
                        <div className={styles.ttlvs}>
                            <h1>Our</h1>
                            <h1>Vision</h1>
                        </div>
                        <p>To be the leading and most trusted transportation platform </p>
                        <p>in Lebanon,empowering individuals and communities through</p>
                        <p>safe, reliable, and convenient mobility solutions that enhance</p>
                        <p>quality of life and contribute to a more connected and</p>
                        <p>prosperous nation.</p>
                        <p>This vision statement emphasizes the long-</p>
                        <p>term aspirations of Tactical Rides to become a dominant force</p>
                        <p>in the Lebanese transportation landscape, while maintaining a</p>
                        <p>strong focus on safety, reliability, and positive societal impact.</p>
                    </div>
                </div>

                <div className={styles.who}>
                  <div className={styles.textwho}>
                        <div className={styles.ttlswho}>
                            <h1>Who's driving</h1>
                            <h1>Your ride?</h1>
                        </div>
                        <p>Safety-conscious professionals. Our drivers undergo</p>
                        <p>extensive safety training, including defensive driving</p>
                        <p>techniques and passenger assistance protocols, to</p>
                        <p>ensure your journey is as safe as possible.</p>
                    </div>
                    <div className={styles.picsrvs}>
                        <img src="/media/logored.png" className={styles.whospic} alt="srvspic" />
                        <img src="/media/shadow10.png" className={styles.sh10} alt="sh10" />
                    </div>
                </div>
             </div>
      </main>

      <Footer />
    </div>
  );
}
