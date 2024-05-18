import './styles.css';
import { Board } from './Board';

const board = new Board(10, 10);

while (board.isPlayerAlive()) {
  await board.round();
}

console.log(`player is DEAD. You lost!`);
