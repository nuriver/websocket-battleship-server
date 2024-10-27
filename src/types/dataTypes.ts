export type LoginRes = {
  name: string;
  index: number | string;
  error: boolean;
  errorText: string;
};

export type Winner = {
  name: string;
  wins: number;
};

export type AddUserToRoomReq = {
  indexRoom: number | string;
};

export type CreateGameRes = {
  idGame: number | string;
  idPlayer: number | string;
};

export type Player = {
  name: string;
  password?: string;
  index?: number | string;
};

export type Room = {
  roomId: number | string;
  roomUsers: Player[];
};

export type UpdateRoomRes = Room[];

export type Ship = {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
};

export type PlayerGameData = {
  gameId: number;
  ships: Ship[];
  indexPlayer: number | string;
  shipField: ShipField;
};

export type AttackReq = {
  gameId: number | string;
  x: number;
  y: number;
  indexPlayer: number | string;
};

export type AttackRes = {
  position: {
    x: number;
    y: number;
  };
  currentPlayer: number | string;
  status: 'miss' | 'killed' | 'shot';
};

export type RandomAttackReq = {
  gameId: number | string;
  indexPlayer: number | string;
};

export type TurnRes = {
  currentPlayer: number | string;
};

export type FinishRes = {
  winPlayer: number | string;
};

export type ParsedData =
  | Player
  | LoginRes
  | Winner
  | PlayerGameData
  | AddUserToRoomReq
  | CreateGameRes
  | UpdateRoomRes
  | AttackReq
  | AttackRes
  | RandomAttackReq
  | TurnRes
  | FinishRes;

export type Game = {
  id: number;
  playersData: PlayerGameData[];
};

export type ShipFieldCell = string | null;
export type ShipTracker = { [id: string]: number };

export type ShipField = {
  field: ShipFieldCell[][];
  shipTracker: ShipTracker;
};
