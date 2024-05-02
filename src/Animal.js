import { Organism } from './Organism';
import { Plant } from './Plant';

export class Animal extends Organism {
    constructor(board, startParameters) {
        super(board, startParameters);
        this.initiative = startParameters.initiative;
        this.numberOfSteps = startParameters.numberOfSteps;
        this.strength = startParameters.strength;
    }
}