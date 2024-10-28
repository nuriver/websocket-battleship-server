import { getGame, getGameEnemy } from '../../service/games';
import { getPlayer } from '../../service/players';
import { isChecked } from '../../service/ships';
import { getWinners, updateWinner } from '../../service/winners';
import { AttackReq, Position } from '../../types/dataTypes';
import { Message, ReqMessage, ResMessage } from '../../types/types';
import generateRandomPosition from '../../utils/generateRandomPosition';
import makeAttack from '../../utils/makeAttack';
import reqLog from '../../utils/reqLog';
import resLog from '../../utils/resLog';
import {
  sendResponseToAll,
  sendResponseToChosen,
} from '../../utils/sendResponse';

const attackHandler = (message: Message) => {
  const data: AttackReq = JSON.parse(message.data as string);
  const game = getGame(data.gameId);

  if (game?.currentTurn !== data.indexPlayer) {
    return;
  }

  reqLog(message.type);

  const enemy = getGameEnemy(data.gameId, data.indexPlayer);

  let position: Position;

  if (message.type === ReqMessage.RANDOM_ATTACK) {
    position = generateRandomPosition(enemy?.checkedCells);
  } else {
    position = {
      x: data.x,
      y: data.y,
    };
  }

  const checked = isChecked(position, enemy?.checkedCells);

  if (checked) {
    return;
  }

  let nextTurn: number | undefined = undefined;
  const attackRes = {
    type: ResMessage.ATTACK,
    id: 0,
  };

  if (enemy) {
    enemy.checkedCells.push(position);
    const { result, surroundingCells, finish } = makeAttack(
      position.x,
      position.y,
      enemy.shipField
    );

    const attackData = {
      position,
      currentPlayer: data.indexPlayer,
      status: result,
    };
    const attackResMessage = {
      ...attackRes,
      data: JSON.stringify(attackData),
    };

    if (result === 'shot') {
      nextTurn = data.indexPlayer;
    }

    if (result === 'miss') {
      nextTurn = enemy.indexPlayer;
    }

    if (result === 'killed') {
      nextTurn = data.indexPlayer;

      surroundingCells?.forEach((cell) => {
        enemy.checkedCells.push(cell);
        const killedAttackSurroundData = {
          ...attackData,
          position: cell,
          status: 'miss',
        };

        const killedAttackSurroundRes = {
          ...attackRes,
          data: JSON.stringify(killedAttackSurroundData),
        };

        sendResponseToChosen(killedAttackSurroundRes, [
          data.indexPlayer,
          enemy.indexPlayer,
        ]);
      });
    }

    const turnRes = {
      type: ResMessage.TURN,
      id: 0,
      data: JSON.stringify({
        currentPlayer: nextTurn,
      }),
    };

    resLog(result);
    if (result === 'killed' && !finish) {
      resLog('All cells around the destroyed ship have been marked as misses');
    }

    sendResponseToChosen(attackResMessage, [
      data.indexPlayer,
      enemy.indexPlayer,
    ]);

    const nextPlayer = getPlayer(nextTurn as number);
    const currentPlayer = getPlayer(data.indexPlayer);

    if (!finish) {
      resLog(`Next turn is ${nextPlayer?.name}`);
      sendResponseToChosen(turnRes, [data.indexPlayer, enemy.indexPlayer]);
      game.currentTurn = nextTurn;
    } else {
      const finishResData = {
        winPlayer: data.indexPlayer,
      };
      const finishRes = {
        type: ResMessage.FINISH,
        id: 0,
        data: JSON.stringify(finishResData),
      };

      updateWinner(data.indexPlayer);

      const winners = getWinners();
      const updateWinnersRes = {
        type: ResMessage.UPDATE_WINNERS,
        id: 0,
        data: JSON.stringify(winners),
      };

      resLog('Game is finished');
      resLog(`${currentPlayer?.name} is the winner!`);
      resLog(ResMessage.UPDATE_WINNERS);
      sendResponseToChosen(finishRes, [data.indexPlayer, enemy.indexPlayer]);
      sendResponseToAll(updateWinnersRes);
      return;
    }
  }
};

export default attackHandler;
