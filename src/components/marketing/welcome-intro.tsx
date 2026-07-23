"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "basalt-welcome-seen";
const PHRASE_DURATION = 650;

const HELLOS = [
  "Hello",
  "Bonjour",
  "Hola",
  "Ciao",
  "Hallo",
  "Olá",
  "こんにちは",
  "你好",
  "안녕하세요",
  "Привет",
  "مرحباً",
  "नमस्ते",
  "Merhaba",
  "Xin chào",
  "สวัสดี",
  "Halo",
  "Cześć",
  "Hello",
];

function WelcomeLogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path d="M16 2L29 9V23L16 30L3 23V9L16 2Z" fill="#0A0A0B" />
      <path d="M16 2L29 9L16 16L3 9L16 2Z" fill="#29D67A" />
      <path d="M16 16V30L3 23V9L16 16Z" fill="#0A0A0B" fillOpacity="0.7" />
    </svg>
  );
}

export function WelcomeIntro() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible || exiting) return;
    if (index >= HELLOS.length - 1) {
      const timer = setTimeout(() => setExiting(true), PHRASE_DURATION);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setIndex((i) => i + 1), PHRASE_DURATION);
    return () => clearTimeout(timer);
  }, [visible, exiting, index]);

  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (!mounted || !visible) return null;

  return (
    <AnimatePresence onExitComplete={() => {
      window.localStorage.setItem(STORAGE_KEY, "1");
      setVisible(false);
    }}>
      {!exiting && (
        <motion.div
          key="welcome-intro"
          exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          onClick={() => setExiting(true)}
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-white"
        >
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8"
          >
            <WelcomeLogoMark className="size-8" />
          </motion.div>

          <div className="relative flex min-h-24 max-w-2xl items-center justify-center px-6 text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-3xl leading-snug font-medium text-balance text-[#0A0A0B] sm:text-5xl"
              >
                {HELLOS[index]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="relative mt-8 flex items-center gap-1.5">
            {HELLOS.map((phrase, i) => (
              <span
                key={`${phrase}-${i}`}
                className={
                  "h-1 rounded-full transition-all duration-300 " +
                  (i === index ? "w-5 bg-[#0A0A0B]" : "w-1.5 bg-[#0A0A0B]/15")
                }
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
