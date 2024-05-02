import './styles.css';
import { Board } from './Board';

const board = new Board(10, 10);
await board.round()

// console.log(board.tiles);
// console.log(board.tiles[1][2]);
