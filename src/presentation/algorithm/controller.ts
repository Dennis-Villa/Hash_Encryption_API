import { Request, Response } from '../../config';
import { AlgorithmService } from '../services/algorithm.service';

export class AlgorithmController {

    constructor(
        private readonly algorithmService = new AlgorithmService(),
    ) {};

    public getAlgorithms = async( request: Request, response: Response ) => {

        this.algorithmService.getAll()
            .then( algorithms => response.status( 200 ).json({ algorithms }));
    };

    public getAlgorithmsNames = async( request: Request, response: Response ) => {

        this.algorithmService.getNames()
            .then( names => response.status( 200 ).json({ algorithmNames: names }));
    };
}