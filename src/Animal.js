import { Organism } from './Organism';
import { findRandomTileInArray } from './findRandomTileInArray';
import { Berry } from './berry/Berry';

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
      const opponent = newTile.currentOrganism;
      if (opponent) {
        if (this.shouldEat(opponent)) {
          this.eatPlant(opponent, newTile);
        } else if (this.shouldMate(opponent)) {
          this.mate(opponent);
        } else if (this.shouldFight(opponent)) {
          this.fight(opponent);
        }
      } else if (this.shouldMove(newTile)) {
        this.move(newTile);
      }
    }
    super.action();
  };
  findTileForMove = () => {
    const nearestTiles = this.board.findNearestTiles(this);
    return findRandomTileInArray(nearestTiles);
  };
  move = (newTile) => {
    this.currentTile.clearTile();
    newTile.addCurrentOrganism(this);
  };

  shouldMove = (newTile) => {
    return !newTile.currentOrganism;
  };
  shouldEat = (opponent) => {
    return !(opponent instanceof Animal);
  };
  eatPlant = (opponent, newTile) => {
    newTile.killCurrentOrganism(this);
    if (!(opponent instanceof Berry)) {
      newTile.addCurrentOrganism(this);
    } else {
      this.currentTile.killCurrentOrganism(this);
    }
  };
  shouldMate = (opponent) => {
    if (opponent.isAlive) {
      return opponent instanceof this.constructor;
    }
  };
  mate = (opponent) => {
    const surroundingEmptyTiles = this.board.findEmptyTilesToMate(
      this,
      opponent,
    );
    if (surroundingEmptyTiles.length > 0) {
      const tileForChild = findRandomTileInArray(surroundingEmptyTiles);
      const child = new this.constructor(
        this.board,
        this.constructor.startParameters,
      );
      tileForChild.addCurrentOrganism(child);
    }
  };
  shouldFight = (opponent) => {
    if (opponent.isAlive) {
      return opponent instanceof Animal;
    }
  };
  fight = (opponent) => {
    //animal looses
    if (opponent.strength > this.strength) {
      this.currentTile.killCurrentOrganism(opponent);
    }
    // animal wins
    else if (opponent.strength < this.strength) {
      const newTile = opponent.currentTile;
      newTile.killCurrentOrganism(this);
      this.move(newTile);
    }
    // draw
  };
}
