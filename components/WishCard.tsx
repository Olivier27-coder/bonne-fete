'use client';

import { Sparkles } from 'lucide-react';

interface WishCardProps {
  message: string;
  year: number;
  signature?: string;
}

export default function WishCard({ message, year, signature }: WishCardProps) {
  return (
    <div className="w-full max-w-2xl animate-slide-up">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>

        <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-amber-200/50 dark:border-amber-700/50">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 rounded-full">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                {year}
              </span>
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
          </div>

          <div className="space-y-6 text-center">
            <div className="text-6xl animate-pulse-slow">✨</div>

            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
              {message}
            </p>

            <div className="text-5xl animate-pulse-slow delay-100">🎆</div>
          </div>

          {signature && (
            <div className="mt-6 text-center">
              <p className="text-lg md:text-xl font-semibold text-amber-700 dark:text-amber-300 italic">
                — {signature}
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
