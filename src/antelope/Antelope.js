import { Animal } from '../Animal';
import antelopeImage from './antelope.jpg';

export class Antelope extends Animal {
  static startParameters = {
    strength: 4,
    age: 0,
    numberOfSteps: 2,
    initiative: 4,
    image: antelopeImage,
    chancesOfFleeing: 0.5,
  };

  constructor(board, startParameters) {
    super(board, startParameters);
    this.createElement();
    this.chancesOfFleeing = startParameters.chancesOfFleeing;
  }

  fight = (opponent) => {
    // console.log(`I will fight`);
    // animal looses
    if (opponent.strength > this.strength) {
      let odds = Math.random();
      if (odds < this.chancesOfFleeing) {
        // console.log(`antelope flies`)
      } else {
        this.currentTile.killCurrentOrganism(opponent);
        // console.log(newTile.currentOrganism);
      }
      // console.log(`I lost`);
    }
    // animal wins
    else if (opponent.strength < this.strength) {
      const newTile = opponent.currentTile;
      newTile.killCurrentOrganism(this);
      this.move(newTile);
      // console.log(`I won`);
    }
    // draw
    // console.log(`draw`);
  };
}
