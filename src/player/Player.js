import { Animal } from '../Animal';
import playerImage from './player.jpg';

export class Player extends Animal {
    static startParameters = {
        strength: 5,
        age: 0,
        numberOfSteps: 1,
        initiative: 4,
        image: playerImage,
    };

    constructor(board, startParameters) {
        super(board, startParameters);
        // this.initializeEventListener();
        this.createElement();
        this.x = 0;
        this.y = 0;
        this.tilesForAction = [];
        this.activeTile = [];
    }
    action = async () => {
        this.activeTile = this.board.tiles[this.x][this.y];
        this.tilesForAction = this.board.findNearestTiles(this);
        this.tilesForAction.push(this.board.tiles[this.x][this.y]);
        console.log(this.activeTile);
        const currentTileDiv = this.board.tiles[this.x][this.y].tileContainer;
        currentTileDiv.setAttribute('id', 'activeTile');
        this.age = this.age + 1;
        return this.move();
    };
    move = () => {
        return new Promise((resolve, reject) => {
            this.resolveMovement = resolve;
        });
    };
}