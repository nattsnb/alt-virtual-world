export class Tile {
    constructor(x, y, board) {
        this.x = x;
        this.y = y;
        this.currentOrganism = null;
        this.createTileElement();
        this.initializeEventListener();
        this.board = board;
    }

    createTileElement = () => {
        this.tileContainer = document.createElement('div');
        this.tileContainer.classList.add('tileContainer');
    };
}