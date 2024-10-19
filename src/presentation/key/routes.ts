import { RequestHandler, Router } from '../../config';
import { FileUploadMiddleware } from '../middlewares/fileUpload.middleware';
import { KeyService } from '../services/key.service';
import { KeyController } from './controller';

export class KeyRoutes {

    static get routes(): Router {

        const router = Router();

        const keyService = new KeyService();
        const keyController = new KeyController( keyService );

        //todo Add the rest of properties in crypto.generateKeyPairSync
        router.post( '/pair', keyController.generateKeyPair );
        router.post( '/private-key', keyController.generatePrivateKey );
        router.post( 
            '/public-key', 
            FileUploadMiddleware.containFiles as RequestHandler,
            keyController.generatePublicKey,
        );

        return router;
    };
};