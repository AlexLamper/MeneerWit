"use client";

import { useState, useEffect } from "react";
import { GameState, getInitialRoles, setupGame } from "@/lib/gameLogic";
import { updateLeaderboard } from "@/lib/leaderboard";
import HomeView from "./components/HomeView";
import SetupView from "./components/SetupView";
import CardPhase from "./components/CardPhase";
import GameRound from "./components/GameRound";
import VotingPhase from "./components/VotingPhase";
import EndGame from "./components/EndGame";
import LeaderboardView from "./components/LeaderboardView";
import { ModeToggle } from "./components/mode-toggle";
import { FullscreenToggle } from "./components/FullscreenToggle";
import { FullscreenPrompt } from "./components/FullscreenPrompt";

export default function Home() {
  const [view, setView] = useState<"home" | "setup" | "card-phase" | "start-round" | "game-round" | "voting" | "end-game" | "leaderboard">("home");
  const [playerCount, setPlayerCount] = useState(3);
  const [roles, setRoles] = useState({ burgers: 2, undercovers: 1, misterWhites: 0 });
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [playerNameInput, setPlayerNameInput] = useState("");
  const [misterWhiteGuess, setMisterWhiteGuess] = useState("");
  const [showMisterWhiteGuess, setShowMisterWhiteGuess] = useState(false);
  const [savedNames, setSavedNames] = useState<string[]>([]);
  const [settings, setSettings] = useState({
    soundEffects: true,
    misterWhiteStarts: false
  });
  const [showGuessResult, setShowGuessResult] = useState<{ correct: boolean; word: string } | null>(null);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  const playSound = (type: 'click' | 'win' | 'lose') => {
    if (!settings.soundEffects) return;

    let file = '/sounds/click.wav';
    if (type === 'win') {
      const wins = ['win1.wav', 'win2.wav', 'win3.wav'];
      file = `/sounds/${wins[Math.floor(Math.random() * wins.length)]}`;
    } else if (type === 'lose') {
      file = '/sounds/lose1.wav';
    }

    const audio = new Audio(file);
    audio.play().catch(e => console.error("Audio play failed", e));
  };

  // Update roles when playerCount changes
  useEffect(() => {
    setRoles(getInitialRoles(playerCount));
  }, [playerCount]);

  const handleShowLeaderboard = () => {
    playSound('click');
    setView("leaderboard");
  };

  const handleStartSetup = () => {
    playSound('click');
    setView("setup");
  };
  
  const handleStartGame = () => {
    playSound('click');
    // Use saved names if available, otherwise default
    const state = setupGame(playerCount, roles, savedNames);
    setGameState(state);
    setView("card-phase");
    setCurrentPlayerIndex(0);
    setIsCardOpen(false);
    setShowGuessResult(null);
    setMisterWhiteGuess("");
    
    // Pre-fill input with saved name if available, otherwise default
    const nextName = savedNames[0] || `Speler 1`;
    setPlayerNameInput(nextName);
  };

  const handleNextPlayer = () => {
    if (!gameState) return;
    
    const updatedPlayers = [...gameState.players];
    const newName = playerNameInput || `Speler ${currentPlayerIndex + 1}`;
    updatedPlayers[currentPlayerIndex].name = newName;
    updatedPlayers[currentPlayerIndex].hasSeenCard = true;
    
    // Save name for future games
    const newSavedNames = [...savedNames];
    newSavedNames[currentPlayerIndex] = newName;
    setSavedNames(newSavedNames);
    
    setGameState({ ...gameState, players: updatedPlayers });

    if (currentPlayerIndex < gameState.players.length - 1) {
      const nextIndex = currentPlayerIndex + 1;
      setCurrentPlayerIndex(nextIndex);
      setIsCardOpen(false);
      // Pre-fill next name
      setPlayerNameInput(savedNames[nextIndex] || `Speler ${nextIndex + 1}`);
    } else {
      setView("game-round");
    }
  };

  const handleEliminate = (playerId: number) => {
    if (!gameState) return;
    
    const player = gameState.players.find(p => p.id === playerId);
    if (!player) return;

    const updatedPlayers = gameState.players.map(p => 
      p.id === playerId ? { ...p, isEliminated: true } : p
    );

    const newState = { ...gameState, players: updatedPlayers };
    setGameState(newState);

    if (player.role === "Mister White") {
      setShowMisterWhiteGuess(true);
    } else {
      checkWinCondition(newState);
    }
  };

  const handleMisterWhiteGuess = () => {
    if (!gameState) return;
    
    const isCorrect = misterWhiteGuess.toLowerCase().trim() === gameState.wordPair.burger.toLowerCase().trim();
    
    if (isCorrect) {
      playSound('win');
      const finalState = { ...gameState, winner: "Mister White" } as GameState;
      updateLeaderboard(finalState);
      setGameState(finalState);
      setView("end-game");
    } else {
      playSound('lose');
      setShowGuessResult({ correct: false, word: misterWhiteGuess });
      setShowMisterWhiteGuess(false);
    }
  };

  const handleCloseGuessResult = () => {
    playSound('click');
    setShowGuessResult(null);
    if (gameState) checkWinCondition(gameState);
  };

  const checkWinCondition = (state: GameState) => {
    const activePlayers = state.players.filter(p => !p.isEliminated);
    const undercovers = activePlayers.filter(p => p.role === "Undercover").length;
    const burgers = activePlayers.filter(p => p.role === "Burger").length;
    const misterWhites = activePlayers.filter(p => p.role === "Mister White").length;

    // Burgers win if all indringers are gone
    if (undercovers === 0 && misterWhites === 0) {
      playSound('win');
      const finalState = { ...state, winner: "Burgers" } as GameState;
      updateLeaderboard(finalState);
      setGameState(finalState);
      setView("end-game");
      return;
    } 

    // Mister White wins if he survives until only 2 players are left
    if (activePlayers.length <= 2 && misterWhites > 0) {
      playSound('win');
      const finalState = { ...state, winner: "Mister White" } as GameState;
      updateLeaderboard(finalState);
      setGameState(finalState);
      setView("end-game");
      return;
    }
    
    // Undercovers win if all civilians are eliminated and Undercover is still alive
    if (burgers === 0 && undercovers > 0) {
      playSound('win');
      const finalState = { ...state, winner: "Undercovers" } as GameState;
      updateLeaderboard(finalState);
      setGameState(finalState);
      setView("end-game");
      return;
    }

    // If no one won yet, continue to next round
    setView("game-round");
  };

  const handleQuitGame = () => {
    playSound('click');
    setShowQuitConfirm(true);
  };

  const confirmQuit = () => {
    playSound('click');
    setView("home");
    setGameState(null);
    setShowQuitConfirm(false);
  };

  const cancelQuit = () => {
    playSound('click');
    setShowQuitConfirm(false);
  };

  return (
    <main className="h-screen text-foreground overflow-hidden relative md:max-w-md md:mx-auto">
      <FullscreenPrompt />
      <div className="fixed top-4 right-4 z-50 flex gap-2 items-center">
        <FullscreenToggle />
        <ModeToggle />
        {view !== "home" && view !== "setup" && view !== "end-game" && view !== "leaderboard" && (
          <button 
            onClick={handleQuitGame}
            className="w-10 h-10 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold hover:bg-destructive/20 hover:text-destructive transition-colors shadow-md"
            title="Stop Spel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
          </button>
        )}
      </div>

      {view === "home" && (
        <HomeView 
          onStartSetup={handleStartSetup} 
          settings={settings}
          onSettingsChange={setSettings}
          playSound={playSound}
          onShowLeaderboard={handleShowLeaderboard}
        />
      )}
      
      {view === "leaderboard" && (
        <LeaderboardView 
          onBack={() => { playSound('click'); setView("home"); }}
          playSound={playSound}
        />
      )}
      
      {view === "setup" && (
        <SetupView 
          playerCount={playerCount}
          setPlayerCount={setPlayerCount}
          roles={roles}
          setRoles={setRoles}
          onStartGame={handleStartGame}
          onBack={() => { playSound('click'); setView("home"); }}
          playSound={playSound}
        />
      )}
      
      {view === "card-phase" && (
        <CardPhase 
          gameState={gameState}
          currentPlayerIndex={currentPlayerIndex}
          isCardOpen={isCardOpen}
          setIsCardOpen={setIsCardOpen}
          playerNameInput={playerNameInput}
          setPlayerNameInput={setPlayerNameInput}
          onNextPlayer={handleNextPlayer}
          playSound={playSound}
        />
      )}
      
      {view === "game-round" && (
        <GameRound 
          gameState={gameState}
          onStartVoting={() => { playSound('click'); setView("voting"); }}
          playSound={playSound}
        />
      )}
      
      {view === "voting" && (
        <VotingPhase 
          gameState={gameState}
          onEliminate={handleEliminate}
          showMisterWhiteGuess={showMisterWhiteGuess}
          misterWhiteGuess={misterWhiteGuess}
          setMisterWhiteGuess={setMisterWhiteGuess}
          onMisterWhiteGuess={handleMisterWhiteGuess}
          onCheckWin={() => {
            setShowMisterWhiteGuess(false);
            if (gameState) checkWinCondition(gameState);
          }}
          playSound={playSound}
        />
      )}
      
      {view === "end-game" && (
        <EndGame 
          gameState={gameState}
          onRestart={handleStartGame}
          onHome={() => { playSound('click'); setView("home"); }}
          playSound={playSound}
        />
      )}

      {/* Quit Confirmation Modal */}
      {showQuitConfirm && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-card text-card-foreground rounded-[2.5rem] p-8 max-w-md w-full text-center shadow-2xl border border-border">
            <h3 className="text-2xl font-bold mb-4">Spel Stoppen?</h3>
            <p className="text-muted-foreground mb-8">
              Weet je zeker dat je het huidige spel wilt beëindigen? Alle voortgang gaat verloren.
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={confirmQuit}
                className="w-full py-4 bg-destructive text-destructive-foreground rounded-2xl font-bold text-xl active:scale-95 transition-all shadow-lg"
              >
                Ja, stop spel
              </button>
              <button 
                onClick={cancelQuit}
                className="w-full py-4 bg-secondary text-secondary-foreground rounded-2xl font-bold text-xl active:scale-95 transition-all"
              >
                Nee, ga door
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guess Result Modal */}
      {showGuessResult && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-card text-card-foreground rounded-[2.5rem] p-8 max-w-md w-full text-center shadow-2xl border border-border">
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">❌</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Helaas!</h3>
            <p className="text-muted-foreground mb-8">
              Het woord was niet <span className="font-bold text-foreground">&quot;{showGuessResult.word}&quot;</span>.
            </p>
            
            <button 
              onClick={handleCloseGuessResult}
              className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-xl active:scale-95 transition-all shadow-lg"
            >
              Doorgaan
            </button>
          </div>
        </div>
      )}
    </main>
  );
}