import { Router } from '../../config';
import { EncryptService } from '../services/encrypt.service';
import { EncryptController } from './controller';

export class EncryptRoutes {

    static get routes(): Router {

        const router = Router();

        const encryptService = new EncryptService();
        const encryptController = new EncryptController( encryptService );

        router.post('/message', encryptController.encryptMessage );

        return router;
    };
};