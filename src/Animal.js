import { Organism } from './Organism';
import { findRandomTileInArray } from './findRandomTileInArray';

export class Animal extends Organism {
  constructor(board, startParameters) {
    super(board, startParameters);
    this.initiative = startParameters.initiative;
    this.numberOfSteps = startParameters.numberOfSteps;
    this.strength = startParameters.strength;
  }
  action = () => {
    if (this.isAlive) {
      const nearestTiles = this.board.findNearestTiles(this);
      console.log(nearestTiles);
      const newTile = findRandomTileInArray(nearestTiles);
      console.log(newTile);
    }
    // console.log('action: animal');
    super.action();
  };
}
