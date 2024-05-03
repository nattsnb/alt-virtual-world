export class Organism {
  constructor(board, startParameters) {
    this.age = startParameters.age;
    this.image = startParameters.image;
    this.initiative = startParameters.initiative;
    this.element = document.createElement('span');
    this.element.innerText = 'organism';
    this.board = board;
    this.isAlive = true;
    this.currentTile = null;
  }

  createElement = () => {
    this.element = document.createElement('img');
    this.element.classList.add('organism-image');
    this.element.src = this.image;
  };

  birth = (tile) => {
    this.currentTile = tile;
  };

  death = () => {
    this.currentTile = null;
    this.isAlive = false;
  };

  action() {
    // console.log('action: organism');
    this.age = this.age + 1;
    return true;
  }
}
