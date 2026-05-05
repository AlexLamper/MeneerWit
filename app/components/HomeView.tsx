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
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 shrink-0"
          />
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/60">Meneer Wit</h1>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground font-medium tracking-wide">De gratis Nederlandse versie van Undercover & Mister White - met onbeperkte woorden.</p>
        <div className="flex items-center gap-2 justify-center mt-3 flex-wrap">
          {[
            { icon: "✦", label: "100% Gratis" },
            { icon: "👥", label: "2–10 spelers" },
            { icon: "⚡", label: "Geen download" },
          ].map(({ icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-secondary border border-border/60 text-muted-foreground">
              <span className="text-primary text-[10px]">{icon}</span>
              {label}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={onStartSetup}
        className="w-full max-w-xs py-4 sm:py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-lg sm:text-xl hover:bg-primary/90 hover:scale-[1.02] transition-all active:scale-95 shadow-xl shadow-primary/25 hover:shadow-primary/40 mb-12 flex items-center justify-center gap-2"
      >
        Speel Nu
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

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
