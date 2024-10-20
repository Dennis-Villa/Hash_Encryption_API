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

        /**
         * @openapi
         * components:
         *   responses:
         *     HashString:
         *       description: An encrypted hash using the selected algorithm.
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               hash:
         *                 type: string
         *                 example: "3e07538991791b125a9c6509f6a9f689"
         *         
         */

        /**
         * @openapi
         * components:
         *   schemas:
         *     EncryptMessageRequestBody:
         *         type: object
         *         properties:
         *           message:
         *             type: string
         *             default: "test message"
         *           algorithm:
         *             type: string
         *             default: "md5"
         *           key:
         *             type: string
         *             default: ""
         *         required:
         *           - message
         *           - algorithm
         *         example:
         *             message: "test message"
         *             algorithm: "md5"
         *             key: "test key"
         * 
         * /api/encrypt/message:
         *   post:
         *     summary: Encrypts a message using the given algorithm.
         *     description: The algorithm must be one of the algorithms listed in /api/algorithm. An encryption key can be specified for the hash.
         *     tags:
         *       - Encrypt
         *     requestBody:
         *         required: true
         *         content:
         *             application/json:
         *                 schema:
         *                     $ref: "#/components/schemas/EncryptMessageRequestBody"
         *             multipart/form-data:
         *                 schema:
         *                     $ref: "#/components/schemas/EncryptMessageRequestBody"
         *     responses:
         *       200:
         *         $ref: "#/components/responses/HashString"
         * 
         *       5XX:
         *         $ref: "#/components/responses/ServerError"
         * 
         *       4XX:
         *         $ref: "#/components/responses/UserError"
         *                 
         */
        router.post( '/message', encryptController.encryptMessage );

        /**
         * @openapi
         * components:
         *   schemas:
         *     CalculateHashMessageRequestBody:
         *         type: object
         *         properties:
         *           message:
         *             type: string
         *             default: "test message"
         *           algorithm:
         *             type: string
         *             default: "md5"
         *         required:
         *           - message
         *           - algorithm
         *         example:
         *             message: "test message"
         *             algorithm: "md5"
         * 
         * /api/encrypt/hash/message:
         *   post:
         *     summary: Calculate a checksum hash for a message using the given algorithm.
         *     description: The algorithm must be one of the algorithms listed in /api/algorithm.
         *     tags:
         *       - Encrypt
         *     requestBody:
         *         required: true
         *         content:
         *             application/json:
         *                 schema:
         *                     $ref: "#/components/schemas/CalculateHashMessageRequestBody"
         *             multipart/form-data:
         *                 schema:
         *                     $ref: "#/components/schemas/CalculateHashMessageRequestBody"
         *     responses:
         *       200:
         *         $ref: "#/components/responses/HashString"
         * 
         *       5XX:
         *         $ref: "#/components/responses/ServerError"
         * 
         *       4XX:
         *         $ref: "#/components/responses/UserError"
         *                 
         */
        router.post( '/hash/message', encryptController.calculateHashMessage );

                /**
         * @openapi
         * components:
         *   schemas:
         *     CalculateHashFileRequestBody:
         *         type: object
         *         properties:
         *           file:
         *             type: string
         *             format: binary
         *           algorithm:
         *             type: string
         *             default: "md5"
         *         required:
         *           - file
         *           - algorithm
         * 
         * /api/encrypt/hash/file:
         *   post:
         *     summary: Calculate a checksum hash for a file using the given algorithm.
         *     description: The algorithm must be one of the algorithms listed in /api/algorithm.
         *     tags:
         *       - Encrypt
         *     requestBody:
         *         required: true
         *         content:
         *             multipart/form-data:
         *                 schema:
         *                     $ref: "#/components/schemas/CalculateHashFileRequestBody"
         *     responses:
         *       200:
         *         $ref: "#/components/responses/HashString"
         * 
         *       5XX:
         *         $ref: "#/components/responses/ServerError"
         * 
         *       4XX:
         *         $ref: "#/components/responses/UserError"
         *                 
         */
        router.post( 
            '/hash/file', 
            FileUploadMiddleware.containFiles as RequestHandler,
            encryptController.calculateHashFile,
        );

        return router;
    };
};