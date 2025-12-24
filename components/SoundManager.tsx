'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundManagerProps {
  soundEnabled: boolean;
  onToggle: () => void;
}

export default function SoundManager({ soundEnabled, onToggle }: SoundManagerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const christmasAudioRef = useRef<HTMLAudioElement | null>(null);
  const [hasPlayedChristmas, setHasPlayedChristmas] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/sounds/celebrate.wav');
      audioRef.current.volume = 0.3;
      
      christmasAudioRef.current = new Audio('/sounds/christmas.wav');
      christmasAudioRef.current.volume = 0.4;
      // Pas de loop - le son ne joue qu'une seule fois
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
    if (christmasAudioRef.current && soundEnabled && !hasPlayedChristmas) {
      christmasAudioRef.current.currentTime = 0;
      christmasAudioRef.current.play().catch(() => {
        // Ignore les erreurs de lecture automatique
      });
      setHasPlayedChristmas(true);
    }
  }, [soundEnabled, hasPlayedChristmas]);

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
    if (soundEnabled && christmasAudioRef.current && !hasPlayedChristmas) {
      // Petit délai pour éviter les problèmes de lecture automatique
      const timer = setTimeout(() => {
        playChristmasSound();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [soundEnabled, hasPlayedChristmas, playChristmasSound]);

  return (
    <button
      onClick={onToggle}
      className="fixed top-4 left-4 z-20 p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label={soundEnabled ? 'Désactiver le son' : 'Activer le son'}
    >
      {soundEnabled ? (
        <Volume2 className="w-5 