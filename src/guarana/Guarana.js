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
}
