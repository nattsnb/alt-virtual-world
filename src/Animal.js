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
      const newTile = this.findTileForMove();
      if (newTile.currentOrganism) {
        //   +++++++++++++++++ fight, mate, eat functions! ++++++++++++++++
      } else if (this.shouldMove(newTile)){
        this.move(newTile);
      }
    }
    // console.log('action: animal');
    super.action();
  };
  findTileForMove = () => {
    const nearestTiles = this.board.findNearestTiles(this);
    // console.log(nearestTiles);
    return findRandomTileInArray(nearestTiles);
    // console.log(newTile);
  };
  move = (newTile) => {
    // console.log(this.currentTile)
    // console.log(newTile)
    this.currentTile.clearTile();
    newTile.addCurrentOrganism(this);
    // console.log(newTile.currentOrganism)
    // console.log(`I moved!`);
  };

  shouldMove = (newTile) => {
    return !newTile.currentOrganism
  }
}
