import { Router } from '../../config';
import { AlgorithmController } from './controller';
import { AlgorithmLocalDatasourceImplementation } from '../../infrastructure/datasources/algorithm/algorithm-local.datasource.implementation';
import { AlgorithmRepositoryImplementation } from '../../infrastructure/repositories/algorithm.repository.implementation';
import { AlgorithmService } from '../services/algorithm.service';

export class AlgorithmRoutes {

    static get routes(): Router {

        const router = Router();

        const algorithmRepositoryImplementation = new AlgorithmRepositoryImplementation(
            new AlgorithmLocalDatasourceImplementation(),
        );
        const algorithmService = new AlgorithmService( algorithmRepositoryImplementation );
        const algorithmController = new AlgorithmController( algorithmService );

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