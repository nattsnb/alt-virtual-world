import { Organism } from './Organism';

export class Plant extends Organism {
    constructor(board, startParameters) {
        super(board, startParameters);
        this.chancesToSpread = startParameters.chancesToSpread;
    }
}
