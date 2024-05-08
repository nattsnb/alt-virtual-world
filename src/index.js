import './styles.css';
import { Board } from './Board';

const board = new Board(10, 10);
await board.round();

// console.log(board.tiles);
// console.log(board.tiles[1][2]

let game = 0;
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

let isPlayerAlive = true;

while (isPlayerAlive) {
  isPlayerAlive = await board.round();
}

console.log(`player is DEAD. You lost!`);
