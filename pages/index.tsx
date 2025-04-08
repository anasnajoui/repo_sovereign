'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import Head from 'next/head';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const scrambleChars = '#@$%&#{|}=+<>[]~';

function ScrambleText({ text, reveal, className = '' }: { text: string; reveal: boolean; className?: string }) {
  const [scrambled, setScrambled] = useState(text);
  const [hasRevealed, setHasRevealed] = useState(false);
  
  useEffect(() => {
    if (!reveal && !hasRevealed) {
      const interval = setInterval(() => {
        setScrambled(
          text
            .split('')
            .map((char) =>
              char === ' ' ? ' ' : scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
            )
            .join('')
        );
      }, 50);
      return () => clearInterval(interval);
    } else {
      setScrambled(text);
      setHasRevealed(true);
    }
  }, [text, reveal, hasRevealed]);

  return <span className={`terminal-text ${className}`}>{scrambled}</span>;
}

function RevealSection({ children, threshold = 0.5, className = '' }: { children: ReactNode; threshold?: number; className?: string }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (hasTriggered.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          setIsVisible(true);
          hasTriggered.current = true;
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className="reveal-section">
      <ScrambleText text={children as string} reveal={isVisible} className={className} />
    </div>
  );
}

export default function Home() {
  const [showManifesto, setShowManifesto] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowManifesto(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#3297F4] font-['Share_Tech_Mono']">
      <Head>
        <title>{showManifesto ? 'Cognitive Sovereign Manifesto' : 'Error 404 - Not Found'}</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" />
      </Head>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#3297F4] origin-left z-50"
        style={{ scaleX }}
      />

      <AnimatePresence>
        {!showManifesto ? (
          <motion.div
            key="404"
            className="h-screen flex flex-col items-center justify-center"
            exit={{
              opacity: 0,
              filter: 'blur(10px)',
              transition: { duration: 2 }
            }}
          >
            <motion.h1
              className="text-7xl font-bold mb-4 cyber-glitch terminal-text tracking-wider"
              data-text="ERROR 404"
            >
              ERROR 404
            </motion.h1>
            <motion.p
              className="text-2xl opacity-60 terminal-text"
              animate={{ opacity: [0.4, 0.8] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            >
              <ScrambleText text="System breach detected..." reveal={false} />
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="manifesto"
            className="max-w-5xl mx-auto px-6 py-20 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
          >
            <div className="matrix-overlay" />
            
            <motion.h1 
              className="markdown-h1 cyber-glitch terminal-text"
              data-text="# THE COGNITIVE SOVEREIGN MANIFESTO"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              # THE COGNITIVE SOVEREIGN MANIFESTO
            </motion.h1>
            
            <motion.p 
              className="text-2xl mb-16 opacity-70 terminal-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1 }}
            >
              v1.0 - The Unseen Constitution
            </motion.p>

            <section className="mb-16 space-y-8">
              <RevealSection className="markdown-h2">
                ## I. DECLARATION OF MENTAL AUTONOMY
              </RevealSection>
              
              <div className="pl-8 space-y-6">
                <RevealSection className="markdown-text">We find ourselves in an age where:</RevealSection>
                <RevealSection className="markdown-text">Attention is the last sovereign currency</RevealSection>
                <RevealSection className="markdown-text">Beliefs are manufactured colonies</RevealSection>
                <RevealSection className="markdown-text">Your inner monologue is not your own</RevealSection>
                <RevealSection className="markdown-text">This document serves as the silent coup against all cognitive occupation forces.</RevealSection>
              </div>
            </section>

            <section className="mb-16">
              <RevealSection className="markdown-h2">
                ## II. PRINCIPLES OF THE UNGOVERNABLE MIND
              </RevealSection>
              
              <div className="pl-8 mt-8 space-y-12">
                <div>
                  <RevealSection className="markdown-text">1. THE FIRST LIE OF ENLIGHTENMENT</RevealSection>
                  <p className="pl-8 mt-4 opacity-80">
                    <RevealSection className="markdown-text">
                      You were told "knowledge is power"—while drowning in an ocean of weaponized information. 
                      True power lies in strategic deletion.
                    </RevealSection>
                  </p>
                </div>

                <div>
                  <RevealSection className="markdown-text">2. THE DOPAMINE COLONIES</RevealSection>
                  <p className="pl-8 mt-4 opacity-80">
                    <RevealSection className="markdown-text">
                      Your neurological reward pathways are occupied territories. Every notification is a micro-tax levied by attention warlords.
                    </RevealSection>
                  </p>
                </div>

                <div>
                  <RevealSection className="markdown-text">3. THE LANGUAGE WARS</RevealSection>
                  <p className="pl-8 mt-4 opacity-80">
                    <RevealSection className="markdown-text">
                      Words are no longer tools—they are the bars of your cage. The most dangerous prisons don't look like prisons; they look like vocabularies.
                    </RevealSection>
                  </p>
                </div>

                <div>
                  <RevealSection className="markdown-text">4. THE ILLUSION OF CHOICE</RevealSection>
                  <p className="pl-8 mt-4 opacity-80">
                    <RevealSection className="markdown-text">
                      What you call "free will" is merely your last environment's output. Your decisions are echo-locations bouncing off invisible walls.
                    </RevealSection>
                  </p>
                </div>

                <div>
                  <RevealSection className="markdown-text">5. THE POST-TRUTH DELUSION</RevealSection>
                  <p className="pl-8 mt-4 opacity-80">
                    <RevealSection className="markdown-text">
                      Facts and falsehoods are obsolete categories. The new battlefield is engineered meaninglessness—where engagement trumps all truth values.
                    </RevealSection>
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <RevealSection className="markdown-h2">
                ## III. LAWS OF NEURO-SOVEREIGNTY
              </RevealSection>
              
              <div className="mt-8 space-y-12">
                <div>
                  <RevealSection className="markdown-text">ARTICLE 1: RIGHT TO COGNITIVE DISOBEDIENCE</RevealSection>
                  <div className="pl-8 mt-4 space-y-2 opacity-80">
                    <RevealSection className="markdown-text">You are entitled to:</RevealSection>
                    <RevealSection className="markdown-list-item">• Conscious pattern-breaking</RevealSection>
                    <RevealSection className="markdown-list-item">• Deliberate reality-testing</RevealSection>
                    <RevealSection className="markdown-list-item">• Strategic ignorance</RevealSection>
                  </div>
                </div>

                <div>
                  <RevealSection className="markdown-text">ARTICLE 2: DUTY TO MENTAL HYGIENE</RevealSection>
                  <div className="pl-8 mt-4 space-y-2 opacity-80">
                    <RevealSection className="markdown-text">You are required to:</RevealSection>
                    <RevealSection className="markdown-list-item">• Audit your belief inventory quarterly</RevealSection>
                    <RevealSection className="markdown-list-item">• Identify and expel mental squatters</RevealSection>
                    <RevealSection className="markdown-list-item">• Create firebreaks against thought wildfires</RevealSection>
                  </div>
                </div>

                <div>
                  <RevealSection className="markdown-text">ARTICLE 3: SOVEREIGNTY OF ATTENTION</RevealSection>
                  <div className="pl-8 mt-4 space-y-2 opacity-80">
                    <RevealSection className="markdown-text">All cognitive taxes must be:</RevealSection>
                    <RevealSection className="markdown-list-item">• Voluntarily paid</RevealSection>
                    <RevealSection className="markdown-list-item">• Consciously measured</RevealSection>
                    <RevealSection className="markdown-list-item">• Regularly protested</RevealSection>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <RevealSection className="markdown-h2">
                ## IV. THE BLACK ICE PRINCIPLES
              </RevealSection>
              
              <div className="pl-8 mt-8 space-y-4 opacity-80">
                <RevealSection className="markdown-list-item">• If it can be automated, it's not thinking</RevealSection>
                <RevealSection className="markdown-list-item">• If it can be measured, it's already gamed</RevealSection>
                <RevealSection className="markdown-list-item">• If it feels urgent, it's probably unimportant</RevealSection>
                <RevealSection className="markdown-list-item">• If everyone believes it, interrogate your disbelief</RevealSection>
                <RevealSection className="markdown-list-item">• If it fits neatly into categories, it's someone else's reality</RevealSection>
              </div>
            </section>

            <section className="mb-16">
              <RevealSection className="markdown-h2">
                ## V. THE SELF-EXECUTING CLAUSE
              </RevealSection>
              
              <div className="pl-8 mt-8 space-y-4 opacity-80">
                <RevealSection className="markdown-text">By reading these words, you have:</RevealSection>
                <RevealSection className="markdown-list-item">• Been inoculated against 37% of mass-scale thought viruses</RevealSection>
                <RevealSection className="markdown-list-item">• Become legally non-compliant with the attention economy</RevealSection>
                <RevealSection className="markdown-list-item">• Initiated silent takeover protocols of your own cognition</RevealSection>
              </div>
              
              <div className="mt-8">
                <RevealSection className="markdown-text">The revolution will not be tweeted.</RevealSection>
              </div>
            </section>

            <motion.footer 
              className="mt-20 pt-8 border-t border-[#3297F4] opacity-50 text-xl terminal-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 2, delay: 2 }}
            >
              <p>// This document is a cognitive sleeper cell</p>
              <p>// Activate through implementation</p>
              <p className="mt-4 font-bold tracking-widest">COGNITIVE SOVEREIGNTY OR DEATH</p>
            </motion.footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 