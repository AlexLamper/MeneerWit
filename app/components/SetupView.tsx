import { CATEGORIES } from "@/lib/gameData";

interface SetupViewProps {
  playerCount: number;
  setPlayerCount: (count: number) => void;
  roles: { burgers: number; undercovers: number; misterWhites: number };
  setRoles: React.Dispatch<React.SetStateAction<{ burgers: number; undercovers: number; misterWhites: number }>>;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  customWordPair: { burger: string; undercover: string };
  setCustomWordPair: (pair: { burger: string; undercover: string }) => void;
  onStartGame: () => void;
  onBack: () => void;
  playSound: (type: 'click' | 'win' | 'lose') => void;
}

export default function SetupView({ 
  playerCount, 
  setPlayerCount, 
  roles, 
  setRoles, 
  selectedCategory,
  setSelectedCategory,
  customWordPair,
  setCustomWordPair,
  onStartGame, 
  onBack, 
  playSound 
}: SetupViewProps) {
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
    <div className="flex flex-col h-full p-4 sm:p-6 bg-background overflow-hidden">
      <div className="flex items-center mb-4 sm:mb-6 gap-4">
        <button 
          onClick={onBack} 
          className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-secondary rounded-full hover:bg-secondary/80 transition-colors font-bold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="-ml-0.5"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="text-xl sm:text-2xl font-bold">Spelconfiguratie</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-6 sm:space-y-8">
        <div>
          <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px] mb-1 sm:mb-2">Aantal spelers</p>
          <div className="text-3xl sm:text-4xl font-bold mb-2">{playerCount} spelers</div>
          <input 
            type="range" 
            min="3" 
            max="20" 
            step="1"
            value={playerCount} 
            onChange={(e) => setPlayerCount(parseInt(e.target.value))}
            className="w-full h-3 bg-secondary rounded-full appearance-none cursor-pointer accent-primary hover:bg-secondary/80 transition-colors"
          />
        </div>

        <div className="space-y-2 sm:space-y-3">
          <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Rolverdeling</p>
          
          <div className="flex items-center justify-between p-2 sm:p-3 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors">
            <div>
              <div className="font-bold text-xs sm:text-sm">Burgers</div>
              <div className="text-[10px] text-muted-foreground">Hebben het woord</div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button onClick={() => updateRole("burgers", -1)} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-border flex items-center justify-center font-bold hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-90">-</button>
              <span className="font-bold text-base sm:text-lg w-5 text-center">{roles.burgers}</span>
              <button onClick={() => updateRole("burgers", 1)} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-border flex items-center justify-center font-bold hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-90">+</button>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 sm:p-3 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors">
            <div>
              <div className="font-bold text-xs sm:text-sm">Undercovers</div>
              <div className="text-[10px] text-muted-foreground">Hebben een ander woord</div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button onClick={() => updateRole("undercovers", -1)} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-border flex items-center justify-center font-bold hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-90">-</button>
              <span className="font-bold text-base sm:text-lg w-5 text-center">{roles.undercovers}</span>
              <button onClick={() => updateRole("undercovers", 1)} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-border flex items-center justify-center font-bold hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-90">+</button>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 sm:p-3 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors">
            <div>
              <div className="font-bold text-xs sm:text-sm">Mister White</div>
              <div className="text-[10px] text-muted-foreground">Heeft geen woord</div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button onClick={() => updateRole("misterWhites", -1)} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-border flex items-center justify-center font-bold hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-90">-</button>
              <span className="font-bold text-base sm:text-lg w-5 text-center">{roles.misterWhites}</span>
              <button onClick={() => updateRole("misterWhites", 1)} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-border flex items-center justify-center font-bold hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-90">+</button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Woord Categorie</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(CATEGORIES).map(cat => (
              <button
                key={cat}
                onClick={() => { playSound('click'); setSelectedCategory(cat); }}
                className={`p-2 rounded-lg font-bold text-xs transition-all ${selectedCategory === cat ? 'bg-primary text-primary-foreground shadow-md scale-[1.02]' : 'bg-secondary hover:bg-secondary/80'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 pb-4">
          <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Eigen Woorden (Optioneel)</p>
          <div className="grid grid-cols-2 gap-2">
            <input 
              type="text"
              placeholder="Burger"
              value={customWordPair.burger}
              onChange={(e) => setCustomWordPair({ ...customWordPair, burger: e.target.value })}
              className="bg-secondary p-3 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            <input 
              type="text"
              placeholder="Undercover"
              value={customWordPair.undercover}
              onChange={(e) => setCustomWordPair({ ...customWordPair, undercover: e.target.value })}
              className="bg-secondary p-3 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>
      </div>

      {!isValid && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-xl text-[10px] mb-4 animate-fade-in">
          {totalRoles !== playerCount ? `Totaal aantal rollen (${totalRoles}) moet gelijk zijn aan aantal spelers (${playerCount}).` : 
           roles.undercovers < 1 ? "Er moet minimaal 1 Undercover zijn." : 
           "Er moeten minimaal 2 Burgers zijn."}
        </div>
      )}

      <button 
        disabled={!isValid}
        onClick={onStartGame}
        className="mt-2 w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold text-lg disabled:opacity-30 transition-all active:scale-95 hover:scale-[1.02] shadow-lg"
      >
        Start spel
      </button>
    </div>
  );
}
