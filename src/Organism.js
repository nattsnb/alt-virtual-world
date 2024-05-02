export class Organism {
  constructor(board, startParameters) {
    this.age = startParameters.age;
    this.image = startParameters.image;
    this.initiative = startParameters.initiative;
    this.element = document.createElement('span');
    this.element.innerText = 'organism';
    this.board = board;
  }

  createElement = () => {
    this.element = document.createElement('img');
    this.element.classList.add('organism-image');
    this.element.src = this.image;
  };
}
