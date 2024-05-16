import { classesList } from './classesList';
import { Wolf } from './wolf/Wolf';
import { Sheep } from './sheep/Sheep';
import { Fox } from './fox/Fox';
import { Antelope } from './antelope/Antelope';
import { Turtle } from './turtle/Turtle';
import { Grass } from './grass/Grass';
import { Guarana } from './guarana/Guarana';
import { Berry } from './berry/Berry';
import { Thistle } from './thistle/Thistle';

export class Modal {
  constructor(board) {
    this.board = board;
    this.isVisible = false;
    this.activeTile = null;
  }
  activate = (tile) => {
    const modal = document.getElementById('addOrganismModal');
    modal.style.display = 'block';
    this.isVisible = true;
    this.activeTile = tile;
  };

  deactivate = () => {
    const modal = document.getElementById('addOrganismModal');
    modal.style.display = 'none';
    this.isVisible = false;
    this.activeTile = null;
  };
  initializeEventListenerOnModal = () => {
    const icons = document.querySelectorAll('.icon-container');
    for (let i = 0; i < icons.length; ++i) {
      const icon = icons[i];
      icon.addEventListener('click', this.eventToTrigger);
    }
    const closeButton = document.querySelector('#close-button');
    closeButton.addEventListener('click', this.eventToTrigger);
  };
  eventToTrigger = (event) => {
    this.checkClickOnIcon(event);
  };
  checkClickOnIcon = (event) => {
    const organismIdToClassMapping = {
      wolf: Wolf,
      sheep: Sheep,
      fox: Fox,
      antelope: Antelope,
      turtle: Turtle,
      grass: Grass,
      guarana: Guarana,
      berry: Berry,
      thistle: Thistle,
    };
    const elementID = event.target.id;
    if (organismIdToClassMapping[elementID]) {
      this.addOrganismOnClick(organismIdToClassMapping[elementID]);
    }
    if (elementID === 'close-button') {
      const modal = document.getElementById('addOrganismModal');
      modal.style.display = 'none';
    }
  };
  addOrganismOnClick = (whatClass) => {
    const newOrganism = new whatClass(this.board, whatClass.startParameters);
    this.addCurrentOrganism(newOrganism);
  };
}
