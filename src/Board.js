import { Tile } from './Tile';

export class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.tiles = [];
        this.render();
    }

    render = () => {
        const boardContainer = document.querySelector('#board-container');
        // ========= form old render(), do I need that? ============
        // for (let i = 0; i < this.height; i++) {
        //     this.tiles[i] = [];
        // }
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
}