import { Plant } from '../Plant';
import guaranaImage from './guarana.jpg';

export class Guarana extends Plant {
  static startParameters = {
    age: 0,
    initiative: 0,
    chancesToSpread: 0.1,
    image: guaranaImage,
  };

  constructor(board, startParameters) {
    super(board, startParameters);
    this.createElement();
  }
  death = (killer) => {
    // console.log(`I got eaten by:`);
    // console.log(killer);
    killer.strength = killer.strength + 3;
    this.currentTile = null;
    this.isAlive = false;
  };
}
