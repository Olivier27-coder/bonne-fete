'use client';

import { useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundManagerProps {
  soundEnabled: boolean;
  onToggle: () => void;
}

export default function SoundManager({ soundEnabled, onToggle }: SoundManagerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const christmasAudioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedChristmasRef = useRef(false);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !hasInitializedRef.current) {
      audioRef.current = new Audio('/sounds/celebrate.wav');
      audioRef.current.volume = 0.3;
      
      christmasAudioRef.current = new Audio('/sounds/christmas.wav');
      christmasAudioRef.current.volume = 0.4;
      christmasAudioRef.current.loop = false; // S'assurer que le son ne boucle pas
      hasInitializedRef.current = true;
    }
  }, []);

  const playSound = useCallback(() => {
    if (audioRef.current && soundEnabled) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Ignore les erreurs de lecture automatique
      });
    }
  }, [soundEnabled]);

  const playChristmasSound = useCallback(() => {
    if (christmasAudioRef.current && soundEnabled && !hasPlayedChristmasRef.current) {
      christmasAudioRef.current.currentTime = 0;
      christmasAudioRef.current.play().catch(() => {
        // Ignore les erreurs de lecture automatique
      });
      hasPlayedChristmasRef.current = true;
    }
  }, [soundEnabled]);

  const stopChristmasSound = useCallback(() => {
    if (christmasAudioRef.current) {
      christmasAudioRef.current.pause();
      christmasAudioRef.current.currentTime = 0;
    }
  }, []);

  // Exposer les fonctions via window pour l'utiliser ailleurs
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).playCelebrationSound = playSound;
      (window as any).playChristmasSound = playChristmasSound;
      (window as any).stopChristmasSound = stopChristmasSound;
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).playCelebrationSound;
        delete (window as any).playChristmasSound;
        delete (window as any).stopChristmasSound;
      }
    };
  }, [playSound, playChristmasSound, stopChristmasSound]);

  // Jouer le son christmas une seule fois au démarrage si le son est activé
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (soundEnabled && christmasAudioRef.current && !hasPlayedChristmasRef.current && hasInitializedRef.current) {
      // Petit délai pour éviter les problèmes de lecture automatique
      timer = setTimeout(() => {
        if (christmasAudioRef.current && !hasPlayedChristmasRef.current) {
          christmasAudioRef.current.currentTime = 0;
          christmasAudioRef.current.play().catch(() => {
            // Ignore les erreurs de lecture automatique
          });
          hasPlayedChristmasRef.current = true;
        }
      }, 500);
    }
    
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [soundEnabled]);

  return (
    <button
      onClick={onToggle}
      className="fixed top-4 left-4 z-20 p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label={soundEnabled ? 'Désactiver le son' : 'Activer le son'}
    >
      {soundEnabled ? (
        <Volume2 className="w-5 h-5 text-slate-700 dark:text-slate-300" />
      ) : (
        <VolumeX className="w-5 h-5 text-slate-500 dark:text-slate-500" />
      )}
    </button>
  );
}

