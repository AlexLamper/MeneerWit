import { useState } from "react";
import RulesModal from "./RulesModal";
import SettingsModal from "./SettingsModal";
import ExplanationModal from "./ExplanationModal";
import { Play, BookOpen, HelpCircle, Trophy, Settings as SettingsIcon } from "lucide-react";

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
    <div className="flex flex-col items-center justify-start h-full p-6 text-center animate-fade-in overflow-y-auto pt-12 no-scrollbar">
      <div className="mb-8 sm:mb-12 shrink-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary rounded-4xl mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-primary/20 rotate-3 hover:rotate-6 transition-transform duration-300">
          <span className="text-primary-foreground text-4xl sm:text-5xl font-black drop-shadow-lg">?</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tighter mb-2 text-foreground drop-shadow-sm">Meneer Wit</h1>
        <p className="text-base sm:text-lg text-muted-foreground font-medium">De Nederlandse Mister White</p>
      </div>
      
      <button 
        onClick={onStartSetup}
        className="w-full max-w-xs py-5 bg-primary text-primary-foreground rounded-3xl font-bold text-xl sm:text-2xl hover:bg-primary/90 hover:scale-105 transition-all active:scale-95 shadow-2xl shadow-primary/30 hover:shadow-primary/40 mb-12 flex items-center justify-center gap-3"
      >
        <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current" />
        Speel Nu
      </button>

      {/* SEO Content Section - Visible for crawlers but unobtrusive */}
      <div className="w-full max-w-2xl text-left mb-24 opacity-80 space-y-8 px-4">
        <section>
          <h2 className="text-2xl font-bold mb-3">Wat is Meneer Wit?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Meneer Wit is het populairste <strong>gratis online undercover spel</strong> van Nederland. 
            Dit spannende gezelschapsspel is geïnspireerd op bekende titels zoals &quot;Mr. White&quot; en &quot;Undercover&quot;. 
            Speel direct in je browser zonder app te downloaden. Perfect voor feestjes, borrels of spelletjesavonden.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Hoe speel je Meneer Wit online?</h2>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-2">
            <li><strong>Rollen:</strong> Iedereen krijgt een woord, behalve <em className="text-foreground font-medium">Mister Wit</em>. Hij weet van niets.</li>
            <li><strong>Undercover:</strong> Pas op! De Infiltranten (Undercovers) hebben een nét iets ander woord.</li>
            <li><strong>Doel:</strong> Ontmasker de bedriegers voordat ze het spel winnen.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Waarom deze versie spelen?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            In tegenstelling tot betaalde apps, is deze versie <strong>100% gratis</strong> en bevat het duizenden Nederlandse woorden. 
            Geen in-app aankopen, geen reclame die het spel onderbreekt.
            Geschikt voor iPhones, Android telefoons en tablets.
            Speel met 3 tot 20 spelers tegelijk!
          </p>
        </section>
        
        <div className="text-[10px] text-muted-foreground/50 pt-8 border-t border-border">
          Trefwoorden: mister white game, gratis mr white, wie is de mol app, weerwolven online, 
          party games nederlands, drankspelletjes app, woordrader, geheime woord spel.
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 sm:p-8 bg-background/80 backdrop-blur-md border-t border-border flex justify-around items-center z-10">
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
