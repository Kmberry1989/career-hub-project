// CareerHubWithLogin.js – Full interactive app with auth and Firestore (HTML + Tailwind version)
import { useEffect, useState } from "react";
import { Briefcase, Search, BookOpen, UserCheck, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LoginButton from "../components/LoginButton";
import { fetchProfile, saveProfile } from "../lib/firebase";

export default function CareerHub() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Career Hub</h1>
      <p>Login, explore, and build your future career.</p>
    </main>
  );
}
