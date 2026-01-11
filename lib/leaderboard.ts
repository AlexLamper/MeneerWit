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

    // Calculate Points
    let pointsEarned = 0;
    let isWinner = false;

    // Victory: Civilians 2 pts, Mr. White 6 pts, Undercover 10 pts
    
    if (gameState.winner === "Burgers") {
      if (player.role === "Burger") {
        isWinner = true;
        pointsEarned = 2;
      }
    } 
    else if (gameState.winner === "Infiltrators") {
      // Infiltrators win (Undercovers and Mr. Whites team up)
      if (player.role === "Undercover") {
        isWinner = true;
        pointsEarned = 10;
      } else if (player.role === "Mister White") {
        isWinner = true;
        pointsEarned = 6;
      }
    }
    else if (gameState.winner === "Mister White") {
      // Mister White wins by guessing
      if (player.role === "Mister White") {
        isWinner = true;
        pointsEarned = 6;
      }
    }
    
    // Legacy support or fallback: if winner was just "Undercovers" from old state
    // Treat as Infiltrators win for Undercovers
    else if (gameState.winner === "Undercovers" && player.role === "Undercover") {
        isWinner = true;
        pointsEarned = 10;
    }

    if (isWinner) stats.wins++;
    stats.score += pointsEarned;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(leaderboard));
};
