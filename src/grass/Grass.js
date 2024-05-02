import { Plant } from '../Plant';
import grassImage from './grass.jpg';

export class Grass extends Plant {
  static startParameters = {
    age: 0,
    initiative: 0,
    chancesToSpread: 0.1,
    image: grassImage,
  };
  constructor(board, startParameters) {
    super(board, startParameters);
    this.createElement();
  }
}
