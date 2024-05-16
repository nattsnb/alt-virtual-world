import { Tile } from './Tile';
import { classesList } from './classesList';
import { Player } from './player/Player';

export class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.tiles = [];
    this.initializeTiles();
    this.createInitialCharacters();
  }
  static isOrganismAPlayer(organism) {
    return organism instanceof Player;
  }
  initializeTiles = () => {
    const boardContainer = document.querySelector('#board-container');
    for (let i = 0; i < this.height; i++) {
      this.tiles[i] = [];
    }
    for (let i = 0; i < this.height; i++) {
      const row = document.createElement('div');
      row.classList.add(`row`);
      boardContainer.append(row);
      for (let j = 0; j < this.width; j++) {
        this.tiles[j][i] = new Tile(j, i, this);
        row.append(this.tiles[j][i].tileContainer);
      }
    }
  };
  createInitialCharacters = () => {
    const numberOfCharacters = Math.round(this.width * this.height * 0.3);
    for (let i = 0; i < numberOfCharacters; i++) {
      const randomClassIndex = Math.floor(Math.random() * classesList.length);
      const organism = new classesList[randomClassIndex](
        this,
        classesList[randomClassIndex].startParameters,
      );
      const tileForNewOrganism = this.findRandomTileOnBoard();
      tileForNewOrganism.addCurrentOrganism(organism);
      // console.log(organism);
    }
    const player = new Player(this, Player.startParameters);
    // console.log(player);
    const tileForPlayer = this.findRandomTileOnBoard();
    tileForPlayer.addCurrentOrganism(player);
  };
  findRandomTileOnBoard = () => {
    const randomX = Math.floor(Math.random() * this.width);
    const randomY = Math.floor(Math.random() * this.height);
    const foundTile = this.tiles[randomX][randomY];
    if (foundTile.currentOrganism) {
      return this.findRandomTileOnBoard();
    }
    return foundTile;
  };
  round = async () => {
    const organismsOnBoard = this.getOrganisms();
    // console.log(organismsOnBoard);
    this.sortedOrganismsOnBoard = this.sortOrganisms(organismsOnBoard);
    // console.log(this.sortedOrganismsOnBoard);
    for (let i = 0; i < this.sortedOrganismsOnBoard.length; i++) {
      await this.sortedOrganismsOnBoard[i].action();
    }
  };
  isPlayerAlive = () => {
    const organismsOnBoard = this.getOrganisms();
    return organismsOnBoard.find(Board.isOrganismAPlayer);
  };
  getOrganisms = () => {
    let organismsOnBoard = [];
    for (let y = 0; y < this.tiles.length; y++) {
      for (let x = 0; x < this.tiles.length; x++) {
        if (this.tiles[x][y].getCurrentOrganism()) {
          organismsOnBoard.push(this.tiles[x][y].currentOrganism);
        }
      }
    }
    return organismsOnBoard;
  };
  sortOrganisms(organismsOnBoard) {
    organismsOnBoard.sort(function (leftOrganism, rightOrganism) {
      if (leftOrganism.initiative === rightOrganism.initiative) {
        return rightOrganism.age - leftOrganism.age;
      }
      return rightOrganism.initiative - leftOrganism.initiative;
    });
    return organismsOnBoard;
  }
  findNearestTiles = (organism) => {
    const minimalStep = organism.numberOfSteps - 1;
    // console.log(minimalStep);
    const x = organism.currentTile.x;
    const y = organism.currentTile.y;
    // console.log(x, y);
    const xMax = this.width - organism.numberOfSteps;
    const yMax = this.height - organism.numberOfSteps;
    let arrayOfNearestTiles = [];
    arrayOfNearestTiles = this.getTileBasedOnThePosition(
      x > minimalStep && y > minimalStep,
      x - organism.numberOfSteps,
      y - organism.numberOfSteps,
      arrayOfNearestTiles,
    );
    //move straight.up
    arrayOfNearestTiles = this.getTileBasedOnThePosition(
      y > minimalStep,
      x,
      y - organism.numberOfSteps,
      arrayOfNearestTiles,
    );
    // move right.up
    arrayOfNearestTiles = this.getTileBasedOnThePosition(
      x < xMax && y > minimalStep,
      x + organism.numberOfSteps,
      y - organism.numberOfSteps,
      arrayOfNearestTiles,
    );
    // move right.straight
    arrayOfNearestTiles = this.getTileBasedOnThePosition(
      x < xMax,
      x + organism.numberOfSteps,
      y,
      arrayOfNearestTiles,
    );
    // move right.down
    arrayOfNearestTiles = this.getTileBasedOnThePosition(
      x < xMax && y < yMax,
      x + organism.numberOfSteps,
      y + organism.numberOfSteps,
      arrayOfNearestTiles,
    );
    //move straight.down
    arrayOfNearestTiles = this.getTileBasedOnThePosition(
      y < yMax,
      x,
      y + organism.numberOfSteps,
      arrayOfNearestTiles,
    );
    // move left.down
    arrayOfNearestTiles = this.getTileBasedOnThePosition(
      x > minimalStep && y < yMax,
      x - organism.numberOfSteps,
      y + organism.numberOfSteps,
      arrayOfNearestTiles,
    );
    // move left.straight
    arrayOfNearestTiles = this.getTileBasedOnThePosition(
      x > minimalStep,
      x - organism.numberOfSteps,
      y,
      arrayOfNearestTiles,
    );
    return arrayOfNearestTiles;
  };
  findEmptyTilesToMate = (parent1, parent2) => {
    const parent1SurroundingTiles = this.findNearestTiles(parent1);
    const parent2SurroundingTiles = this.findNearestTiles(parent2);
    let surroundingEmptyTiles = [];
    for (let i = 0; i < parent1SurroundingTiles.length; i++) {
      if (!parent1SurroundingTiles[i].currentOrganism) {
        surroundingEmptyTiles.push(parent1SurroundingTiles[i]);
      }
    }
    for (let i = 0; i < parent2SurroundingTiles.length; i++) {
      if (
        !parent2SurroundingTiles[i].currentOrganism &&
        !surroundingEmptyTiles.includes(parent2SurroundingTiles[i])
      ) {
        surroundingEmptyTiles.push(parent2SurroundingTiles[i]);
      }
    }
    return surroundingEmptyTiles;
  };
  findEmptyTilesToSpread = (motherPlant) => {
    const surroundingTiles = this.findNearestTiles(motherPlant);
    let surroundingEmptyTiles = [];
    for (let i = 0; i < surroundingTiles.length; i++) {
      if (!surroundingTiles[i].currentOrganism) {
        surroundingEmptyTiles.push(surroundingTiles[i]);
      }
    }
    return surroundingEmptyTiles;
  };

  getTileBasedOnThePosition = (
    shouldTheTileBeAdded,
    x,
    y,
    arrayOfNearestTiles,
  ) => {
    if (shouldTheTileBeAdded) {
      return [...arrayOfNearestTiles, this.tiles[x][y]];
    }
    return arrayOfNearestTiles;
  };
}
