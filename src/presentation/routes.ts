import { Router } from '../config';
import { AlgorithmLocalDatasourceImplementation } from '../infrastructure/datasources/algorithm/algorithm-local.datasource.implementation';
import { AlgorithmRepositoryImplementation } from '../infrastructure/repositories/algorithm.repository.implementation';
import { AlgorithmRoutes } from './algorithm/routes';
import { DecryptRoutes } from './decrypt/routes';
import { EncryptRoutes } from './encrypt/routes';
import { KeyRoutes } from './key/routes';
import { AlgorithmService } from './services/algorithm.service';

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        const algorithmRepositoryImplementation = new AlgorithmRepositoryImplementation(
            new AlgorithmLocalDatasourceImplementation(),
        );
        const algorithmService = new AlgorithmService( algorithmRepositoryImplementation );

        const algorithmRoutes = new AlgorithmRoutes( algorithmService ).routes;
        const encryptRoutes = new EncryptRoutes( algorithmService ).routes;

        router.get( '/', ( request, response ) => {

            response.redirect( '/api/docs' );
        });

        router.use('/api/algorithm', algorithmRoutes );
        router.use('/api/encrypt', encryptRoutes );
        router.use('/api/decrypt', DecryptRoutes.routes );
        router.use('/api/key', KeyRoutes.routes );

        return router;
    };
};