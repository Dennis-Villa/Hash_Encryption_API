import { Request, Response } from '../../config';
import { AlgorithmService } from '../services/algorithm.service';

export class AlgorithmController {

    constructor(
        private readonly algorithmService: AlgorithmService,
    ) {};

    //todo error handler

    public getAlgorithms = async( request: Request, response: Response ) => {

        this.algorithmService.getAll()
            .then( algorithms => response.status( 200 ).json({ algorithms }));
    };

    public getAlgorithmsNames = async( request: Request, response: Response ) => {

        this.algorithmService.getNames()
            .then( names => response.status( 200 ).json({ algorithmNames: names }));
    };

    public getAlgorithmsByCypher = async( request: Request, response: Response ) => {

        const { type } = request.query;
        if( !type ) response.status( 400 ).json({ error: 'No cypher provided' });

        const cyphers = String( type ).split( ',' );

        this.algorithmService.getByCypherType( cyphers )
            .then( algorithm => response.status( 200 ).json({ algorithm }));
    };
}