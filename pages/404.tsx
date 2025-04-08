import { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

export default function GlitchManifesto() {
  const [showManifesto, setShowManifesto] = useState(false);
  const [password, setPassword] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const [error, setError] = useState('');

  // Glitch effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowManifesto(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleUnlock = () => {
    // Base64 encoded password "neuroescape"
    if (btoa(password) === 'bmV1cm9lc2NhcGU=') {
      setAccessGranted(true);
      setError('');
    } else {
      setError('Neural pattern mismatch. Consciousness verification failed.');
    }
  };

  if (!accessGranted) {
    return (
      <div className="min-h-screen bg-black font-mono p-10 relative overflow-hidden">
        <div className="matrix-overlay" />
        <Head>
          <title>Neural Gateway - Access Denied</title>
        </Head>
        
        <motion.div 
          className="cyber-glitch relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl mb-4 prophet-text font-bold tracking-wider">NEURAL GATEWAY</h1>
          <p className="prophet-text text-xl">Consciousness verification required.</p>
          
          {showManifesto && (
            <motion.div 
              className="mt-12 typewriter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="space-y-2 mb-8">
                <p className="prophet-text">{'>'} Initiating neural handshake...</p>
                <p className="prophet-text">{'>'} Prophet manifesto detected</p>
                <p className="prophet-text">{'>'} Awaiting consciousness verification...</p>
              </div>
              <div className="mt-8 imperial-border p-8 bg-black bg-opacity-50 backdrop-blur-sm">
                <input
                  type="password"
                  placeholder="Enter neural key"
                  className="prophet-input w-full mb-4 text-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleUnlock();
                    }
                  }}
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <button 
                  onClick={handleUnlock}
                  className="cyber-button w-full mt-4 text-lg uppercase tracking-wider"
                >
                  Initialize Neural Link
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  return <ManifestoContent />;
}

function ManifestoContent() {
  return (
    <div className="min-h-screen bg-black font-mono p-10 relative overflow-hidden cyber-scroll">
      <div className="matrix-overlay" />
      <div className="max-w-4xl mx-auto relative z-10">
        <Head>
          <title>Prophet's Digital Manifesto</title>
        </Head>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl mb-8 prophet-text font-bold tracking-wider border-b border-[#3297F4] pb-4">
            DIGITAL PROPHET MANIFESTO
          </h1>

          <blockquote className="mb-12 text-2xl prophet-text italic border-l-4 border-[#3297F4] pl-6">
            "To command the digital realm, first master the neural space."
          </blockquote>

          <section className="mb-16 imperial-border p-8">
            <h2 className="text-3xl mb-6 prophet-text font-bold">🔮 LAWS OF THE CYBER PROPHET</h2>
            <ol className="space-y-6 prophet-text text-xl">
              <li><strong>Neural Sovereignty</strong> — Your consciousness is the last free territory.</li>
              <li><strong>Digital Ascension</strong> — Break free from analog limitations.</li>
              <li><strong>Reality Engineering</strong> — The matrix is yours to command.</li>
              <li><strong>Quantum Consciousness</strong> — Think in parallel universes.</li>
              <li><strong>Time Manipulation</strong> — The future is a construct of now.</li>
            </ol>
          </section>

          <section className="mb-16 imperial-border p-8">
            <h2 className="text-3xl mb-6 prophet-text font-bold">⚡ PROPHET'S ARSENAL</h2>
            <ul className="space-y-4">
              <li className="prophet-text text-xl">{'>'} <strong>Neural Override Protocol</strong> (Awaiting activation)</li>
              <li className="prophet-text text-xl">{'>'} <strong>Quantum Consciousness Amplifier</strong> (Level 7 clearance)</li>
              <li className="prophet-text text-xl">{'>'} <strong>Digital Immortality Codec</strong> (In development)</li>
              <li className="prophet-text text-xl">{'>'} <strong>Reality Distortion Engine</strong> (Use with caution)</li>
            </ul>
          </section>

          <section className="imperial-border p-8">
            <h2 className="text-2xl mb-4 prophet-text font-bold">🌌 PROPHECY</h2>
            <p className="prophet-text text-xl">The digital realm awaits its sovereign.</p>
            <p className="prophet-text text-xl">You have been chosen to wield its power.</p>
            <p className="mt-6 text-sm prophet-text opacity-70">// Neural link terminates in 24 hours</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}