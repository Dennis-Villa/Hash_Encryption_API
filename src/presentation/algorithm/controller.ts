import { Request, Response } from '../../config';
import { CustomError } from '../../domain';
import { AlgorithmService } from '../services/algorithm.service';

export class AlgorithmController {

    constructor(
        private readonly algorithmService: AlgorithmService,
    ) {};

    private handleError = ( error: Error | CustomError, response: Response ) => {

        if ( error instanceof CustomError ) {
        
            return response.status( error.statusCode ).json({ error: error.message });
        };

        return response.status( 500 ).json({ 
            error: `Internal server error: ${error.message}`,
        });
    };

    public getAlgorithms = async( request: Request, response: Response ) => {

        this.algorithmService.getAll()
            .then( algorithms => response.status( 200 ).json({ algorithms }))
            .catch( ( error ) => this.handleError( error, response ) );
    };

    public getAlgorithmsNames = async( request: Request, response: Response ) => {

        this.algorithmService.getNames()
            .then( names => response.status( 200 ).json({ algorithmNames: names }))
            .catch( ( error ) => this.handleError( error, response ) );
    };

    public getAlgorithmsKeyTypes = async( request: Request, response: Response ) => {

        this.algorithmService.getKeyTypes()
            .then( types => response.status( 200 ).json({ algorithmKeyTypes: types }))
            .catch( ( error ) => this.handleError( error, response ) );
    };

    public getAlgorithmsCipherTypes = async( request: Request, response: Response ) => {

        this.algorithmService.getCipherTypes()
            .then( types => response.status( 200 ).json({ algorithCipherTypes: types }))
            .catch( ( error ) => this.handleError( error, response ) );
    };

    public getAlgorithmsByName = async( request: Request, response: Response ) => {

        const { value } = request.query;
        if( !value ) {

            response.status( 400 ).json({ error: 'No name provided' });
            return;
        };

        this.algorithmService.getByName( String( value ) )
            .then( algorithm => response.status( 200 ).json({ algorithm }))
            .catch( ( error ) => this.handleError( error, response ) );
    };

    public getAlgorithmsByKey = async( request: Request, response: Response ) => {

        const { value } = request.query;
        if( !value ) {

            response.status( 400 ).json({ error: 'No key provided' });
            return;
        };

        this.algorithmService.getByKeyType( String( value ) )
            .then( algorithms => response.status( 200 ).json({ algorithms }))
            .catch( ( error ) => this.handleError( error, response ) );
    };

    public getAlgorithmsByCipher = async( request: Request, response: Response ) => {

        const { values } = request.query;
        if( !values ) {

            response.status( 400 ).json({ error: 'No cypher provided' });
            return;
        };

        const ciphers = String( values ).split( ',' );

        this.algorithmService.getByCipherType( ciphers )
            .then( algorithms => response.status( 200 ).json({ algorithms }))
            .catch( ( error ) => this.handleError( error, response ) );
    };
}