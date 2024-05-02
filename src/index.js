import './styles.css';
import { Board } from './Board';

const board = new Board(10, 10);

console.log(board.tiles);
console.log(board.tiles[1][2]);
