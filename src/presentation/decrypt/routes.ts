import { RequestHandler, Router } from '../../config';
import { FileUploadMiddleware } from '../middlewares/fileUpload.middleware';
import { DecryptService } from '../services/decrypt.service';
import { DecryptController } from './controller';

export class DecryptRoutes {

    static get routes(): Router {

        const router = Router();

        const decryptService = new DecryptService();
        const decryptController = new DecryptController( decryptService );

        router.post( '/message', decryptController.decryptHash );

        return router;
    };
};