"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "@/components/shared/logo";
import { useLocale } from "@/lib/i18n/locale-provider";

const STORAGE_KEY = "basalt-welcome-seen";
const PHRASE_DURATION = 1100;

export function WelcomeIntro() {
  const { dict } = useLocale();
  const phrases = dict.marketing.welcomeIntro;
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
    if (index >= phrases.length - 1) {
      const timer = setTimeout(() => setExiting(true), PHRASE_DURATION);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setIndex((i) => i + 1), PHRASE_DURATION);
    return () => clearTimeout(timer);
  }, [visible, exiting, index, phrases.length]);

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
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-background"
        >
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8"
          >
            <LogoMark className="size-8" />
          </motion.div>

          <div className="relative flex min-h-24 max-w-2xl items-center justify-center px-6 text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-2xl leading-snug font-medium text-balance sm:text-4xl"
              >
                {phrases[index]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="relative mt-8 flex items-center gap-1.5">
            {phrases.map((phrase, i) => (
              <span
                key={phrase}
                className={
                  "h-1 rounded-full transition-all duration-300 " +
                  (i === index ? "w-5 bg-foreground" : "w-1.5 bg-border")
                }
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
