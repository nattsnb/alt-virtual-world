import { Tile } from './Tile';
import { classesList } from './classesList';

export class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.tiles = [];
    this.render();
    this.createInitialCharacters();
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
      // console.log(organism);
    }
    // const player = new Player(this, Player.startParameters);
    // // console.log(player);
    // const tileForPlayer = this.findRandomTileOnBoard();
    // tileForPlayer.addCurrentOrganism(player);
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
    console.log(organismsOnBoard)
    this.sortedOrganismsOnBoard = this.sortOrganisms(organismsOnBoard);
    console.log(this.sortedOrganismsOnBoard);
    for (let i = 0; i < this.sortedOrganismsOnBoard.length; i++) {
      // if (this.sortedOrganismsOnBoard[i].currentOrganism.isAlive === true){
      //   // console.log(sortedOrganismsOnBoard[i])
        await this.sortedOrganismsOnBoard[i].action();
      // }
    }
  };
  getOrganisms = () => {
    const organismsOnBoard = [];
    for (let y = 0; y < this.tiles.length; y++) {
      for (let x = 0; x < this.tiles.length; x++) {
        if (this.tiles[x][y].currentOrganism) {
          organismsOnBoard.push(this.tiles[x][y].currentOrganism);
        }
      }
    }
    return organismsOnBoard;
  }
  sortOrganisms(organismsOnBoard) {
    organismsOnBoard.sort(function (leftOrganism, rightOrganism) {
      if (leftOrganism.initiative === rightOrganism.initiative) {
        return rightOrganism.age - leftOrganism.age;
      }
      return rightOrganism.initiative - leftOrganism.initiative;
    });
    return organismsOnBoard;
  }
}
