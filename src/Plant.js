import { Organism } from './Organism';
import { findRandomTileInArray } from './findRandomTileInArray';

export class Plant extends Organism {
  constructor(board, startParameters) {
    super(board, startParameters);
    this.chancesToSpread = startParameters.chancesToSpread;
    this.numberOfSteps = 1;
  }
  death = (killer) => {
    this.currentTile = null;
    this.isAlive = false;
  };
  action = async () => {
    if (this.shouldSpread()) {
      this.spread();
    }
  };
  shouldSpread = () => {
    return this.isAlive;
  };
  spread = () => {
    let odds = Math.random();
    if (odds < this.chancesToSpread) {
      const emptyTiles = this.board.findEmptyTilesToSpread(this);
      if (emptyTiles.length > 0) {
        const tileToSpread = findRandomTileInArray(emptyTiles);
        const child = new this.constructor(
          this.board,
          this.constructor.startParameters,
        );
        tileToSpread.addCurrentOrganism(child);
        return true;
      }
    }
  };
}
