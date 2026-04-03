import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Camera, RefreshCcw, Info } from 'lucide-react';

export default function ARScanner() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for camera permission
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => setHasPermission(true))
      .catch(() => setHasPermission(false));

    // Cleanup AR.js when component unmounts
    return () => {
      const scene = document.querySelector('a-scene');
      if (scene) {
        scene.parentElement?.removeChild(scene);
      }
      // Remove AR.js injected styles
      const video = document.querySelector('video');
      if (video) video.remove();
    };
  }, []);

  const startAR = () => {
    setIsLoaded(true);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md emerald-glass p-8 rounded-3xl border border-gold-500/30"
        >
          <div className="w-20 h-20 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="w-10 h-10 text-gold-500" />
          </div>
          <h2 className="text-3xl font-display gold-gradient mb-4">AR Experience</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Scan your DASTAAN'26 ticket to unlock a personalized welcome message and celebratory animation.
          </p>
          
          <div className="bg-emerald-950/50 p-4 rounded-xl mb-8 flex items-start space-x-3 text-left">
            <Info className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
            <p className="text-xs text-gold-300/70">
              Point your camera at the QR code on your digital or printed ticket. 
              Ensure you are in a well-lit environment.
            </p>
          </div>

          {hasPermission === false && (
            <p className="text-red-400 text-sm mb-4">
              Camera access is required for the AR experience. Please enable it in your browser settings.
            </p>
          )}

          <button
            onClick={startAR}
            disabled={hasPermission === false}
            className="w-full py-4 bg-gold-500 text-emerald-950 font-bold rounded-full hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20 uppercase tracking-widest disabled:opacity-50"
          >
            Launch Scanner
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      {/* AR Scene */}
      <a-scene
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
        vr-mode-ui="enabled: false"
      >
        {/* We use a Hiro marker as a proxy for the ticket QR code for this demo */}
        <a-marker preset="hiro">
          {/* Celebratory Animation */}
          <a-entity
            position="0 0 0"
            rotation="-90 0 0"
          >
            {/* Emerald Ring */}
            <a-ring
              color="#065f46"
              radius-inner="0.8"
              radius-outer="1"
              animation="property: rotation; to: 0 0 360; loop: true; dur: 4000; easing: linear"
            ></a-ring>
            
            {/* Gold Ring */}
            <a-ring
              color="#d4af37"
              radius-inner="1.1"
              radius-outer="1.15"
              animation="property: rotation; to: 0 0 -360; loop: true; dur: 6000; easing: linear"
            ></a-ring>

            {/* Welcome Text */}
            <a-text
              value="WELCOME TO DASTAAN'26"
              align="center"
              color="#f3d76e"
              position="0 0 0.5"
              scale="1.5 1.5 1.5"
              font="https://cdn.aframe.io/fonts/Exo2Bold.fnt"
              animation="property: position; to: 0 0 0.7; dir: alternate; loop: true; dur: 1000"
            ></a-text>

            {/* Floating Particles (represented by small spheres) */}
            <a-sphere position="0.5 0.5 0.2" radius="0.05" color="#d4af37" animation="property: position; to: 0.6 0.6 0.4; dir: alternate; loop: true; dur: 1500"></a-sphere>
            <a-sphere position="-0.5 -0.5 0.3" radius="0.05" color="#065f46" animation="property: position; to: -0.6 -0.6 0.5; dir: alternate; loop: true; dur: 2000"></a-sphere>
            <a-sphere position="0.7 -0.3 0.1" radius="0.03" color="#ffffff" animation="property: position; to: 0.8 -0.4 0.3; dir: alternate; loop: true; dur: 1200"></a-sphere>
          </a-entity>
        </a-marker>

        <a-entity camera></a-entity>
      </a-scene>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
        <div className="flex justify-between items-start">
          <button 
            onClick={() => window.location.reload()}
            className="pointer-events-auto p-3 bg-black/40 backdrop-blur-md rounded-full text-white border border-white/20"
          >
            <RefreshCcw className="w-6 h-6" />
          </button>
          <div className="bg-gold-500 px-4 py-1 rounded-full">
            <p className="text-emerald-950 text-[10px] font-bold uppercase tracking-widest">AR Active</p>
          </div>
        </div>

        <div className="flex flex-col items-center mb-12">
          <div className="w-64 h-64 border-2 border-dashed border-gold-500/50 rounded-3xl relative">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-gold-500 -mt-1 -ml-1 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-gold-500 -mt-1 -mr-1 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-gold-500 -mb-1 -ml-1 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-gold-500 -mb-1 -mr-1 rounded-br-xl" />
          </div>
          <p className="text-white text-sm mt-6 font-medium tracking-wide bg-black/60 px-6 py-2 rounded-full backdrop-blur-sm">
            Align ticket with the frame
          </p>
        </div>
      </div>
    </div>
  );
}
