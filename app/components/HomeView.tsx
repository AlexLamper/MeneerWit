import { useState } from "react";
import RulesModal from "./RulesModal";
import SettingsModal from "./SettingsModal";
import ExplanationModal from "./ExplanationModal";
import { ChevronRight, BookOpen, HelpCircle, Trophy, Settings as SettingsIcon } from "lucide-react";

interface HomeViewProps {
  onStartSetup: () => void;
  onShowLeaderboard: () => void;
  settings: {
    soundEffects: boolean;
    misterWhiteStarts: boolean;
  };
  onSettingsChange: (newSettings: { soundEffects: boolean; misterWhiteStarts: boolean }) => void;
  playSound: (type: 'click' | 'win' | 'lose') => void;
}

export default function HomeView({ onStartSetup, onShowLeaderboard, settings, onSettingsChange, playSound }: HomeViewProps) {
  const [showRules, setShowRules] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center animate-fade-in">
      <div className="mb-16 sm:mb-20">
        <div className="flex items-center justify-center gap-4 mb-5">
          <img
            src="/favicon/android-chrome-192x192.png"
            alt="Meneer Wit logo"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 shrink-0 dark:ring-2 dark:ring-white/15 dark:ring-offset-2 dark:ring-offset-background dark:shadow-[0_12px_40px_-6px_rgba(0,0,0,0.75)]"
          />
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/60">Meneer Wit</h1>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground font-medium tracking-wide">De gratis Nederlandse versie van Undercover & Mister White - met onbeperkte woorden.</p>
        <div className="flex items-center gap-2 justify-center mt-3 flex-wrap">
          {[
            { icon: "✦", label: "100% Gratis" },
            { icon: "👥", label: "2-10 spelers" },
            { icon: "📱", label: "iOS app" },
          ].map(({ icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-secondary border border-border/60 text-muted-foreground">
              <span className="text-primary text-[10px]">{icon}</span>
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full max-w-xs flex flex-col items-center mb-12">
        <button
          onClick={onStartSetup}
          className="w-full py-4 sm:py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-lg sm:text-xl hover:bg-primary/90 hover:scale-[1.02] transition-all active:scale-95 shadow-xl shadow-primary/25 hover:shadow-primary/40 flex items-center justify-center gap-2"
        >
          Speel Nu
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="flex items-center gap-3 w-full my-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">of</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <a
          href="https://apps.apple.com/us/app/meneerwit/id6794354598"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playSound('click')}
          className="w-full py-3 sm:py-3.5 px-4 rounded-2xl bg-secondary border border-border/60 hover:bg-secondary/70 hover:scale-[1.02] transition-all active:scale-95 shadow-sm flex items-center justify-center gap-3"
        >
          <svg viewBox="0 0 384 512" aria-hidden="true" className="w-6 h-6 fill-current shrink-0">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
          </svg>
          <span className="flex flex-col items-start leading-tight">
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Download in de</span>
            <span className="text-base font-bold">App Store</span>
          </span>
        </a>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 bg-background/80 backdrop-blur-2xl border-t border-border/40 flex justify-around items-center z-10 shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
        <button onClick={() => { playSound('click'); setShowRules(true); }} className="flex flex-col items-center gap-1 group transition-transform hover:scale-110">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-sm">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground">Regels</span>
        </button>

        <button onClick={() => { playSound('click'); setShowExplanation(true); }} className="flex flex-col items-center gap-1 group transition-transform hover:scale-110">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-sm">
            <HelpCircle className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground">Uitleg</span>
        </button>

        <button onClick={() => { onShowLeaderboard(); }} className="flex flex-col items-center gap-1 group transition-transform hover:scale-110">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-sm">
            <Trophy className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground">Ranglijst</span>
        </button>

        <button onClick={() => { playSound('click'); setShowSettings(true); }} className="flex flex-col items-center gap-1 group transition-transform hover:scale-110">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-sm">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground">Opties</span>
        </button>
      </div>

      {showRules && <RulesModal onClose={() => setShowRules(false)} playSound={playSound} />}
      {showExplanation && <ExplanationModal onClose={() => setShowExplanation(false)} playSound={playSound} />}
      {showSettings && (
        <SettingsModal 
          onClose={() => setShowSettings(false)} 
          settings={settings}
          onSettingsChange={onSettingsChange}
          playSound={playSound}
        />
      )}
    </div>
  );
}
