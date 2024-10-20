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

        /**
         * @openapi
         * components:
         *   schemas:
         *     ResonseZipFile:
         *       type: string
         *       format: binary 
         *       example: "Buffer data" 
         * 
         *     ResonseKeyPem:
         *       type: string
         *       example: "-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEASQm+S04YeUzPfeZ7L6EBraPdeLgigumpTjbq9CkGA8w=\n-----END PUBLIC KEY-----\n"
         * 
         *     ResonseKeyDer:
         *       type: object
         *       properties:
         *         type: 
         *           type: string
         *         data: 
         *           type: array
         *           item:
         *             type: integer
         *       example:
         *          type: "Buffer"
         *          data: [ 48, 42, 48, 5, 6, 3, 43, 101, 112, 3, ]
         * 
         *     ResonsePublicKeyJWK:
         *       type: object
         *       properties:
         *         crv: 
         *           type: string
         *         x: 
         *           type: string
         *         kty: 
         *           type: string
         *       example:
         *          crv: "Ed25519"
         *          x: "QNZDtifwEyGyyQmUYEsg7powCbYzjSjadysnIeL57JY"
         *          kty: "OKP"
         * 
         *     ResonsePrivateKeyJWK:
         *       type: object
         *       properties:
         *         crv: 
         *           type: string
         *         d: 
         *           type: string
         *         x: 
         *           type: string
         *         kty: 
         *           type: string
         *       example:
         *          crv: "Ed25519"
         *          d: "S7zxP8Rns5omJHdYfbSWHPz6tJaXePxoxaAj2O7u-kQ"
         *          x: "QNZDtifwEyGyyQmUYEsg7powCbYzjSjadysnIeL57JY"
         *          kty: "OKP"
         *         
         */

        /**
         * @openapi
         * components:
         *   responses:
         *     KeyPairs:
         *       description: An private and public key pair as an object or as a zip file.
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               publicKey:
         *                 oneOf:
         *                   - $ref: "#/components/schemas/ResonseKeyPem"
         *                   - $ref: "#/components/schemas/ResonseKeyDer"
         *                   - $ref: "#/components/schemas/ResonsePublicKeyJWK"
         *               privateKey:
         *                 oneOf:
         *                   - $ref: "#/components/schemas/ResonseKeyPem"
         *                   - $ref: "#/components/schemas/ResonseKeyDer"
         *                   - $ref: "#/components/schemas/ResonsePrivateKeyJWK"
         *         application/zip:
         *           schema:
         *             $ref: "#/components/schemas/ResonseZipFile"
         * 
         */

        /**
         * @openapi
         * components:
         *   schemas:
         *     KeyPairRequestBody:
         *         type: object
         *         properties:
         *           returnFile:
         *             type: boolean
         *             default: false
         *           algorithm:
         *             type: string
         *             default: "ed25519"
         *           modulusLength:
         *             type: integer
         *           format:
         *             type: string
         *             default: "pem"
         *           publicType:
         *             type: string
         *             default: "spki"
         *           privateType:
         *             type: string
         *             default: "pkcs8"
         *           cipher:
         *             type: string
         *             default: "aes-256-cbc"
         *           passphrase:
         *             type: string
         *             default: "test"
         *         example:
         *           returnFile: false
         *           algorithm: "rsa"
         *           modulusLength: 1024
         *           format: "pem"
         *           publicType: "spki"
         *           privateType: "pkcs8"
         *           cipher: "aes-256-cbc"
         *           passphrase: "test"
         * 
         * /api/key/pair:
         *   post:
         *     summary: Generate a private and public key pair with the given parameters.
         *     description: The 'modulusLength' parameter is only required when an 'rsa' type algorithm is chosen.
         *     tags:
         *       - Key
         *     requestBody:
         *         required: false
         *         content:
         *             multipart/form-data:
         *                 schema:
         *                     $ref: "#/components/schemas/KeyPairRequestBody"
         *     responses:
         *       200:
         *         $ref: "#/components/responses/KeyPairs"
         * 
         *       5XX:
         *         $ref: "#/components/responses/ServerError"
         * 
         *       4XX:
         *         $ref: "#/components/responses/UserError"
         *                 
         */
        router.post( '/pair', keyController.generateKeyPair );

        /**
         * @openapi
         * components:
         *   responses:
         *     PrivateKey:
         *       description: An private key as an object or as a zip file.
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               privateKey:
         *                 oneOf:
         *                   - $ref: "#/components/schemas/ResonseKeyPem"
         *                   - $ref: "#/components/schemas/ResonseKeyDer"
         *                   - $ref: "#/components/schemas/ResonsePrivateKeyJWK"
         *         application/zip:
         *           schema:
         *             $ref: "#/components/schemas/ResonseZipFile"
         * 
         */

        /**
         * @openapi
         * components:
         *   schemas:
         *     PrivateKeyRequestBody:
         *         type: object
         *         properties:
         *           returnFile:
         *             type: boolean
         *             default: false
         *           algorithm:
         *             type: string
         *             default: "ed25519"
         *           modulusLength:
         *             type: integer
         *           format:
         *             type: string
         *             default: "pem"
         *           type:
         *             type: string
         *             default: "pkcs8"
         *           cipher:
         *             type: string
         *             default: "aes-256-cbc"
         *           passphrase:
         *             type: string
         *             default: "test"
         *         example:
         *           returnFile: false
         *           algorithm: "rsa"
         *           modulusLength: 1024
         *           format: "pem"
         *           type: "pkcs8"
         *           cipher: "aes-256-cbc"
         *           passphrase: "test"
         * 
         * /api/key/private-key:
         *   post:
         *     summary: Generate a private key with the given parameters.
         *     description: The 'modulusLength' parameter is only required when an 'rsa' type algorithm is chosen.
         *     tags:
         *       - Key
         *     requestBody:
         *         required: false
         *         content:
         *             multipart/form-data:
         *                 schema:
         *                     $ref: "#/components/schemas/PrivateKeyRequestBody"
         *     responses:
         *       200:
         *         $ref: "#/components/responses/PrivateKey"
         * 
         *       5XX:
         *         $ref: "#/components/responses/ServerError"
         * 
         *       4XX:
         *         $ref: "#/components/responses/UserError"
         *                 
         */
        router.post( '/private-key', keyController.generatePrivateKey );

        /**
         * @openapi
         * components:
         *   responses:
         *     PublicKey:
         *       description: An public key as an object or as a zip file.
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               publicKey:
         *                 oneOf:
         *                   - $ref: "#/components/schemas/ResonseKeyPem"
         *                   - $ref: "#/components/schemas/ResonseKeyDer"
         *                   - $ref: "#/components/schemas/ResonsePublicKeyJWK"
         *         application/zip:
         *           schema:
         *             $ref: "#/components/schemas/ResonseZipFile"
         * 
         */

        /**
         * @openapi
         * components:
         *   schemas:
         *     PublicKeyRequestBody:
         *         type: object
         *         properties:
         *           returnFile:
         *             type: boolean
         *             default: false
         *           file:
         *             type: string
         *             format: binary
         *           type:
         *             type: string
         *             default: "spki"
         *           encoding:
         *             type: string
         *             default: "utf-8"
         *           cipher:
         *             type: string
         *             default: "aes-256-cbc"
         *           passphrase:
         *             type: string
         *             default: "test"
         *         example:
         *           returnFile: false
         *           type: "spki"
         *           encoding: "utf-8"
         *           cipher: "aes-256-cbc"
         *           passphrase: "test"
         * 
         * /api/key/public-key:
         *   post:
         *     summary: Generate a public key with the given parameters.
         *     description: The 'modulusLength' parameter is only required when an 'rsa' type algorithm is chosen.
         *     tags:
         *       - Key
         *     requestBody:
         *         required: false
         *         content:
         *             multipart/form-data:
         *                 schema:
         *                     $ref: "#/components/schemas/PublicKeyRequestBody"
         *     responses:
         *       200:
         *         $ref: "#/components/responses/PrivateKey"
         * 
         *       5XX:
         *         $ref: "#/components/responses/ServerError"
         * 
         *       4XX:
         *         $ref: "#/components/responses/UserError"
         *                 
         */
        router.post( 
            '/public-key', 
            FileUploadMiddleware.containFiles as RequestHandler,
            keyController.generatePublicKey,
        );

        return router;
    };
};