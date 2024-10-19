import { Request, Response } from '../../config';
import { CustomError, GenerateKeyPairsDto, GeneratePrivateKeyDto, GeneratePublicKeyDto } from '../../domain';
import { KeyService } from '../services/key.service';

export class KeyController {

    constructor(
        private readonly keyService: KeyService,
    ) {};

    private handleError = ( error: Error | CustomError, response: Response ) => {

        if ( error instanceof CustomError ) {
        
            return response.status( error.statusCode ).json( error.message );
        };

        return response.status( 500 ).json({ 
            error: `Internal server error: ${error.message}`,
        });
    };

    public generateKeyPair = async( request: Request, response: Response ) => {

        const [ error, generateKeyPairsDto ] = GenerateKeyPairsDto.create( request.body );
        if ( !!error ){ 

            response.status(400).json({ error });
            return;
        };

        const { returnFile } = generateKeyPairsDto!;

        if ( returnFile ) {

            this.keyService.generateKeyPairFile( generateKeyPairsDto!, response )
                .then()
                .catch( ( error ) => this.handleError( error, response ) );
            
            return;
        };

        this.keyService.generateKeyPair( generateKeyPairsDto! )
            .then( keys => response.status( 200 ).json({ ...keys }))
            .catch( ( error ) => this.handleError( error, response ) );
    };

    public generatePrivateKey = async( request: Request, response: Response ) => {

        const [ error, generatePrivateKeyDto ] = GeneratePrivateKeyDto.create( request.body );
        if ( !!error ){ 

            response.status(400).json({ error });
            return;
        };

        const { returnFile } = generatePrivateKeyDto!;

        if ( returnFile ) {

            this.keyService.generatePrivateKeyFile( generatePrivateKeyDto!, response )
                .then()
                .catch( ( error ) => this.handleError( error, response ) );
            
            return;
        };

        this.keyService.generatePrivateKey( generatePrivateKeyDto! )
            .then( keys => response.status( 200 ).json({ ...keys }))
            .catch( ( error ) => this.handleError( error, response ) );
    };

    public generatePublicKey = async( request: Request, response: Response ) => {

        const [ error, generatePublicKeyDto ] = GeneratePublicKeyDto.create( request.body );
        if ( !!error ){ 

            response.status(400).json({ error });
            return;
        };

        const { returnFile } = generatePublicKeyDto!;

        if ( returnFile ) {

            this.keyService.generatePublicKeyFile( generatePublicKeyDto!, response )
                .then()
                .catch( ( error ) => this.handleError( error, response ) );
            
            return;
        };

        this.keyService.generatePublicKey( generatePublicKeyDto! )
            .then( keys => response.status( 200 ).json({ ...keys }))
            .catch( ( error ) => this.handleError( error, response ) );
    };
};