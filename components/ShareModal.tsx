'use client';

import { X, Facebook, MessageCircle, Link2, Check } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  year: number;
}

export default function ShareModal({ isOpen, onClose, message, year }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Bonne Année ${year} ! ${message}`;

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full p-8"
          >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
          Partager les vœux
        </h2>

        <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
          Partagez vos meilleurs vœux avec vos proches
        </p>

        <div className="space-y-3">
          <button
            onClick={handleWhatsAppShare}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/50"
          >
            <MessageCircle className="w-6 h-6" />
            <span>Partager sur WhatsApp</span>
          </button>

          <button
            onClick={handleFacebookShare}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/50"
          >
            <Facebook className="w-6 h-6" />
            <span>Partager sur Facebook</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 dark:from-slate-600 dark:to-slate-700 dark:hover:from-slate-500 dark:hover:to-slate-600 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            {copied ? (
              <>
                <Check className="w-6 h-6" />
                <span>Lien copié !</span>
              </>
            ) : (
              <>
                <Link2 className="w-6 h-6" />
                <span>Copier le lien</span>
              </>
            )}
          </button>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
