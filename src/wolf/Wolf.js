import { Animal } from '../Animal';
import wolfImage from './wolf.jpg';

export class Wolf extends Animal {
  static startParameters = {
    strength: 9,
    age: 0,
    numberOfSteps: 1,
    initiative: 5,
    image: wolfImage,
  };
  constructor(board, startParameters) {
    super(board, startParameters);
    this.createElement();
  }
}
