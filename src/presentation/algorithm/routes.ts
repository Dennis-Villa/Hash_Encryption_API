import { Router } from '../../config';
import { AlgorithmController } from './controller';
import { AlgorithmService } from '../services/algorithm.service';

export class AlgorithmRoutes {

    constructor(
        private readonly algorithmService: AlgorithmService,
    ){};

    get routes(): Router {

        const router = Router();

        const algorithmController = new AlgorithmController( this.algorithmService );

        /**
         * @openapi
         * components:
         *   responses:
         *     ServerError:
         *       description: The server encountered an unknown error.
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               error:
         *                 type: string
         *                 example: "Internal server error: Some error message"
         *     UserError:
         *       description: Error caused by user request.
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               error:
         *                 type: string
         *                 example: "Some error message"
         *         
         */

        /**
         * @openapi
         * 
         * /api/algorithm:
         *   get:
         *     summary: Retrieve a list of encryption algorithms
         *     tags:
         *       - Algorithm
         *     responses:
         *       200:
         *         description: OK
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 algorithms:
         *                   type: array
         *                   items:
         *                      $ref: "#/components/schemas/Algorithm"
         * 
         *       5XX:
         *         $ref: "#/components/responses/ServerError"
         * 
         *       4XX:
         *         $ref: "#/components/responses/UserError"
         *                 
         */
        router.get('/', algorithmController.getAlgorithms );

        /**
         * @openapi
         * 
         * /api/algorithm/names:
         *   get:
         *     summary: Retrieve a list of encryption algorithms names
         *     tags:
         *       - Algorithm
         *     responses:
         *       200:
         *         description: OK
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 algorithmNames:
         *                   type: array
         *                   items:
         *                      type: string
         *                   example: [ "md5", "sha1" ]
         * 
         *       5XX:
         *         $ref: "#/components/responses/ServerError"
         * 
         *       4XX:
         *         $ref: "#/components/responses/UserError"
         *                 
         */
        router.get('/names', algorithmController.getAlgorithmsNames );

        /**
         * @openapi
         * 
         * /api/algorithm/keys:
         *   get:
         *     summary: Retrieve a list of encryption algorithms key types
         *     tags:
         *       - Algorithm
         *     responses:
         *       200:
         *         description: OK
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 algorithmKeyTypes:
         *                   type: array
         *                   items:
         *                      type: string
         *                   example: [ "SYMMETRIC", "ASYMMETRIC" ]
         * 
         *       5XX:
         *         $ref: "#/components/responses/ServerError"
         * 
         *       4XX:
         *         $ref: "#/components/responses/UserError"
         *                 
         */
        router.get('/keys', algorithmController.getAlgorithmsKeyTypes );

        /**
         * @openapi
         * 
         * /api/algorithm/ciphers:
         *   get:
         *     summary: Retrieve a list of encryption algorithms cipher types
         *     tags:
         *       - Algorithm
         *     responses:
         *       200:
         *         description: OK
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 algorithCipherTypes:
         *                   type: array
         *                   items:
         *                      type: string
         *                   example: [ "BLOCK", "STREAM", "PUBKEY" ]
         * 
         *       5XX:
         *         $ref: "#/components/responses/ServerError"
         * 
         *       4XX:
         *         $ref: "#/components/responses/UserError"
         *                 
         */
        router.get('/ciphers', algorithmController.getAlgorithmsCipherTypes );

        /**
         * @openapi
         * components:
         *   examples:
         *     SearchedAlgorithmExample:
         *       summary: A sample algorithm search object
         *       value:
         *          algorithm:
         *              name: md5
         *              keyType: ASYMMETRIC
         *              cipherType: SIGNATURE
         *         
         */

        /**
         * @openapi
         * components:
         *   responses:
         *     AlgorithmSearch:
         *       description: Search an algorithm by one of its properties.
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               algorithm:
         *                 type: object
         *           examples:
         *             SearchedAlgorithmExample:
         *               $ref: "#/components/examples/SearchedAlgorithmExample"
         *         
         */

        /**
         * @openapi
         * 
         * /api/algorithm/name:
         *   get:
         *     summary: Retrieve an encryption algorithms with given name.
         *     tags:
         *       - Algorithm
         *     parameters:
         *       - in: query
         *         name: value
         *         required: true
         *         description: Name of the algorithm to retrieve.
         *         schema:
         *           type: string
         *           default: md5
         *     responses:
         *       200:
         *         $ref: "#/components/responses/AlgorithmSearch"
         * 
         *       5XX:
         *         $ref: "#/components/responses/ServerError"
         * 
         *       4XX:
         *         $ref: "#/components/responses/UserError"
         *                 
         */
        router.get('/name', algorithmController.getAlgorithmsByName );

        /**
         * @openapi
         * components:
         *   responses:
         *     AlgorithmsSearch:
         *       description: Search algorithms by one of its properties.
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               algorithms:
         *                 type: array
         *                 items:
         *                    $ref: "#/components/schemas/Algorithm"
         *         
         */

        /**
         * @openapi
         * 
         * /api/algorithm/key:
         *   get:
         *     summary: Retrieve a list of encryption algorithms with given key type.
         *     tags:
         *       - Algorithm
         *     parameters:
         *       - in: query
         *         name: value
         *         required: true
         *         description: Key type of the algorithms to retrieve.
         *         schema:
         *           type: string
         *           default: ASYMMETRIC
         *     responses:
         *       200:
         *         $ref: "#/components/responses/AlgorithmsSearch"
         * 
         *       5XX:
         *         $ref: "#/components/responses/ServerError"
         * 
         *       4XX:
         *         $ref: "#/components/responses/UserError"
         *                 
         */
        router.get('/key', algorithmController.getAlgorithmsByKey );

        /**
         * @openapi
         * 
         * /api/algorithm/cipher:
         *   get:
         *     summary: Retrieve a list of encryption algorithms with given cipher types.
         *     tags:
         *       - Algorithm
         *     parameters:
         *       - in: query
         *         name: values
         *         required: true
         *         description: Cipher types separated by coma of the algorithms to retrieve.
         *         schema:
         *           type: string
         *           default: SIGNATURE
         *     responses:
         *       200:
         *         $ref: "#/components/responses/AlgorithmsSearch"
         * 
         *       5XX:
         *         $ref: "#/components/responses/ServerError"
         * 
         *       4XX:
         *         $ref: "#/components/responses/UserError"
         *                 
         */
        router.get('/cipher', algorithmController.getAlgorithmsByCipher );

        return router;
    };
};