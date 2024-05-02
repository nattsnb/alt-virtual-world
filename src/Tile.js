export class Tile {
  constructor(x, y, board) {
    this.x = x;
    this.y = y;
    this.currentOrganism = null;
    this.createTileElement();
    this.board = board;
  }

  createTileElement = () => {
    this.tileContainer = document.createElement('div');
    this.tileContainer.classList.add('tileContainer');
  };

  addCurrentOrganism = (organism) => {
    this.currentOrganism = organism;
    this.refresh()
  }

  deleteCurrentOrganism = () => {
    this.currentOrganism.death()
    this.currentOrganism = null;
    this.tileContainer.innerHTML = '';
  }

  refresh = () => {
    this.tileContainer.innerHTML = '';
    this.tileContainer.append(this.currentOrganism.element);
  };
}
