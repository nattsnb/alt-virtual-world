import './styles.css';
import { Board } from './Board';

const board = new Board(10, 10);
await board.round();

// console.log(board.tiles);
// console.log(board.tiles[1][2]

let game = 0;

while (game < 15) {
  await board.round();
  game = game + 1;
  console.log(game);
}
