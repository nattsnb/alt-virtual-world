import { Animal } from '../Animal';
import turtleImage from './turtle.jpg';

export class Turtle extends Animal {
    static startParameters = {
        strength: 2,
        age: 0,
        numberOfSteps: 1,
        initiative: 1,
        image: turtleImage,
    };

    constructor(board, startParameters) {
        super(board, startParameters);
        this.createElement();
    }
}