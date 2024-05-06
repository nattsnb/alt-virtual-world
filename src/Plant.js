import { Organism } from './Organism';

export class Plant extends Organism {
  constructor(board, startParameters) {
    super(board, startParameters);
    this.chancesToSpread = startParameters.chancesToSpread;
  }
  death = (killer) => {
    console.log(`I got eaten by:`);
    console.log(killer);
    this.currentTile = null;
    this.isAlive = false;
  };
}
