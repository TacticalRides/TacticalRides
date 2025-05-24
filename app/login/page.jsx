"use client";

import Image from "next/image";
import styles from "./login.module.css";
import logo from "../../public/logo final/TACTICAL RIDES-05.png";
import shadow from "../../public/media/shadow10.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState("Customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      await verifyUser(userCredential.user);
    } catch (err) {
      handleAuthError(err);
    }

    setLoading(false);
  };

  const verifyUser = async (user) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // Create Firestore user record for Google/Facebook logins
      await setDoc(docRef, {
        name: user.displayName || "",
        lastName: "",
        phone: user.phoneNumber || "",
        email: user.email,
        role: "Customer", // default for social logins
        createdAt: new Date().toISOString(),
      });
      router.push("/");
      return;
    }

    const docData = docSnap.data();
    const firestoreRole = docData.role;

    if (!firestoreRole) {
      await signOut(auth);
      setError("Role is missing in Firestore user record.");
      return;
    }

    if (
      firestoreRole.trim().toLowerCase() !==
      selectedRole.trim().toLowerCase()
    ) {
      await signOut(auth);
      setError(`Incorrect role. You are registered as a ${firestoreRole}.`);
      return;
    }

    router.push("/");
  };

  const handleAuthError = (err) => {
    console.error("Login error:", err);

    if (
      err.code === "auth/invalid-credential" ||
      err.code === "auth/user-not-found" ||
      err.code === "auth/wrong-password"
    ) {
      setError("Invalid email or password.");
    } else if (err.code === "auth/too-many-requests") {
      setError("Too many failed attempts. Try again later.");
    } else if (err.code === "auth/network-request-failed") {
      setError("Network error. Please check your connection.");
    } else if (err.code === "auth/invalid-email") {
      setError("Please enter a valid email address.");
    } else {
      setError("Unexpected error. See console for details.");
    }
    setLoading(false);
  };

  const handleSocialLogin = async (provider) => {
    setError(null);
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      await verifyUser(result.user);
    } catch (err) {
      handleAuthError(err);
    }
  };

  return (
    <div className={styles.container}>
      <Image src={logo} alt="logo" className={styles.logo} />
      <h1 className={styles.welcomeMessage}>Welcome!</h1>

      <div className={styles.roleSelection}>
        {["Customer", "Driver", "Admin"].map((role) => (
          <button
            key={role}
            className={`${styles.roleButton} ${
              selectedRole === role ? styles.active : ""
            }`}
            onClick={() => setSelectedRole(role)}
          >
            {role}
          </button>
        ))}
      </div>

      <form className={styles.form} onSubmit={handleLogin}>
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

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.loginButton} disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>

        <a href="/forgot-password" className={styles.forgotLink}>
          Forgot Login Detail?
        </a>

        <div className={styles.socialButtons}>
          <a
            href="#"
            className={styles.googleButton}
            onClick={() => handleSocialLogin(new GoogleAuthProvider())}
          >
            <Image
              src="/media/google-icon.png"
              alt="Google Login"
              width={40}
              height={40}
            />
          </a>
          
        </div>

        <a href="/signup" className={styles.forgotLink}>
          Don't have an account?
        </a>
      </form>

      <Image src={shadow} alt="shadow" className={styles.shadow} />
    </div>
  );
};

export default Login;
