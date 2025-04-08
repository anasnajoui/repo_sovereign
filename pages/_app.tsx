import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Check if the manifesto has already been destroyed
    const isDestroyed = localStorage.getItem('manifesto_destroyed') === 'true';
    
    if (isDestroyed) {
      document.body.innerHTML = `
        <div style="
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: black;
          color: #3297F4;
          font-family: monospace;
          position: relative;
          overflow: hidden;
        ">
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
              0deg,
              rgba(50, 151, 244, 0.15) 0px,
              rgba(50, 151, 244, 0.15) 1px,
              transparent 1px,
              transparent 2px
            );
            pointer-events: none;
            opacity: 0.1;
          "></div>
          <h1 style="
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 0 0 10px rgba(50, 151, 244, 0.5);
            animation: glitch 1s infinite;
            position: relative;
            z-index: 1;
          ">NEURAL LINK TERMINATED</h1>
          <p style="
            color: rgba(50, 151, 244, 0.7);
            position: relative;
            z-index: 1;
          ">Consciousness stream purged from the digital realm</p>
        </div>
      `;
      return;
    }

    // Set up self-destruct timer (24 hours)
    const selfDestructTimer = setTimeout(() => {
      if (confirm('Neural link unstable. Proceed with emergency disconnect?')) {
        localStorage.setItem('manifesto_destroyed', 'true');
        document.body.innerHTML = `
          <div style="
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: black;
            color: #3297F4;
            font-family: monospace;
            position: relative;
            overflow: hidden;
          ">
            <div style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: repeating-linear-gradient(
                0deg,
                rgba(50, 151, 244, 0.15) 0px,
                rgba(50, 151, 244, 0.15) 1px,
                transparent 1px,
                transparent 2px
              );
              pointer-events: none;
              opacity: 0.1;
            "></div>
            <h1 style="
              font-size: 3rem;
              margin-bottom: 1rem;
              text-shadow: 0 0 10px rgba(50, 151, 244, 0.5);
              animation: glitch 1s infinite;
              position: relative;
              z-index: 1;
            ">NEURAL LINK TERMINATED</h1>
            <p style="
              color: rgba(50, 151, 244, 0.7);
              position: relative;
              z-index: 1;
            ">Consciousness stream purged from the digital realm</p>
          </div>
        `;
      }
    }, 86400000); // 24 hours

    return () => clearTimeout(selfDestructTimer);
  }, []);

  return <Component {...pageProps} />;
}