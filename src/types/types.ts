import { ParsedData } from './dataTypes';

export enum ReqMessage {
  REG = 'reg',
  CREATE_ROOM = 'create_room',
  ADD_USER_TO_ROOM = 'add_user_to_room',
  ADD_SHIPS = 'add_ships',
  ATTACK = 'attack',
  RANDOM_ATTACK = 'randomAttack',
}

export enum ResMessage {
  REG = 'reg',
  UPDATE_WINNERS = 'update_winners',
  CREATE_GAME = 'create_game',
  UPDATE_ROOM = 'update_room',
  START_GAME = 'start_game',
  ATTACK_FEEDBACK = 'attack_feedback',
  TURN = 'turn',
  FINISH = 'finish',
}

export interface Message {
  type: string;
  data?: string;
  id: number;
}