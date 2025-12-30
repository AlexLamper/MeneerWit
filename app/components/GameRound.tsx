import { useState, useEffect, useRef } from "react";
import { GameState, Player } from "@/lib/gameLogic";
import { RefreshCcw, Settings, UserPlus, Eye, User } from "lucide-react";
import SettingsModal from "./SettingsModal";

interface GameRoundProps {
  gameState: GameState | null;
  onStartVoting: () => void;
  playSound: (type: 'click' | 'win' | 'lose') => void;
  onNewWords: () => void;
  onAddPlayer: () => void;
  settings: {
    soundEffects: boolean;
    misterWhiteStarts: boolean;
  };
  onSettingsChange: (newSettings: { soundEffects: boolean; misterWhiteStarts: boolean }) => void;
}

export default function GameRound({ 
  gameState, 
  onStartVoting, 
  playSound,
  onNewWords,
  onAddPlayer,
  settings,
  onSettingsChange
}: GameRoundProps) {
  const [viewingPlayer, setViewingPlayer] = useState<Player | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showWord, setShowWord] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNewWordConfirm, setShowNewWordConfirm] = useState(false);
  const [newPlayer, setNewPlayer] = useState<Player | null>(null);
  const prevPlayerCount = useRef(gameState ? gameState.players.length : 0);

  useEffect(() => {
    if (!gameState) return;
    if (gameState.players.length > prevPlayerCount.current) {
      const addedPlayer = gameState.players[gameState.players.length - 1];
      // Use setTimeout to avoid synchronous state update during effect
      setTimeout(() => setNewPlayer(addedPlayer), 0);
    }
    prevPlayerCount.current = gameState.players.length;
  }, [gameState?.players.length]);

  if (!gameState) return null;

  const handleCardClick = (player: Player) => {
    if (!viewMode || player.isEliminated) return;
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
    setViewMode(false);
  };

  const handleNewWordsClick = () => {
    playSound('click');
    setShowNewWordConfirm(true);
  };

  const confirmNewWords = () => {
    onNewWords();
    setShowNewWordConfirm(false);
  };

  return (
    <div className="flex flex-col h-screen p-4 sm:p-6 bg-background overflow-hidden">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Speelronde</h2>
      <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-8">
        {viewMode 
          ? "Selecteer je eigen kaart om je woord te zien." 
          : "Iedereen heeft zijn woord gezien. Begin met omschrijven!"}
      </p>
      
      <div className="flex-1 overflow-y-auto pr-2 mb-4 sm:mb-8">
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          {gameState.players.map(player => (
            <button 
              key={player.id} 
              onClick={() => handleCardClick(player)}
              disabled={!viewMode || player.isEliminated}
              className={`p-2 sm:p-4 rounded-xl sm:rounded-3xl border-2 transition-all relative group flex flex-row items-center text-left 
                ${player.isEliminated ? 'bg-secondary border-transparent opacity-50' : 'bg-card shadow-sm'}
                ${viewMode && !player.isEliminated ? 'border-primary cursor-pointer hover:bg-secondary/30 ring-2 ring-primary/20' : 'border-border'}
              `}
            >
              <div className="w-8 h-8 sm:w-12 sm:h-12 shrink-0 bg-secondary rounded-full flex items-center justify-center mr-2 sm:mr-3 text-muted-foreground">
                <User className="w-5 h-5 sm:w-8 sm:h-8" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold truncate text-sm sm:text-lg leading-tight">{player.name}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider">{player.isEliminated ? 'Geëlimineerd' : 'Actief'}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto space-y-4">
        <button 
          onClick={onStartVoting}
          className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-xl active:scale-95 transition-all hover:bg-primary/90 hover:scale-[1.02] shadow-lg"
        >
          Ga naar stemmen
        </button>

        <div className="flex justify-between items-center gap-2 p-2 bg-secondary/50 rounded-2xl">
          <button 
            onClick={handleNewWordsClick}
            className="flex-1 flex flex-col items-center justify-center p-2 rounded-xl hover:bg-background transition-colors text-muted-foreground hover:text-foreground"
            title="Nieuwe woorden"
          >
            <RefreshCcw className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold uppercase">Woorden</span>
          </button>

          <button 
            onClick={() => { playSound('click'); setShowSettings(true); }}
            className="flex-1 flex flex-col items-center justify-center p-2 rounded-xl hover:bg-background transition-colors text-muted-foreground hover:text-foreground"
            title="Instellingen"
          >
            <Settings className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold uppercase">Opties</span>
          </button>

          <button 
            onClick={() => { onAddPlayer(); }}
            className="flex-1 flex flex-col items-center justify-center p-2 rounded-xl hover:bg-background transition-colors text-muted-foreground hover:text-foreground"
            title="Speler toevoegen"
          >
            <UserPlus className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold uppercase">Speler+</span>
          </button>

          <button 
            onClick={() => { playSound('click'); setViewMode(!viewMode); }}
            className={`flex-1 flex flex-col items-center justify-center p-2 rounded-xl transition-colors ${viewMode ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-background text-muted-foreground hover:text-foreground'}`}
            title="Bekijk woord"
          >
            <Eye className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold uppercase">Bekijk</span>
          </button>
        </div>
      </div>

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

      {/* New Word Confirmation Modal */}
      {showNewWordConfirm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-card text-card-foreground rounded-[2.5rem] p-8 max-w-md w-full text-center shadow-2xl border border-border">
            <h3 className="text-2xl font-bold mb-2">Nieuwe woorden?</h3>
            <p className="text-muted-foreground mb-8">Iedereen krijgt een nieuw woord. De rollen blijven hetzelfde.</p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={confirmNewWords}
                className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-xl active:scale-95 transition-all shadow-lg"
              >
                Ja, nieuwe woorden
              </button>
              <button 
                onClick={() => setShowNewWordConfirm(false)}
                className="w-full py-4 bg-secondary text-secondary-foreground rounded-2xl font-bold text-xl active:scale-95 transition-all hover:bg-secondary/80"
              >
                Annuleren
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Player Modal */}
      {newPlayer && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-card text-card-foreground rounded-[2.5rem] p-8 max-w-md w-full text-center shadow-2xl border border-border">
            <h3 className="text-2xl font-bold mb-2">Nieuwe Speler!</h3>
            <p className="text-muted-foreground mb-8">
              <span className="font-bold text-foreground">{newPlayer.name}</span> is toegevoegd.
              <br />
              Geef het apparaat aan {newPlayer.name} om hun woord te bekijken.
            </p>
            
            <button 
              onClick={() => {
                setViewingPlayer(newPlayer);
                setShowConfirmation(true);
                setNewPlayer(null);
                playSound('click');
              }}
              className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-xl active:scale-95 transition-all shadow-lg"
            >
              Bekijk Woord
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal 
          onClose={() => setShowSettings(false)}
          settings={settings}
          onSettingsChange={onSettingsChange}
          playSound={playSound}
        />
      )}
    </div>
  );
}
