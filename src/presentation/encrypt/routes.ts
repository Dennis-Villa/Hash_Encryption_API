import { RequestHandler, Router } from '../../config';
import { FileUploadMiddleware } from '../middlewares/fileUpload.middleware';
import { AlgorithmService } from '../services/algorithm.service';
import { EncryptService } from '../services/encrypt.service';
import { EncryptController } from './controller';

export class EncryptRoutes {

    constructor(
        private readonly algorithmService: AlgorithmService,
    ){};

    get routes(): Router {

        const router = Router();

        const encryptService = new EncryptService( this.algorithmService );
        const encryptController = new EncryptController( encryptService );

        router.post( '/message', encryptController.encryptMessage );
        //todo router.post( '/keys',  ); Generar llave publica y privada
        router.post( '/hash/message', encryptController.calculateHashMessage );
        router.post( 
            '/hash/file', 
            FileUploadMiddleware.containFiles as RequestHandler,
            encryptController.calculateHashFile,
        );

        return router;
    };
};