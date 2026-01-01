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
    return `#${index + 1}`;
  };

  return (
    <div className="flex flex-col h-full p-6 bg-background animate-fade-in overflow-hidden">
      <div className="flex items-center mb-8">
        <div className="flex items-center gap-4 min-w-0">
          <button 
            onClick={() => { onBack(); }}
            className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-secondary rounded-full hover:bg-secondary/80 transition-colors font-bold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="-ml-0.5"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <h2 className="text-3xl font-black truncate">Ranglijst</h2>
        </div>
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
              className={`relative overflow-hidden flex flex-col py-7 px-5 rounded-3xl border transition-all duration-300 hover:shadow-lg ${
                index === 0 ? 'bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/30' : 
                index === 1 ? 'bg-gradient-to-br from-slate-300/10 to-slate-400/5 border-slate-400/30' :
                index === 2 ? 'bg-gradient-to-br from-[#CD7F32]/10 to-[#CD7F32]/5 border-[#CD7F32]/30' :
                'bg-card border-border hover:border-primary/30'
              }`}
            >
              {/* Rank Badge */}
              <div className="absolute -top-2 -right-2 w-16 h-16 opacity-10 pointer-events-none">
                <div className="text-6xl font-black italic">{index + 1}</div>
              </div>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${
                    index === 0 ? 'bg-yellow-500 text-white' : 
                    index === 1 ? 'bg-slate-400 text-white' :
                    index === 2 ? 'bg-[#CD7F32] text-white' :
                    'bg-secondary text-muted-foreground'
                  }`}>
                    {getRankIcon(index)}
                  </div>
                  
                  <div className="min-w-0">
                    <div className="font-black truncate text-xl tracking-tight">{player.name}</div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        <span className="w-1 h-1 rounded-full bg-primary/40" /> {player.gamesPlayed} games
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        <span className="w-1 h-1 rounded-full bg-green-500/40" /> {player.wins} wins
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-3xl font-black tracking-tighter ${index < 3 ? 'text-primary' : 'text-foreground'}`}>
                    {player.score}
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 -mt-1">Punten</div>
                </div>
              </div>

              {player.misterWhiteGuessWins > 0 && (
                <div className="mt-4 pt-4 border-t border-border/40 flex flex-wrap gap-2 relative z-10">
                  <div className="px-3 py-1.5 bg-primary/5 border border-primary/10 text-primary text-[10px] font-black rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                    <span className="text-xs">🧠</span> {player.misterWhiteGuessWins}x Meesterbrein
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
