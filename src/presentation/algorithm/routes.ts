import { Router } from '../../config';
import { AlgorithmController } from './controller';
import { AlgorithmService } from '../services/algorithm.service';

export class AlgorithmRoutes {

    constructor(
        private readonly algorithmService: AlgorithmService,
    ){};

    get routes(): Router {

        const router = Router();

        const algorithmController = new AlgorithmController( this.algorithmService );

        router.get('/', algorithmController.getAlgorithms );
        router.get('/names', algorithmController.getAlgorithmsNames );
        router.get('/keys', algorithmController.getAlgorithmsKeyTypes );
        router.get('/cyphers', algorithmController.getAlgorithmsCypherTypes );

        router.get('/name', algorithmController.getAlgorithmsByName );
        router.get('/key', algorithmController.getAlgorithmsByKey );
        router.get('/cypher', algorithmController.getAlgorithmsByCypher );

        return router;
    };
};