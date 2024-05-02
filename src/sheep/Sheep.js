import { Animal } from '../Animal';
import sheepImage from './sheep.jpg';

export class Sheep extends Animal {
  static startParameters = {
    strength: 3,
    age: 0,
    numberOfSteps: 1,
    initiative: 4,
    image: sheepImage,
  };
  constructor(board, startParameters) {
    super(board, startParameters);
    this.createElement();
  }
}
