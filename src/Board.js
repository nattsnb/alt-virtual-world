import { Tile } from './Tile';
import {classesList} from "./classesList";

export class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.tiles = [];
    this.render();
  }

  render = () => {
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
      let RandomOrganismClass =
          classesList[Math.floor(Math.random() * classesList.length)];
      const organism = new RandomOrganismClass(
          this,
          RandomOrganismClass.startParameters,
      );
      const tileForNewOrganism = this.findRandomTileOnBoard();
      tileForNewOrganism.addCurrentOrganism(organism);
      console.log(organism);
    }
    // const player = new Player(this, Player.startParameters);
    // // console.log(player);
    // const tileForPlayer = this.findRandomTileOnBoard();
    // tileForPlayer.addCurrentOrganism(player);
  };
}
