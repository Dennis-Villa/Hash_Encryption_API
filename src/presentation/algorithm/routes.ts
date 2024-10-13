import { Router } from '../../config';
import { AlgorithmController } from './controller';

export class AlgorithmRoutes {

    static get routes(): Router {

        const router = Router();
        const algorithmController = new AlgorithmController()

        router.get('/', algorithmController.getAlgorithms );
        router.get('/names', algorithmController.getAlgorithmsNames );

        return router;
    };
};