import { CATEGORIES, WORD_PAIRS, WordPair } from "./gameData";

export type Role = "Burger" | "Undercover" | "Mister White";

export interface Player {
  id: number;
  name: string;
  role: Role;
  word: string;
  isEliminated: boolean;
  hasSeenCard: boolean;
}

export interface GameState {
  players: Player[];
  wordPair: WordPair;
  phase: "setup" | "card-phase" | "game-round" | "voting" | "end-game";
  currentPlayerIndex: number;
  winner: "Burgers" | "Undercovers" | "Mister White" | "Infiltrators" | null;
  startingPlayerId: number;
}

export const getInitialRoles = (playerCount: number) => {
  let undercovers = 1;
  let misterWhites = 0;

  if (playerCount >= 5) misterWhites = 1;
  if (playerCount >= 7) undercovers = 2;
  if (playerCount >= 10) undercovers = 3;
  if (playerCount >= 13) undercovers = 4;
  if (playerCount >= 16) undercovers = 5;
  if (playerCount >= 19) undercovers = 6;

  const burgers = playerCount - undercovers - misterWhites;

  return { burgers, undercovers, misterWhites };
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const setupGame = (
  playerCount: number, 
  roles: { burgers: number, undercovers: number, misterWhites: number },
  existingNames?: string[],
  category: string = "Algemeen",
  customWordPair?: WordPair
): GameState => {
  let wordPair: WordPair;
  
  if (customWordPair && customWordPair.burger && customWordPair.undercover) {
    wordPair = customWordPair;
  } else {
    const pool = CATEGORIES[category] || WORD_PAIRS;
    wordPair = pool[Math.floor(Math.random() * pool.length)];
  }
  
  const roleList: Role[] = [
    ...Array(roles.burgers).fill("Burger"),
    ...Array(roles.undercovers).fill("Undercover"),
    ...Array(roles.misterWhites).fill("Mister White")
  ];

  const shuffledRoles = shuffleArray(roleList);

  const players: Player[] = shuffledRoles.map((role, index) => ({
    id: index,
    name: existingNames && existingNames[index] ? existingNames[index] : `Speler ${index + 1}`,
    role,
    word: role === "Burger" ? wordPair.burger : role === "Undercover" ? wordPair.undercover : "",
    isEliminated: false,
    hasSeenCard: false
  }));

  // Determine starting player randomly, but ensure it's not Mister White for the first round
  let startingPlayerId = Math.floor(Math.random() * playerCount);
  while (players[startingPlayerId].role === "Mister White") {
    startingPlayerId = (startingPlayerId + 1) % playerCount;
  }

  return {
    players,
    wordPair,
    phase: "card-phase",
    currentPlayerIndex: 0,
    winner: null,
    startingPlayerId
  };
};
