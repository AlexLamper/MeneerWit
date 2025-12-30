import { useState } from "react";
import { GameState, Player } from "@/lib/gameLogic";

interface GameRoundProps {
  gameState: GameState | null;
  onStartVoting: () => void;
  playSound: (type: 'click' | 'win' | 'lose') => void;
}

export default function GameRound({ gameState, onStartVoting, playSound }: GameRoundProps) {
  const [viewingPlayer, setViewingPlayer] = useState<Player | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showWord, setShowWord] = useState(false);

  if (!gameState) return null;

  const handleEyeClick = (player: Player) => {
    playSound('click');
    setViewingPlayer(player);
    setShowConfirmation(true);
  };

  const handleConfirmView = () => {
    playSound('click');
    setShowConfirmation(false);
    setShowWord(true);
  };

  const handleCloseModal = () => {
    playSound('click');
    setViewingPlayer(null);
    setShowConfirmation(false);
    setShowWord(false);
  };

  return (
    <div className="flex flex-col h-screen p-6 bg-background overflow-hidden">
      <h2 className="text-3xl font-bold mb-4">Speelronde</h2>
      <p className="text-muted-foreground mb-8">Iedereen heeft zijn woord gezien. Begin met omschrijven in het echte leven!</p>
      
      <div className="flex-1 overflow-y-auto pr-2 mb-8">
        <div className="grid grid-cols-2 gap-4">
          {gameState.players.map(player => (
            <div 
              key={player.id} 
              className={`p-4 rounded-3xl border-2 transition-all relative group aspect-square flex flex-col items-center justify-center text-center ${player.isEliminated ? 'bg-secondary border-transparent opacity-50' : 'border-border hover:border-primary/20 bg-card shadow-sm'}`}
            >
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-3 text-2xl">
                👤
              </div>
              <div className="font-bold truncate w-full px-2 text-lg">{player.name}</div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">{player.isEliminated ? 'Geëlimineerd' : 'Actief'}</div>
              
              {!player.isEliminated && (
                <button 
                  onClick={() => handleEyeClick(player)}
                  className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={onStartVoting}
        className="mt-auto w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-xl active:scale-95 transition-all hover:bg-primary/90 hover:scale-[1.02] shadow-lg"
      >
        Ga naar stemmen
      </button>

      {/* Confirmation Modal */}
      {showConfirmation && viewingPlayer && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-card text-card-foreground rounded-[2.5rem] p-8 max-w-md w-full text-center shadow-2xl border border-border">
            <h3 className="text-2xl font-bold mb-2">Woord bekijken?</h3>
            <p className="text-muted-foreground mb-8">Ben jij <span className="font-bold text-foreground">{viewingPlayer.name}</span>? Alleen jij mag dit zien.</p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleConfirmView}
                className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-xl active:scale-95 transition-all shadow-lg"
              >
                Ja, toon mijn woord
              </button>
              <button 
                onClick={handleCloseModal}
                className="w-full py-4 bg-secondary text-secondary-foreground rounded-2xl font-bold text-xl active:scale-95 transition-all hover:bg-secondary/80"
              >
                Annuleren
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Word Reveal Modal */}
      {showWord && viewingPlayer && (
        <div className="fixed inset-0 bg-card text-card-foreground z-50 flex flex-col items-center justify-center p-6 animate-zoom-in">
          <div className="text-sm font-bold uppercase tracking-[0.2em] mb-4 opacity-50">Jouw Rol</div>
          <div className="text-3xl font-black mb-8">
            {viewingPlayer.role === "Burger" ? "Burger" : 
             viewingPlayer.role === "Undercover" ? "Undercover" : "Mister White"}
          </div>
          
          <div className="w-full max-w-xs h-px bg-border mb-8" />
          
          <div className="text-sm font-bold uppercase tracking-[0.2em] mb-4 opacity-50">Jouw Woord</div>
          <div className="text-4xl font-black break-all mb-12 text-center">
            {viewingPlayer.role === "Mister White" ? "???" : viewingPlayer.word}
          </div>

          <button 
            onClick={handleCloseModal}
            className="w-full max-w-xs py-4 bg-secondary text-secondary-foreground rounded-2xl font-bold text-xl active:scale-95 transition-all hover:bg-secondary/80"
          >
            Sluiten
          </button>
        </div>
      )}
    </div>
  );
}
