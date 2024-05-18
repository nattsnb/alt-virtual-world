import { Animal } from '../Animal';
import turtleImage from './turtle.jpg';

export class Turtle extends Animal {
  static startParameters = {
    strength: 2,
    age: 0,
    numberOfSteps: 1,
    initiative: 1,
    image: turtleImage,
    chancesOfMoving: 0.25,
  };

  constructor(board, startParameters) {
    super(board, startParameters);
    this.createElement();
    this.chancesOfMoving = startParameters.chancesOfMoving;
  }

  action = () => {
    let odds = Math.random();
    if (odds < this.chancesOfMoving && this.isAlive) {
      // console.log(`My turn!`)
      // console.log(this)
      // console.log(this.isAlive)
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
}
