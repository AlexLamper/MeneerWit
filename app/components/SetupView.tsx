interface SetupViewProps {
  playerCount: number;
  setPlayerCount: (count: number) => void;
  roles: { burgers: number; undercovers: number; misterWhites: number };
  setRoles: React.Dispatch<React.SetStateAction<{ burgers: number; undercovers: number; misterWhites: number }>>;
  onStartGame: () => void;
  onBack: () => void;
  playSound: (type: 'click' | 'win' | 'lose') => void;
}

export default function SetupView({ playerCount, setPlayerCount, roles, setRoles, onStartGame, onBack, playSound }: SetupViewProps) {
  const totalRoles = roles.burgers + roles.undercovers + roles.misterWhites;
  const isValid = totalRoles === playerCount && roles.undercovers >= 1 && roles.burgers >= 2;

  const updateRole = (type: keyof typeof roles, delta: number) => {
    playSound('click');
    setRoles(prev => {
      const next = { ...prev, [type]: Math.max(0, prev[type] + delta) };
      return next;
    });
  };

  return (
    <div className="flex flex-col h-screen p-4 sm:p-6 bg-background overflow-hidden">
      <button onClick={onBack} className="mb-4 sm:mb-8 text-muted-foreground font-bold text-left hover:text-foreground transition-colors flex items-center gap-2">
        <span>←</span> Terug
      </button>
      
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Spelconfiguratie</h2>
      
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="mb-8 sm:mb-12">
          <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs mb-2 sm:mb-4">Aantal spelers</p>
          <div className="text-4xl sm:text-5xl font-bold mb-4">{playerCount} spelers</div>
          <input 
            type="range" 
            min="3" 
            max="20" 
            step="1"
            value={playerCount} 
            onChange={(e) => setPlayerCount(parseInt(e.target.value))}
            className="w-full h-4 bg-secondary rounded-full appearance-none cursor-pointer accent-primary hover:bg-secondary/80 transition-colors"
          />
        </div>

        <div className="space-y-3 sm:space-y-6 mb-8 sm:mb-12">
          <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Rolverdeling</p>
          
          <div className="flex items-center justify-between p-3 sm:p-4 bg-secondary rounded-2xl hover:bg-secondary/80 transition-colors">
            <div>
              <div className="font-bold text-sm sm:text-base">Burgers</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Hebben het woord</div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <button onClick={() => updateRole("burgers", -1)} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-border flex items-center justify-center font-bold hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-90">-</button>
              <span className="font-bold text-lg sm:text-xl w-6 text-center">{roles.burgers}</span>
              <button onClick={() => updateRole("burgers", 1)} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-border flex items-center justify-center font-bold hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-90">+</button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 sm:p-4 bg-secondary rounded-2xl hover:bg-secondary/80 transition-colors">
            <div>
              <div className="font-bold text-sm sm:text-base">Undercovers</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Hebben een ander woord</div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <button onClick={() => updateRole("undercovers", -1)} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-border flex items-center justify-center font-bold hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-90">-</button>
              <span className="font-bold text-lg sm:text-xl w-6 text-center">{roles.undercovers}</span>
              <button onClick={() => updateRole("undercovers", 1)} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-border flex items-center justify-center font-bold hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-90">+</button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 sm:p-4 bg-secondary rounded-2xl hover:bg-secondary/80 transition-colors">
            <div>
              <div className="font-bold text-sm sm:text-base">Mister White</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Heeft geen woord</div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <button onClick={() => updateRole("misterWhites", -1)} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-border flex items-center justify-center font-bold hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-90">-</button>
              <span className="font-bold text-lg sm:text-xl w-6 text-center">{roles.misterWhites}</span>
              <button onClick={() => updateRole("misterWhites", 1)} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-border flex items-center justify-center font-bold hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-90">+</button>
            </div>
          </div>
        </div>
      </div>

      {!isValid && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-xl text-sm mb-6 animate-fade-in">
          {totalRoles !== playerCount ? `Totaal aantal rollen (${totalRoles}) moet gelijk zijn aan aantal spelers (${playerCount}).` : 
           roles.undercovers < 1 ? "Er moet minimaal 1 Undercover zijn." : 
           "Er moeten minimaal 2 Burgers zijn."}
        </div>
      )}

      <button 
        disabled={!isValid}
        onClick={onStartGame}
        className="mt-4 w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-xl disabled:opacity-30 transition-all active:scale-95 hover:scale-[1.02] shadow-lg"
      >
        Start spel
      </button>
    </div>
  );
}
