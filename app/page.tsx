'use client';

import { useState, useEffect } from 'react';
import { Share2, Sun, Moon, Sparkles, PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';
import ConfettiLottie from '@/components/ConfettiLottie';
import WishCard from '@/components/WishCard';
import ShareModal from '@/components/ShareModal';
import SoundManager from '@/components/SoundManager';
import SnowEffect from '@/components/SnowEffect';
import FireworksEffect from '@/components/FireworksEffect';

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [showShare, setShowShare] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [confettiKey, setConfettiKey] = useState(0);
  const [showSnow, setShowSnow] = useState(true);
  const [fireworksTrigger, setFireworksTrigger] = useState(0);
  const [confettiClicks, setConfettiClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [shareButtonAnimate, setShareButtonAnimate] = useState(false);
  const [customMessage, setCustomMessage] = useState("Que cette nouvelle année vous apporte succès, santé et prospérité. Meilleurs vœux !");
  const [signature, setSignature] = useState("Olivier Codeur");
  const [showCustomize, setShowCustomize] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Forcer le mode sombre
    setTheme('dark');
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    const savedSound = localStorage.getItem('soundEnabled');
    if (savedSound !== null) {
      setSoundEnabled(savedSound === 'true');
    } else {
      // Par défaut, activer le son pour jouer le son christmas au démarrage
      setSoundEnabled(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const toggleSound = () => {
    const newSoundState = !soundEnabled;
    setSoundEnabled(newSoundState);
    localStorage.setItem('soundEnabled', String(newSoundState));
  };

  const handleMoreConfetti = () => {
    setConfettiKey(prev => prev + 1);
    setConfettiClicks(prev => {
      const newCount = prev + 1;
      // Easter egg après 7 clics
      if (newCount === 7 && !showEasterEgg) {
        setShowEasterEgg(true);
        setFireworksTrigger(prev => prev + 1);
        if (typeof window !== 'undefined' && (window as any).playCelebrationSound) {
          (window as any).playCelebrationSound();
        }
        setTimeout(() => setShowEasterEgg(false), 5000);
      }
      return newCount;
    });
    if (typeof window !== 'undefined' && (window as any).playCelebrationSound) {
      (window as any).playCelebrationSound();
    }
  };

  const handleShare = () => {
    setShareButtonAnimate(true);
    setShowShare(true);
    if (typeof window !== 'undefined' && (window as any).playCelebrationSound) {
      (window as any).playCelebrationSound();
    }
    setTimeout(() => setShareButtonAnimate(false), 600);
  };

  const year = 2026;

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen relative overflow-hidden transition-colors duration-500 bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-amber-900">
      <ConfettiLottie key={confettiKey} />
      {showSnow && <SnowEffect />}
      <FireworksEffect trigger={fireworksTrigger} />

      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

      <SoundManager soundEnabled={soundEnabled} onToggle={toggleSound} />


      {showEasterEgg && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center">
            <PartyPopper className="w-32 h-32 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-yellow-400 drop-shadow-lg">
              🎊 SURPRISE ! 🎊
            </h2>
            <p className="text-2xl text-white mt-4 drop-shadow-lg">
              Vous avez découvert l'Easter Egg !
            </p>
          </div>
        </motion.div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        <div className="animate-float mb-8">
          <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-amber-500 dark:text-amber-400 mx-auto" />
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-4 animate-fade-in bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 dark:from-amber-400 dark:via-orange-300 dark:to-amber-400 bg-clip-text text-transparent">
          Bonne Année {year}
        </h1>

        <div className="text-4xl sm:text-5xl md:text-6xl text-center mb-12 animate-bounce-slow">
          🎉
        </div>

        <WishCard
          message={customMessage}
          year={year}
          signature={signature}
        />

        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
          <motion.button
            animate={shareButtonAnimate ? {
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            } : {}}
            transition={{ duration: 0.6 }}
            onClick={handleShare}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 dark:from-amber-600 dark:to-orange-600 dark:hover:from-amber-500 dark:hover:to-orange-500 text-white font-semibold rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-3 text-lg"
          >
            <Share2 className="w-6 h-6" />
            Partager les vœux
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMoreConfetti}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-full shadow-xl hover:shadow-pink-500/50 transition-all duration-300 flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Encore plus de confettis !
          </motion.button>

          <button
            onClick={() => setShowCustomize(!showCustomize)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-full shadow-xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2"
          >
            ✏️ Personnaliser
          </button>
        </div>

        {showCustomize && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 w-full max-w-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl"
          >
            <h3 className="text-xl font-bold mb-4 text-center text-amber-600 dark:text-amber-400">
              Personnaliser votre message
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Message de vœux
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full p-3 rounded-lg border border-amber-200 dark:border-amber-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                  Signature
                </label>
                <input
                  type="text"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  className="w-full p-3 rounded-lg border border-amber-200 dark:border-amber-700 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  placeholder="Votre nom"
                />
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-12 text-center text-sm text-slate-600 dark:text-slate-400 animate-fade-in-delay">
          <p>Partagez vos meilleurs vœux avec vos proches</p>
        </div>
      </div>

      <ShareModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        message={customMessage}
        year={year}
      />

      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50/50 dark:from-slate-900/50 to-transparent pointer-events-none"></div>
    </main>
  );
}
