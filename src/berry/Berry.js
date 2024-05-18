import { Plant } from '../Plant';
import berryImage from './berry.jpg';

export class Berry extends Plant {
  static startParameters = {
    age: 0,
    initiative: 0,
    chancesToSpread: 0.1,
    image: berryImage,
  };
  constructor(board, startParameters) {
    super(board, startParameters);
    this.createElement();
  }
}
