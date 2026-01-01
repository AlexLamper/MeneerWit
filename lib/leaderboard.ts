import { GameState } from "./gameLogic";

export interface PlayerStats {
  name: string;
  score: number;
  gamesPlayed: number;
  wins: number;
  lastPlayed: number; // Timestamp
  roleStats: {
    burger: number;
    undercover: number;
    misterWhite: number;
  };
  wronglyEliminatedCount: number; // Times a Burger was eliminated
  misterWhiteGuessWins: number; // Times MW won by guessing
}

const STORAGE_KEY = "meneerwit_leaderboard";

export const getLeaderboard = (): PlayerStats[] => {
  if (typeof window === "undefined") return [];
  
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  
  try {
    const parsed = JSON.parse(data) as Partial<PlayerStats>[];
    // Migration for old stats
    return parsed.map((p: Partial<PlayerStats>) => ({
      ...p,
      wronglyEliminatedCount: p.wronglyEliminatedCount || 0,
      misterWhiteGuessWins: p.misterWhiteGuessWins || 0
    } as PlayerStats)).sort((a: PlayerStats, b: PlayerStats) => b.score - a.score);
  } catch (e) {
    console.error("Failed to parse leaderboard", e);
    return [];
  }
};

export const getPlayerNames = (): string[] => {
  return getLeaderboard().map(p => p.name);
};

export const updateLeaderboard = (gameState: GameState, mwGuessedCorrectly: boolean = false) => {
  if (!gameState.winner) return;

  const leaderboard = getLeaderboard();
  const timestamp = Date.now();

  gameState.players.forEach(player => {
    // Find or create player stats
    let stats = leaderboard.find(p => p.name.toLowerCase() === player.name.toLowerCase());
    
    if (!stats) {
      stats = {
        name: player.name,
        score: 0,
        gamesPlayed: 0,
        wins: 0,
        lastPlayed: timestamp,
        roleStats: { burger: 0, undercover: 0, misterWhite: 0 },
        wronglyEliminatedCount: 0,
        misterWhiteGuessWins: 0
      };
      leaderboard.push(stats);
    }

    // Update basic stats
    stats.gamesPlayed += 1;
    stats.lastPlayed = timestamp;
    
    // Update role counts
    if (player.role === "Burger") stats.roleStats.burger++;
    else if (player.role === "Undercover") stats.roleStats.undercover++;
    else if (player.role === "Mister White") stats.roleStats.misterWhite++;

    // Track wrongly eliminated burgers
    if (player.role === "Burger" && player.isEliminated) {
      stats.wronglyEliminatedCount++;
    }

    // Calculate Points
    let pointsEarned = 0;
    let isWinner = false;

    // Logic for Mister White
    if (player.role === "Mister White") {
      if (gameState.winner === "Mister White") {
        isWinner = true;
        if (mwGuessedCorrectly) {
           pointsEarned += 100;
           stats.misterWhiteGuessWins++;
        } else {
           pointsEarned += 80;
        }
      }
    }
    
    // Logic for Undercover
    else if (player.role === "Undercover") {
      if (gameState.winner === "Undercovers") {
        isWinner = true;
        pointsEarned += 60;
      }
    }
    
    // Logic for Burger
    else if (player.role === "Burger") {
      if (gameState.winner === "Burgers") {
        isWinner = true;
        pointsEarned += 30;
      }
    }

    // Survival Bonus (for everyone)
    // If you won AND you were not eliminated, +10 bonus
    // (Note: Mister White survival win already includes this implicitly in the 80 vs 100 logic, 
    // but let's add it explicitly for team players)
    if (isWinner && !player.isEliminated && player.role !== "Mister White") {
      pointsEarned += 10;
    }

    if (isWinner) stats.wins++;
    stats.score += pointsEarned;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(leaderboard));
};
