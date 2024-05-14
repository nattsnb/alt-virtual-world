import { Animal } from '../Animal';
import playerImage from './player.jpg';
import { findRandomTileInArray } from '../findRandomTileInArray';

export class Player extends Animal {
  static startParameters = {
    strength: 5,
    age: 0,
    numberOfSteps: 1,
    initiative: 4,
    image: playerImage,
  };

  constructor(board, startParameters) {
    super(board, startParameters);
    this.initializeEventListener();
    this.createElement();
    this.x = 0;
    this.y = 0;
    this.tilesForAction = [];
    this.activeTile = [];
  }

  action = async () => {
    if (this.isAlive) {
      this.activeTile = this.currentTile;
      this.tilesForAction = this.board.findNearestTiles(this);
      this.tilesForAction.push(this.currentTile);
      // console.log(this.activeTile);
      const currentTileDiv = this.currentTile.tileContainer;
      currentTileDiv.setAttribute('id', 'activeTile');
      this.age = this.age + 1;
      return this.waitToResolveMovement();
    }
  };
  waitToResolveMovement = () => {
    return new Promise((resolve, reject) => {
      this.resolveMovement = resolve;
    });
  };
  moveActiveTile = (coordinates) => {
    this.activeTile.tileContainer.removeAttribute('id');
    this.activeTile = this.board.tiles[coordinates.x][coordinates.y];
    // console.log(this.activeTile);
    const activeTileDiv = this.activeTile.tileContainer;
    activeTileDiv.setAttribute('id', 'activeTile');
  };
  initializeEventListener = () => {
    window.addEventListener('keyup', this.eventToTrigger);
  };
  eventToTrigger = (event) => {
    this.checkKeyPressed(event);
  };
  checkKeyPressed = (evt) => {
    if (evt.code === 'KeyW') {
      console.log('keyW');
      const newY = this.activeTile.y - 1;
      this.moveVertically(newY)
    }
    if (evt.code === 'KeyA') {
      console.log('KeyA');
      const newX = this.activeTile.x - 1;
      this.moveHorizontally(newX)
    }
    if (evt.code === 'KeyS') {
      console.log('KeyS');
      const newY = this.activeTile.y + 1;
      this.moveVertically(newY)
    }
    if (evt.code === 'KeyD') {
      console.log('KeyD');
      const newX = this.activeTile.x + 1;
      this.moveHorizontally(newX)
    }
    if (evt.code === 'Enter') {
      console.log('Enter');
      this.tilesForAction = [];
      const opponent = this.activeTile.currentOrganism;
      if (opponent) {
        if (this.shouldEat(opponent)) {
          this.eatPlant(opponent, this.activeTile);
        } else if (this.shouldFight(opponent)) {
          this.fight(opponent);
        }
      } else if (this.shouldMove(this.activeTile)) {
        this.move(this.activeTile);
      }
      this.resolveMovement();
    }
  };
  moveVertically = (newY) => {
    if (
        this.tilesForAction.includes(this.board.tiles[this.activeTile.x][newY])
    ) {
      const coordinates = {x: this.activeTile.x, y: newY};
      this.moveActiveTile(coordinates);
    }
  }
  moveHorizontally = (newX) => {
    if (
        this.tilesForAction.includes(this.board.tiles[newX][this.activeTile.y])
    ) {
      const coordinates = {x: newX, y: this.activeTile.y};
      this.moveActiveTile(coordinates);
    }
  }
  death = () => {
    this.currentTile = null;
    this.isAlive = false;
    window.removeEventListener('keyup', this.eventToTrigger);
  };
}