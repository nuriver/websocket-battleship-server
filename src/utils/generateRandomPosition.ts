import { isChecked } from '../service/ships';
import { Position } from '../types/dataTypes';

const generateRandomPosition = (checkedCells?: Position[]) => {
  let position: Position;
  do {
    position = {
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10),
    };
  } while (isChecked(position, checkedCells));

  return position;
};

export default generateRandomPosition;
