import { getGame, getGameEnemy } from '../../service/games';
import { isChecked } from '../../service/ships';
import { getWinners, updateWinner } from '../../service/winners';
import { AttackReq, Position, TurnRes } from '../../types/dataTypes';
import { Message, ReqMessage, ResMessage } from '../../types/types';
import generateRandomPosition from '../../utils/generateRandomPosition';
import makeAttack from '../../utils/makeAttack';
import { sendResponseToAll, sendResponseToChosen } from '../../utils/sendResponse';

const attackHandler = (message: Message) => {
  const data: AttackReq = JSON.parse(message.data as string);
  const game = getGame(data.gameId);

  if (game?.currentTurn !== data.indexPlayer) {
    return;
  }

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

    sendResponseToChosen(attackResMessage, [
      data.indexPlayer,
      enemy.indexPlayer,
    ]);

    if (!finish) {
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

      sendResponseToChosen(finishRes, [data.indexPlayer, enemy.indexPlayer]);
      sendResponseToAll(updateWinnersRes);
      return;
    }
  }
};

export default attackHandler;
