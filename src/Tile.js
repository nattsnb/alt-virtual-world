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
    this.tileContainer.addEventListener('click', this.checkClickOnTile);
  };

  checkClickOnTile = async () => {
    if (!this.currentOrganism) {
      const modal = document.getElementById('addOrganismModal');
      this.initializeEventListenerOnModal();
      modal.style.display = 'block';
      await this.checkClickOnIcon;
    }
  };
  getCurrentOrganism = () => {
    if (this.currentOrganism) {
      return this.currentOrganism.isAlive;
    } else {
      return false;
    }
  };
  initializeEventListenerOnModal = () => {
    const icons = document.querySelectorAll('.icon-container');
    for (let i = 0; i < icons.length; ++i) {
      const icon = icons[i];
      icon.addEventListener('click', this.eventToTrigger);
    }
  };
  eventToTrigger = (event) => {
    this.checkClickOnIcon(event);
  };
  checkClickOnIcon = (event) => {
    const icon = event.target.id;
    if (icon === 'wolf-icon') {
      this.addOrganismOnClick(0);
    }
    if (icon === 'sheep-icon') {
      this.addOrganismOnClick(1);
    }
    if (icon === 'fox-icon') {
      this.addOrganismOnClick(2);
    }
    if (icon === 'antelope-icon') {
      this.addOrganismOnClick(3);
    }
    if (icon === 'turtle-icon') {
      this.addOrganismOnClick(4);
    }
    if (icon === 'grass-icon') {
      this.addOrganismOnClick(5);
    }
    if (icon === 'guarana-icon') {
      this.addOrganismOnClick(6);
    }
    if (icon === 'berry-icon') {
      this.addOrganismOnClick(7);
    }
    if (icon === 'thistle-icon') {
      this.addOrganismOnClick(8);
    }
    if (icon === 'close-button') {
      const modal = document.getElementById('addOrganismModal');
      modal.style.display = 'none';
    }
  };
  addOrganismOnClick = (index) => {
    const newOrganism = new classesList[index](
      this.board,
      classesList[index].startParameters,
    );
    this.addCurrentOrganism(newOrganism);
    const modal = document.getElementById('addOrganismModal');
    modal.style.display = 'none';
  };
}
