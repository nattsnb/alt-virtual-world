import { classesList } from './classesList';

export class Tile {
  constructor(x, y, board) {
    this.x = x;
    this.y = y;
    this.currentOrganism = null;
    this.createTileElement();
    this.board = board;
    this.initializeEventListener();
  }

  createTileElement = () => {
    this.tileContainer = document.createElement('div');
    this.tileContainer.classList.add('tileContainer');
  };

  addCurrentOrganism = (organism) => {
    this.currentOrganism = organism;
    this.tileContainer.innerHTML = '';
    this.tileContainer.append(this.currentOrganism.element);
    organism.isAddedToTile(this);
  };
  killCurrentOrganism = (killer) => {
    this.currentOrganism.death(killer);
    this.currentOrganism = null;
    this.tileContainer.innerHTML = '';
  };
  clearTile = () => {
    this.currentOrganism = null;
    this.tileContainer.innerHTML = '';
  };

  initializeEventListener = () => {
    this.tileContainer.addEventListener('click', this.checkClick);
  };

  checkClick = () => {
    if (!this.currentOrganism) {
      const randomClassIndex = Math.floor(Math.random() * classesList.length);
      const organism = new classesList[randomClassIndex](
        this,
        classesList[randomClassIndex].startParameters,
      );
      console.log(organism);
      this.addCurrentOrganism(organism);
    }
  };
  getCurrentOrganism = () => {
    if (this.currentOrganism) {
      return this.currentOrganism.isAlive;
    } else {
      return false;
    }
  };
}
