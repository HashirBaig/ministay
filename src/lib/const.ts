// Tennis Tracker
type TYPE_PLAYER = {
  playerName: string;
};

export type TYPES_ALERT_CARD_PROPS = {
  title: string;
  description?: string;
};

export type TYPE_PLAYER_FORM = {
  playerOne: string;
  playerTwo: string;
};

export type TYPE_PAGINATION = {
  page: number;
  limit?: number;
};

export type TYPE_MATCH = {
  playerOne: TYPE_PLAYER;
  playerTwo: TYPE_PLAYER;
  gamesWonByPlayerOne: number;
  gamesWonByPlayerTwo: number;
  createdDate?: Date;
};

export type TYPE_MATCH_PAYLOAD = {
  playerOne: string;
  playerTwo: string;
  numberOfSets?: number;
  numberOfGames?: number;
  gamesWonByPlayerOne: number;
  gamesWonByPlayerTwo: number;
  createdDate?: Date;
  id?: string;
};

export type PLAYER_WINS_STATS = {
  playerName: string;
  wins: number;
  label?: string;
  loss?: boolean;
};

export type STATS = {
  totalMatchesPlayed: number;
  leastWins: PLAYER_WINS_STATS;
  mostWins: PLAYER_WINS_STATS;
  perPlayerStats: PLAYER_WINS_STATS[];
};
