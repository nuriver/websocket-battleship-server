import { finishGame, getGame, getGameEnemy } from '../../service/games';
import { getPlayer } from '../../service/players';
import { isChecked } from '../../service/ships';
import { AttackReq, Position } from '../../types/dataTypes';
import { Message, ReqMessage, ResMessage } from '../../types/types';
import generateRandomPosition from '../../utils/generateRandomPosition';
import makeAttack from '../../utils/makeAttack';
import reqLog from '../../utils/reqLog';
import resLog from '../../utils/resLog';
import { sendResponseToChosen } from '../../utils/sendResponse';

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

    if (!finish) {
      resLog(`Next turn is ${nextPlayer?.name}`);
      sendResponseToChosen(turnRes, [data.indexPlayer, enemy.indexPlayer]);
      game.currentTurn = nextTurn;
    } else {
      finishGame(data.indexPlayer, enemy.indexPlayer, game.id, false);
      return;
    }
  }
};

export default attackHandler;
