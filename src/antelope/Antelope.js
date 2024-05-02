import { Animal } from '../Animal';
import antelopeImage from './antelope.jpg';

export class Antelope extends Animal {
    static startParameters = {
        strength: 4,
        age: 0,
        numberOfSteps: 2,
        initiative: 4,
        image: antelopeImage,
    };

    constructor(board, startParameters) {
        super(board, startParameters);
        this.createElement();
    }
}