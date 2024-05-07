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
    return !newTile.currentOrganism;
  };
  shouldEat = (opponent) => {
    return !(opponent instanceof Animal);
  };
  eatPlant = (opponent, newTile) => {
    newTile.killCurrentOrganism(this);
    newTile.addCurrentOrganism(this);
    console.log(`I ate a plant`);
  };
  shouldMate = (opponent) => {
    return opponent instanceof this.constructor;
  };
  mate = (opponent) => {
    const surroundingEmptyTiles = this.board.findEmptyTilesSurroundingParents(
      this,
      opponent,
    );
    console.log(`I will mate`);
    if (surroundingEmptyTiles.length > 0) {
      const tileForChild = findRandomTileInArray(surroundingEmptyTiles);
      const child = new this.constructor(
        this.board,
        this.constructor.startParameters,
      );
      console.log(`child:`);
      console.log(child);
      tileForChild.addCurrentOrganism(child);
    }
    console.log(`I mated`);
  };
  shouldFight = (opponent) => {
    if (opponent.isAlive && this.isAlive) {
      return opponent instanceof Animal;
    }
  };
  fight = (opponent) => {
    console.log(`I will fight`);
    // animal looses
    if (opponent.strength > this.strength) {
      this.currentTile.killCurrentOrganism(opponent);
      console.log(`I lost`)
    }
    // animal wins
    else if (opponent.strength < this.strength) {
      const newTile = opponent.currentTile;
      newTile.killCurrentOrganism(this);
      this.move(newTile);
      console.log(`I won`)
    }
    // draw
    console.log(`draw`)
  };
}
