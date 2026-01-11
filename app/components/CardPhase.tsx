import { useEffect, useState } from "react";
import { GameState } from "@/lib/gameLogic";
import { getPlayerNames } from "@/lib/leaderboard";

interface CardPhaseProps {
  gameState: GameState | null;
  currentPlayerIndex: number;
  isCardOpen: boolean;
  setIsCardOpen: (isOpen: boolean) => void;
  playerNameInput: string;
  setPlayerNameInput: (name: string) => void;
  onNextPlayer: () => void;
  playSound: (type: 'click' | 'win' | 'lose') => void;
}

export default function CardPhase({ 
  gameState, 
  currentPlayerIndex, 
  isCardOpen, 
  setIsCardOpen, 
  playerNameInput, 
  setPlayerNameInput, 
  onNextPlayer,
  playSound
}: CardPhaseProps) {
  const [knownPlayers, setKnownPlayers] = useState<string[]>([]);
  const [showWord, setShowWord] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setKnownPlayers(getPlayerNames());
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  // Reset showWord when moving to next player
  useEffect(() => {
    setTimeout(() => setShowWord(false), 0);
  }, [currentPlayerIndex]);

  if (!gameState) return null;
  const currentPlayer = gameState.players[currentPlayerIndex];

  // Filter out names already used in this game session
  const usedNames = gameState.players
    .filter((_, idx) => idx < currentPlayerIndex)
    .map(p => p.name.toLowerCase());

  const availablePlayers = knownPlayers.filter(name => !usedNames.includes(name.toLowerCase()));

  const handleViewCardClick = () => {
    playSound('click');
    if (!gameState) return;
    
    const nameToUse = playerNameInput.trim() || `Speler ${currentPlayerIndex + 1}`;
    
    // Check for duplicates
    const isDuplicate = gameState.players.some((p, index) => 
      index !== currentPlayerIndex && 
      p.name.toLowerCase().trim() === nameToUse.toLowerCase()
    );

    if (isDuplicate) {
      alert("Deze naam is al gekozen! Kies een andere naam.");
      return;
    }

    setIsCardOpen(true);
  };

  const handleConfirmReveal = () => {
    playSound('click');
    setShowWord(true);
  };

  return (
    <div className="flex flex-col h-full p-4 sm:p-6 bg-background items-center justify-center text-center">
      {!isCardOpen ? (
        <div className="w-full max-w-xs animate-fade-in">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Geef de telefoon aan</h2>
          <div className="text-3xl sm:text-4xl font-black mb-6 sm:mb-8">Speler {currentPlayerIndex + 1}</div>
          
          <div className="mb-6 sm:mb-8 text-left">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 ml-1">Voer je naam in</p>
            <input 
              type="text" 
              value={playerNameInput}
              onChange={(e) => setPlayerNameInput(e.target.value)}
              className="w-full p-3 sm:p-4 bg-secondary rounded-2xl text-center font-bold text-lg sm:text-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all hover:bg-secondary/80 border-2 border-border focus:border-primary"
              placeholder="Je naam..."
            />
          </div>

          {availablePlayers.length > 0 && (
            <div className="mb-6 sm:mb-8 text-left animate-fade-in">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 ml-1">
                Of kies een bekende speler
              </p>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
                {availablePlayers.map(name => (
                  <button
                    key={name}
                    onClick={() => { playSound('click'); setPlayerNameInput(name); }}
                    className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border border-transparent ${
                      playerNameInput === name 
                        ? 'bg-primary text-primary-foreground shadow-md scale-105' 
                        : 'bg-secondary/50 hover:bg-secondary hover:border-primary/20'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button 
            onClick={handleViewCardClick}
            className="w-full py-3 sm:py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg sm:text-xl active:scale-95 transition-all shadow-lg hover:bg-primary/90 hover:scale-[1.02]"
          >
            Bekijk kaart
          </button>
        </div>
      ) : (
        <div className="w-full max-w-xs">
          <div className="aspect-3/4 w-full mb-8 perspective-1000">
            <div 
              onClick={() => { if (!showWord) handleConfirmReveal(); }}
              className={`relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer ${showWord ? 'rotate-y-180' : ''}`}
            >
              {/* Front of the card (Hidden) */}
              <div className="absolute inset-0 backface-hidden bg-primary dark:bg-secondary rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center p-8 border-4 border-primary-foreground/10 dark:border-primary/10">
                <div className="w-20 h-20 bg-primary-foreground/10 dark:bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-4xl text-primary-foreground dark:text-primary font-black">?</span>
                </div>
                <h3 className="text-primary-foreground dark:text-primary text-2xl font-black mb-2">Tik om te onthullen</h3>
                <p className="text-primary-foreground/60 dark:text-primary/60 text-sm">Zorg dat niemand meekijkt!</p>
              </div>

              {/* Back of the card (Revealed) */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-card text-card-foreground rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center p-8 border-2 border-border overflow-hidden">
                {currentPlayer.role === "Mister White" && (
                  <>
                    <div className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-muted-foreground">Jouw Rol</div>
                    <div className="text-3xl font-black mb-8 text-foreground">Mister White</div>
                    
                    <div className="w-16 h-px bg-border mb-8" />
                  </>
                )}
                
                <div className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-muted-foreground">Jouw Woord</div>
                <div className="text-4xl font-black text-primary tracking-tight">
                  {currentPlayer.role === "Mister White" ? "???" : currentPlayer.word}
                </div>
                
                {currentPlayer.role === "Mister White" && (
                  <p className="mt-6 text-[10px] text-muted-foreground leading-relaxed max-w-50">
                    Je hebt geen woord. Luister goed naar de hints van anderen en probeer niet op te vallen!
                  </p>
                )}
              </div>
            </div>
          </div>

          {showWord && (
            <button 
              onClick={() => { playSound('click'); onNextPlayer(); }}
              className="w-full py-4 bg-secondary text-secondary-foreground rounded-2xl font-bold text-lg active:scale-95 transition-all hover:bg-secondary/80 animate-fade-in border-2 border-border"
            >
              Verberg & geef door
            </button>
          )}
        </div>
      )}
    </div>
  );
}
