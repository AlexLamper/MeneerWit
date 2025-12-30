import { useState } from "react";
import { GameState, Player } from "@/lib/gameLogic";
import { Fingerprint, Skull } from "lucide-react";

interface VotingPhaseProps {
  gameState: GameState | null;
  onEliminate: (playerId: number) => void;
  showMisterWhiteGuess: boolean;
  misterWhiteGuess: string;
  setMisterWhiteGuess: (guess: string) => void;
  onMisterWhiteGuess: () => void;
  onCheckWin: () => void;
  playSound: (type: 'click' | 'win' | 'lose') => void;
}

export default function VotingPhase({ 
  gameState, 
  onEliminate, 
  showMisterWhiteGuess, 
  misterWhiteGuess, 
  setMisterWhiteGuess, 
  onMisterWhiteGuess,
  onCheckWin,
  playSound
}: VotingPhaseProps) {
  const [revealedPlayer, setRevealedPlayer] = useState<Player | null>(null);
  const [eliminationStep, setEliminationStep] = useState<"confirm" | "reveal">("confirm");

  if (!gameState) return null;
  const activePlayers = gameState.players.filter(p => !p.isEliminated);

  const handlePlayerClick = (player: Player) => {
    playSound('click');
    setRevealedPlayer(player);
    setEliminationStep("confirm");
  };

  const handleConfirmClick = () => {
    playSound('click');
    setEliminationStep("reveal");
  };

  const handleFinalEliminate = () => {
    playSound('click');
    if (revealedPlayer) {
      onEliminate(revealedPlayer.id);
      setRevealedPlayer(null);
      setEliminationStep("confirm");
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 sm:p-6 bg-background animate-fade-in overflow-hidden">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Wie is verdacht?</h2>
      <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-8">Klik op een speler om te stemmen. De speler met de meeste stemmen wordt geëlimineerd.</p>
      
      <div className="flex-1 overflow-y-auto pr-2 mb-4 sm:mb-8">
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          {gameState.players.map(player => (
            <button 
              key={player.id}
              disabled={player.isEliminated}
              onClick={() => !player.isEliminated && handlePlayerClick(player)}
              className={`p-2 sm:p-4 rounded-xl sm:rounded-3xl border-2 transition-all relative group flex flex-row items-center text-left min-h-[3.5rem] sm:min-h-0 ${player.isEliminated ? 'bg-secondary border-transparent opacity-50 cursor-not-allowed' : 'border-border hover:border-primary hover:bg-secondary/30 bg-card shadow-sm active:scale-95'}`}
            >
              <div className={`w-8 h-8 sm:w-12 sm:h-12 shrink-0 rounded-full flex items-center justify-center mr-2 sm:mr-3 text-sm sm:text-2xl transition-colors ${player.isEliminated ? 'bg-secondary' : 'bg-primary text-primary-foreground group-hover:scale-110'}`}>
                {player.isEliminated ? <Skull className="w-5 h-5 sm:w-6 sm:h-6" /> : <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold truncate text-sm sm:text-lg leading-tight">{player.name}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {player.isEliminated ? 'Geëlimineerd' : 'Stemmen'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Reveal Modal */}
      {revealedPlayer && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-card text-card-foreground rounded-[2.5rem] p-8 max-w-md w-full text-center shadow-2xl border border-border">
            {eliminationStep === "confirm" ? (
              <>
                <h3 className="text-2xl font-bold mb-2">Elimineer {revealedPlayer.name}?</h3>
                <p className="text-muted-foreground mb-8">Weet je het zeker? Zijn rol wordt onthuld.</p>
                
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleConfirmClick}
                    className="w-full py-4 bg-destructive text-destructive-foreground rounded-2xl font-bold text-xl active:scale-95 transition-all shadow-lg hover:bg-destructive/90"
                  >
                    Elimineren
                  </button>
                  <button 
                    onClick={() => { playSound('click'); setRevealedPlayer(null); }}
                    className="w-full py-4 bg-secondary text-secondary-foreground rounded-2xl font-bold text-xl active:scale-95 transition-all hover:bg-secondary/80"
                  >
                    Annuleren
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-2">{revealedPlayer.name} was...</h3>
                
                <div className="mb-8 p-6 bg-secondary rounded-2xl animate-zoom-in">
                  <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">Rol</div>
                  <div className="text-4xl font-black">{revealedPlayer.role}</div>
                </div>

                <button 
                  onClick={handleFinalEliminate}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-xl active:scale-95 transition-all shadow-lg"
                >
                  Doorgaan
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {showMisterWhiteGuess && (
        <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center p-6 text-foreground animate-fade-in">
          <div className="absolute top-12 text-sm font-bold uppercase tracking-[0.3em] opacity-50">Ontmaskerd!</div>
          <h2 className="text-5xl font-black mb-4 text-center">Mister White</h2>
          <p className="text-xl mb-12 text-center opacity-70 max-w-xs">Je kunt nog winnen! Raad het woord van de Burgers:</p>
          
          <div className="w-full max-w-xs relative">
            <input 
              type="text" 
              value={misterWhiteGuess}
              onChange={(e) => setMisterWhiteGuess(e.target.value)}
              className="w-full p-6 bg-secondary rounded-3xl text-center font-bold text-2xl focus:outline-none border-2 border-border mb-8 placeholder:text-muted-foreground hover:bg-secondary/80 transition-colors"
              placeholder="Typ het woord..."
              autoFocus
              autoComplete="off"
            />
          </div>

          <button 
            onClick={onMisterWhiteGuess}
            className="w-full max-w-xs py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-xl active:scale-95 transition-all shadow-2xl hover:scale-[1.02]"
          >
            Bevestig Woord
          </button>
          
          <button 
            onClick={() => {
              onCheckWin(); // Just proceed without guessing
            }}
            className="mt-8 text-muted-foreground font-bold hover:text-foreground transition-colors hover:scale-105"
          >
            Ik weet het niet
          </button>
        </div>
      )}
    </div>
  );
}
