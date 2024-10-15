import { Router } from '../config';
import { AlgorithmRoutes } from './algorithm/routes';
import { EncryptRoutes } from './encrypt/routes';

export class AppRoutes {

    static get routes(): Router {

        const router = Router();
    
        router.use('/api/algorithm', AlgorithmRoutes.routes );
        router.use('/api/encrypt', EncryptRoutes.routes );

        return router;
    };
};