import { useEffect, useState } from "react";
import { getLeaderboard, PlayerStats } from "@/lib/leaderboard";

interface LeaderboardViewProps {
  onBack: () => void;
  playSound: (type: 'click' | 'win' | 'lose') => void;
}

export default function LeaderboardView({ onBack, playSound }: LeaderboardViewProps) {
  const [leaderboard, setLeaderboard] = useState<PlayerStats[]>([]);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setLeaderboard(getLeaderboard());
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  const getRankIcon = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  const handleReset = () => {
    if (confirm("Weet je zeker dat je alle scores wilt wissen?")) {
      localStorage.removeItem("meneerwit_leaderboard");
      setLeaderboard([]);
      playSound('click');
    }
  };

  return (
    <div className="flex flex-col h-screen p-6 bg-background animate-fade-in overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { onBack(); }}
            className="w-10 h-10 flex items-center justify-center bg-secondary rounded-full hover:bg-secondary/80 transition-colors font-bold"
          >
            ←
          </button>
          <h2 className="text-3xl font-black">Ranglijst</h2>
        </div>
        {leaderboard.length > 0 && (
          <button 
            onClick={handleReset}
            className="text-xs font-bold text-muted-foreground hover:text-destructive transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {leaderboard.length === 0 ? (
          <div className="text-center text-muted-foreground mt-20">
            <div className="text-6xl mb-4">🏆</div>
            <p>Nog geen scores.</p>
            <p className="text-sm">Speel een spel om op het bord te komen!</p>
          </div>
        ) : (
          leaderboard.map((player, index) => (
            <div 
              key={player.name}
              className={`flex flex-col p-4 rounded-2xl border-2 transition-all ${index < 3 ? 'bg-secondary/50 border-primary/10' : 'bg-card border-border'}`}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 flex items-center justify-center text-2xl font-black mr-4">
                  {getRankIcon(index)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-bold truncate text-lg">{player.name}</div>
                  <div className="text-xs text-muted-foreground flex flex-wrap gap-x-3 gap-y-1">
                    <span>🏆 {player.wins} gewonnen</span>
                    <span>🎮 {player.gamesPlayed} gespeeld</span>
                  </div>
                </div>

                <div className="text-right pl-4">
                  <div className="text-2xl font-black text-primary">{player.score}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Punten</div>
                </div>
              </div>

              {(player.wronglyEliminatedCount > 0 || player.misterWhiteGuessWins > 0) && (
                <div className="mt-3 pt-3 border-t border-border/50 flex flex-wrap gap-2">
                  {player.wronglyEliminatedCount > 0 && (
                    <div className="px-2 py-1 bg-destructive/10 text-destructive text-[10px] font-bold rounded-lg flex items-center gap-1">
                      🕵️‍♂️ {player.wronglyEliminatedCount}x Verdacht
                    </div>
                  )}
                  {player.misterWhiteGuessWins > 0 && (
                    <div className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-lg flex items-center gap-1">
                      🧠 {player.misterWhiteGuessWins}x Meesterbrein
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
