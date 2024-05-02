import { Plant } from '../Plant';
import thistleImage from './thistle.jpg';

export class SowThistle extends Plant {
  static startParameters = {
    age: 0,
    initiative: 0,
    chancesToSpread: 0.3,
    image: thistleImage,
  };
  constructor(board, startParameters) {
    super(board, startParameters);
    this.createElement();
  }
}
