"use client";

import Image from "next/image";
import styles from "./signup.module.css";
import logo from "../../public/logo final/TACTICAL RIDES-05.png";
import shadow from "../../public/media/shadow10.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const Signup = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        lastName,
        phone,
        email: email.trim(),
        role: "Customer",
        createdAt: new Date().toISOString(),
      });

      await signOut(auth); // log out after signup

      router.push("/login");
    } catch (err) {
      console.error("Signup error:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already in use.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <Image src={logo} alt="logo" className={styles.logo} />
      <h1 className={styles.welcomeMessage}>Create Yours!</h1>
      <form className={styles.form} onSubmit={handleSignup}>
        <div className={styles.inputs}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className={styles.inputField}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            className={styles.inputField}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            className={styles.inputField}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.loginButton}>
          Sign Up
        </button>
      </form>
      <Image src={shadow} alt="shadow" className={styles.shadow} />
    </div>
  );
};

export default Signup;
