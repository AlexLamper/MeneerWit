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

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setKnownPlayers(getPlayerNames());
    });
    return () => cancelAnimationFrame(handle);
  }, []);

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

  return (
    <div className="flex flex-col min-h-screen p-6 bg-background items-center justify-center text-center">
      {!isCardOpen ? (
        <div className="w-full max-w-xs animate-fade-in">
          <h2 className="text-2xl font-bold mb-2">Geef de telefoon aan</h2>
          <div className="text-4xl font-black mb-8">Speler {currentPlayerIndex + 1}</div>
          
          <div className="mb-8 text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 ml-1">Voer je naam in</p>
            <input 
              type="text" 
              value={playerNameInput}
              onChange={(e) => setPlayerNameInput(e.target.value)}
              className="w-full p-4 bg-secondary rounded-2xl text-center font-bold text-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all hover:bg-secondary/80 border-2 border-border focus:border-primary"
              placeholder="Je naam..."
            />
          </div>

          {availablePlayers.length > 0 && (
            <div className="mb-8 text-left animate-fade-in">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 ml-1">
                Of kies een bekende speler
              </p>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
                {availablePlayers.map(name => (
                  <button
                    key={name}
                    onClick={() => { playSound('click'); setPlayerNameInput(name); }}
                    className={`px-3 py-2 rounded-xl text-sm font-bold transition-all border border-transparent ${
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
            className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-xl active:scale-95 transition-all shadow-lg hover:bg-primary/90 hover:scale-[1.02]"
          >
            Bekijk kaart
          </button>
        </div>
      ) : (
        <div className="w-full max-w-xs animate-zoom-in">
          <div className="bg-card text-card-foreground border border-border p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3rem] mb-8 shadow-2xl aspect-[3/4] flex flex-col items-center justify-center relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
            
            <div className="text-sm font-bold uppercase tracking-[0.2em] mb-4 opacity-50">Jouw Rol</div>
            <div className="text-3xl font-black mb-8">
              {currentPlayer.role === "Burger" ? "Burger" : 
               currentPlayer.role === "Undercover" ? "Undercover" : "Mister White"}
            </div>
            
            <div className="w-full h-px bg-border mb-8" />
            
            <div className="text-sm font-bold uppercase tracking-[0.2em] mb-4 opacity-50">Jouw Woord</div>
            <div className="text-4xl font-black break-all">
              {currentPlayer.role === "Mister White" ? "???" : currentPlayer.word}
            </div>
            {currentPlayer.role === "Mister White" && (
              <p className="mt-4 text-xs opacity-50">Je hebt geen woord. Luister goed naar de hints van anderen!</p>
            )}
          </div>

          <button 
            onClick={() => { playSound('click'); onNextPlayer(); }}
            className="w-full py-4 bg-secondary text-secondary-foreground rounded-2xl font-bold text-xl active:scale-95 transition-all hover:bg-secondary/80 hover:scale-[1.02]"
          >
            Verberg & geef door
          </button>
        </div>
      )}
    </div>
  );
}
