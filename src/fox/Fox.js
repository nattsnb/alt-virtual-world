import { Animal } from '../Animal';
import foxImage from './fox.jpg';

export class Fox extends Animal {
  static startParameters = {
    strength: 4,
    age: 0,
    numberOfSteps: 1,
    initiative: 7,
    image: foxImage,
  };

  constructor(board, startParameters) {
    super(board, startParameters);
    this.createElement();
  }
}
