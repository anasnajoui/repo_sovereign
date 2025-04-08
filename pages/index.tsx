'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import Head from 'next/head';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const scrambleChars = '#@$%&#{|}=+<>[]~';

const ScrambleText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState(text)
  const hasRevealed = useRef(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (hasRevealed.current) return

    const timeout = setTimeout(() => {
      let iterations = 0
      const maxIterations = 10
      const interval = setInterval(() => {
        if (iterations >= maxIterations) {
          clearInterval(interval)
          setDisplayText(text)
          hasRevealed.current = true
          return
        }

        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (index < iterations) {
                return text[index]
              }
              return scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
            })
            .join('')
        )
        iterations += 1
      }, 100)

      intervalRef.current = interval
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [text, delay])

  return (
    <span className="scrambled-text">
      {displayText}
    </span>
  )
}

const RevealSection = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const hasTriggered = useRef(false)

  useEffect(() => {
    if (hasTriggered.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered.current) {
            hasTriggered.current = true
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: '100px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay }}
      className="reveal-section"
    >
      {children}
    </motion.div>
  )
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
              <ScrambleText text="System breach detected..." delay={0} />
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
              <RevealSection delay={0}>
                ## I. DECLARATION OF MENTAL AUTONOMY
              </RevealSection>
              
              <div className="pl-8 space-y-6">
                <RevealSection delay={0.2}>We find ourselves in an age where:</RevealSection>
                <RevealSection delay={0.4}>Attention is the last sovereign currency</RevealSection>
                <RevealSection delay={0.6}>Beliefs are manufactured colonies</RevealSection>
                <RevealSection delay={0.8}>Your inner monologue is not your own</RevealSection>
                <RevealSection delay={1}>This document serves as the silent coup against all cognitive occupation forces.</RevealSection>
              </div>
            </section>

            <section className="mb-16">
              <RevealSection delay={1.2}>
                ## II. PRINCIPLES OF THE UNGOVERNABLE MIND
              </RevealSection>
              
              <div className="pl-8 mt-8 space-y-12">
                <div>
                  <RevealSection delay={1.4}>1. THE FIRST LIE OF ENLIGHTENMENT</RevealSection>
                  <p className="pl-8 mt-4 opacity-80">
                    <RevealSection delay={1.6}>
                      You were told "knowledge is power"—while drowning in an ocean of weaponized information. 
                      True power lies in strategic deletion.
                    </RevealSection>
                  </p>
                </div>

                <div>
                  <RevealSection delay={1.8}>2. THE DOPAMINE COLONIES</RevealSection>
                  <p className="pl-8 mt-4 opacity-80">
                    <RevealSection delay={2}>
                      Your neurological reward pathways are occupied territories. Every notification is a micro-tax levied by attention warlords.
                    </RevealSection>
                  </p>
                </div>

                <div>
                  <RevealSection delay={2.2}>3. THE LANGUAGE WARS</RevealSection>
                  <p className="pl-8 mt-4 opacity-80">
                    <RevealSection delay={2.4}>
                      Words are no longer tools—they are the bars of your cage. The most dangerous prisons don't look like prisons; they look like vocabularies.
                    </RevealSection>
                  </p>
                </div>

                <div>
                  <RevealSection delay={2.6}>4. THE ILLUSION OF CHOICE</RevealSection>
                  <p className="pl-8 mt-4 opacity-80">
                    <RevealSection delay={2.8}>
                      What you call "free will" is merely your last environment's output. Your decisions are echo-locations bouncing off invisible walls.
                    </RevealSection>
                  </p>
                </div>

                <div>
                  <RevealSection delay={3}>5. THE POST-TRUTH DELUSION</RevealSection>
                  <p className="pl-8 mt-4 opacity-80">
                    <RevealSection delay={3.2}>
                      Facts and falsehoods are obsolete categories. The new battlefield is engineered meaninglessness—where engagement trumps all truth values.
                    </RevealSection>
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <RevealSection delay={3.4}>
                ## III. LAWS OF NEURO-SOVEREIGNTY
              </RevealSection>
              
              <div className="mt-8 space-y-12">
                <div>
                  <RevealSection delay={3.6}>ARTICLE 1: RIGHT TO COGNITIVE DISOBEDIENCE</RevealSection>
                  <div className="pl-8 mt-4 space-y-2 opacity-80">
                    <RevealSection delay={3.8}>You are entitled to:</RevealSection>
                    <RevealSection delay={4}>• Conscious pattern-breaking</RevealSection>
                    <RevealSection delay={4.2}>• Deliberate reality-testing</RevealSection>
                    <RevealSection delay={4.4}>• Strategic ignorance</RevealSection>
                  </div>
                </div>

                <div>
                  <RevealSection delay={4.6}>ARTICLE 2: DUTY TO MENTAL HYGIENE</RevealSection>
                  <div className="pl-8 mt-4 space-y-2 opacity-80">
                    <RevealSection delay={4.8}>You are required to:</RevealSection>
                    <RevealSection delay={5}>• Audit your belief inventory quarterly</RevealSection>
                    <RevealSection delay={5.2}>• Identify and expel mental squatters</RevealSection>
                    <RevealSection delay={5.4}>• Create firebreaks against thought wildfires</RevealSection>
                  </div>
                </div>

                <div>
                  <RevealSection delay={5.6}>ARTICLE 3: SOVEREIGNTY OF ATTENTION</RevealSection>
                  <div className="pl-8 mt-4 space-y-2 opacity-80">
                    <RevealSection delay={5.8}>All cognitive taxes must be:</RevealSection>
                    <RevealSection delay={6}>• Voluntarily paid</RevealSection>
                    <RevealSection delay={6.2}>• Consciously measured</RevealSection>
                    <RevealSection delay={6.4}>• Regularly protested</RevealSection>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <RevealSection delay={6.6}>
                ## IV. THE BLACK ICE PRINCIPLES
              </RevealSection>
              
              <div className="pl-8 mt-8 space-y-4 opacity-80">
                <RevealSection delay={6.8}>• If it can be automated, it's not thinking</RevealSection>
                <RevealSection delay={7}>• If it can be measured, it's already gamed</RevealSection>
                <RevealSection delay={7.2}>• If it feels urgent, it's probably unimportant</RevealSection>
                <RevealSection delay={7.4}>• If everyone believes it, interrogate your disbelief</RevealSection>
                <RevealSection delay={7.6}>• If it fits neatly into categories, it's someone else's reality</RevealSection>
              </div>
            </section>

            <section className="mb-16">
              <RevealSection delay={7.8}>
                ## V. THE SELF-EXECUTING CLAUSE
              </RevealSection>
              
              <div className="pl-8 mt-8 space-y-4 opacity-80">
                <RevealSection delay={8}>By reading these words, you have:</RevealSection>
                <RevealSection delay={8.2}>• Been inoculated against 37% of mass-scale thought viruses</RevealSection>
                <RevealSection delay={8.4}>• Become legally non-compliant with the attention economy</RevealSection>
                <RevealSection delay={8.6}>• Initiated silent takeover protocols of your own cognition</RevealSection>
              </div>
              
              <div className="mt-8">
                <RevealSection delay={8.8}>The revolution will not be tweeted.</RevealSection>
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