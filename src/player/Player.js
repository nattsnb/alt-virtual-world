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
        this.initializeEventListener();
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
    moveIfPossible = (coordinates) => {
        this.activeTile.tileContainer.removeAttribute('id');
        this.activeTile = this.board.tiles[coordinates.x][coordinates.y];
        console.log(this.activeTile);
        const activeTileDiv = this.activeTile.tileContainer;
        activeTileDiv.setAttribute('id', 'activeTile');
    };
    initializeEventListener = () => {
        window.addEventListener('keyup', this.eventToTrigger);
    };
    eventToTrigger = (event) => {this.checkKeyPressed(event);}
    checkKeyPressed = (evt) => {
        if (evt.code === 'KeyW') {
            console.log('keyW');
            const newY = this.activeTile.y - 1;
            if (
                this.tilesForAction.includes(this.board.tiles[this.activeTile.x][newY])
            ) {
                const coordinates = {x: this.activeTile.x, y: newY};
                this.moveIfPossible(coordinates);
            }
        }
        if (evt.code === 'KeyA') {
            console.log('KeyA');
            const newX = this.activeTile.x - 1;
            if (
                this.tilesForAction.includes(this.board.tiles[newX][this.activeTile.y])
            ) {
                const coordinates = {x: newX, y: this.activeTile.y};
                this.moveIfPossible(coordinates);
            }
        }
        if (evt.code === 'KeyS') {
            console.log('KeyS');
            const newY = this.activeTile.y + 1;
            if (
                this.tilesForAction.includes(this.board.tiles[this.activeTile.x][newY])
            ) {
                const coordinates = {x: this.activeTile.x, y: newY};
                this.moveIfPossible(coordinates);
            }
        }
        if (evt.code === 'KeyD') {
            console.log('KeyD');
            const newX = this.activeTile.x + 1;
            if (
                this.tilesForAction.includes(this.board.tiles[newX][this.activeTile.y])
            ) {
                const coordinates = {x: newX, y: this.activeTile.y};
                this.moveIfPossible(coordinates);
            }
        }
        if (evt.code === 'Enter') {
            console.log('Enter');
            this.tilesForAction = [];
            if (this.activeTile.currentOrganism) {
                if (this.shouldFight(this.activeTile)) {
                    this.fight(this.activeTile);
                }
                if (this.shouldEat(this.activeTile)) {
                    this.activeTile.currentOrganism.animalEatsPlant(this);
                }
            } else if (this.shouldMove(this.activeTile)) {
                this.moveOrganism(this.activeTile);
            } else {
                `Player didnt move`;
            }
            this.resolveMovement();
        }
    };
}