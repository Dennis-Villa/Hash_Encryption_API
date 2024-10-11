import { Router } from '../config';
import { AlgorithmRoutes } from './algorithm/routes';

export class AppRoutes {

    static get routes(): Router {

        const router = Router();
    
        router.use('/api/algorithm', AlgorithmRoutes.routes );

        return router;
    };
};