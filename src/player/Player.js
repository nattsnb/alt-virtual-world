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
}