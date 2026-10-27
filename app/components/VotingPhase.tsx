import { useState } from "react";
import { GameState, Player } from "@/lib/gameLogic";
import { Vote } from "lucide-react";
import { PlayerAvatar, RoleIcon, roleSurfaceClass, roleTextClass, RoleBadge } from "./GameBits";

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
  // Keep player order identical to the game-round screen to avoid misclicks.
  const getDisplayPlayers = () => {
    const players = [...gameState.players];
    const startId = gameState.startingPlayerId ?? 0;
    const startIndex = players.findIndex(p => p.id === startId);
    if (startIndex <= 0) return players;
    return [...players.slice(startIndex), ...players.slice(0, startIndex)];
  };

  const displayPlayers = getDisplayPlayers();

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
    <div className="flex flex-col h-full p-4 sm:p-6 animate-fade-in overflow-hidden pt-8 sm:pt-12">
      <h2 className="text-2xl sm:text-3xl font-black mb-2 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/60">Wie is verdacht?</h2>
      <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-8">Klik op een speler om te stemmen. De speler met de meeste stemmen wordt geëlimineerd.</p>
      
      <div className="flex-1 overflow-y-auto pr-2 mb-4 sm:mb-8">
        <div className="grid grid-cols-2 gap-2 sm:gap-4 pt-4 px-2">
          {displayPlayers.map(player => (
            <button 
              key={player.id}
              disabled={player.isEliminated}
              onClick={() => !player.isEliminated && handlePlayerClick(player)}
              className={`pl-2 pr-2 py-3 sm:p-4 rounded-xl sm:rounded-3xl border-2 transition-all relative group flex flex-row items-center text-left min-h-[3.5rem] sm:min-h-0 ${player.isEliminated ? 'bg-secondary border-transparent opacity-50 cursor-not-allowed' : 'border-border hover:border-primary hover:bg-secondary/30 bg-card shadow-sm active:scale-95'}`}
            >
              <span className="mr-2 sm:mr-3 transition-transform group-hover:scale-110"><PlayerAvatar name={player.name} id={player.id} size={34} muted={player.isEliminated} /></span>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-sm sm:text-lg leading-tight break-words">{player.name}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {player.isEliminated ? 'Geëlimineerd' : 'Stemmen'}
                </div>
              </div>
              {!player.isEliminated && <Vote className="w-4 h-4 text-muted-foreground shrink-0" />}
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
                    className="w-full py-4 btn-game-danger rounded-2xl font-bold text-xl"
                  >
                    Elimineren
                  </button>
                  <button 
                    onClick={() => { playSound('click'); setRevealedPlayer(null); }}
                    className="w-full py-4 btn-game-secondary rounded-2xl font-bold text-xl"
                  >
                    Annuleren
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-3"><PlayerAvatar name={revealedPlayer.name} id={revealedPlayer.id} size={56} muted /></div>
                <h3 className="text-2xl font-black mb-4">{revealedPlayer.name} was...</h3>

                <div className={`mb-8 p-6 rounded-2xl border-2 animate-pop-in ${roleSurfaceClass(revealedPlayer.role)}`}>
                  <RoleIcon role={revealedPlayer.role} className={`w-8 h-8 mx-auto mb-2 ${roleTextClass(revealedPlayer.role)}`} />
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Rol</div>
                  <div className={`text-4xl font-black ${roleTextClass(revealedPlayer.role)}`}>{revealedPlayer.role}</div>
                </div>

                <button 
                  onClick={handleFinalEliminate}
                  className="w-full py-4 btn-game rounded-2xl font-bold text-xl"
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
          <div className="mb-4 animate-pop-in"><RoleBadge role="Mister White" large /></div>
          <h2 className="text-5xl font-black mb-4 text-center tracking-tight">Mister White</h2>
          <p className="text-xl mb-12 text-center opacity-70 max-w-xs">Je kunt nog winnen! Raad het woord van de Burgers:</p>
          
          <div className="w-full max-w-xs relative">
            <input 
              type="text" 
              value={misterWhiteGuess}
              onChange={(e) => setMisterWhiteGuess(e.target.value)}
              className="w-full p-6 bg-secondary rounded-3xl text-center font-bold text-2xl focus:outline-none border-2 border-border mb-8 placeholder:text-muted-foreground hover:bg-secondary/80 transition-colors focus:border-primary"
              placeholder="Typ het woord..."
              autoFocus
              autoComplete="off"
              onKeyDown={(e) => { if (e.key === "Enter" && misterWhiteGuess.trim()) onMisterWhiteGuess(); }}
            />
          </div>

          <button 
            onClick={onMisterWhiteGuess}
            disabled={!misterWhiteGuess.trim()}
            className="w-full max-w-xs py-5 btn-game rounded-2xl font-bold text-xl"
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
