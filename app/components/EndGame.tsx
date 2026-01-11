import { GameState } from "@/lib/gameLogic";
import { useEffect } from "react";
import confetti from "canvas-confetti";

interface EndGameProps {
  gameState: GameState | null;
  onRestart: () => void;
  onHome: () => void;
  playSound: (type: 'click' | 'win' | 'lose') => void;
}

export default function EndGame({ gameState, onRestart, onHome, playSound }: EndGameProps) {
  useEffect(() => {
    if (gameState?.winner) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: NodeJS.Timeout = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [gameState?.winner]);

  if (!gameState) return null;

  return (
    <div className="flex flex-col h-full p-6 bg-background items-center justify-center text-center animate-zoom-in">
      <div className="text-sm font-bold uppercase tracking-[0.3em] mb-4 text-muted-foreground">Einde Spel</div>
      <h2 className="text-5xl font-black mb-8 leading-tight">
        {gameState.winner === "Burgers" ? "Burgers winnen!" : 
         gameState.winner === "Mister White" ? "Mister White wint!" : 
         "Infiltranten winnen!"}
      </h2>

      <div className="w-full space-y-2 mb-12 max-h-[40vh] overflow-y-auto pr-2">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-4 mb-2">
          <span>Speler</span>
          <span>Rol & Woord</span>
        </div>
        {gameState.players.map(player => (
          <div key={player.id} className={`flex justify-between items-center p-4 rounded-2xl transition-all hover:scale-[1.01] ${player.isEliminated ? 'bg-secondary opacity-60' : 'bg-secondary hover:bg-secondary/80'}`}>
            <div className="font-bold flex items-center gap-2">
              {player.isEliminated && <span className="text-xs">💀</span>}
              {player.name}
            </div>
            <div className="text-right">
              <div className="text-sm font-black">{player.role}</div>
              {player.word && <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{player.word}</div>}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button 
          onClick={onRestart}
          className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-xl active:scale-95 transition-all shadow-lg hover:bg-primary/90 hover:scale-[1.02]"
        >
          Opnieuw spelen
        </button>
        <button 
          onClick={onHome}
          className="w-full py-4 bg-secondary text-secondary-foreground rounded-2xl font-bold text-lg active:scale-95 transition-all hover:bg-secondary/80 hover:scale-[1.02]"
        >
          Terug naar start
        </button>
      </div>
    </div>
  );
}
