import { Request, Response } from 'express';
import { AlgorithmService } from '../services/algorithm.service';

export class AlgorithmController {

    constructor(
        private readonly algorithmService = new AlgorithmService(),
    ) {};

    public getAlgorithms = async( request: Request, response: Response ) => {

        response.json( 'Get Algorithms' );
    };
}