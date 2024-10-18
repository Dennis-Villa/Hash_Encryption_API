import fs from 'fs';
import { Request, Response } from '../../config';
import { CustomError, EncryptMessageDto, HashMessageDto, HashFileDto, GenerateKeyPairsDto } from '../../domain';
import { EncryptService } from '../services/encrypt.service';

export class EncryptController {

    constructor(
        private readonly encryptService: EncryptService,
    ) {};

    private handleError = ( error: Error | CustomError, response: Response ) => {

        if ( error instanceof CustomError ) {
        
            return response.status( error.statusCode ).json( error.message );
        };

        return response.status( 500 ).json({ 
            error: `Internal server error: ${error.message}`,
        });
    };

    public encryptMessage = async( request: Request, response: Response ) => {

        const [ error, createTodoDto ] = EncryptMessageDto.create( request.body );
        if ( !!error ){ 

            response.status(400).json({ error });
            return;
        };

        this.encryptService.encryptMessage( createTodoDto! )
            .then( hash => response.status( 200 ).json({ hash }))
            .catch( ( error ) => this.handleError( error, response ) );
    };

    public generateKeyPair = async( request: Request, response: Response ) => {

        const [ error, generateKeyPairsDto ] = GenerateKeyPairsDto.create( request.body );
        if ( !!error ){ 

            response.status(400).json({ error });
            return;
        };

        const { returnFile } = generateKeyPairsDto!;

        if ( returnFile ) {

            this.encryptService.generateKeyPairFile( generateKeyPairsDto!, response )
                .then()
                .catch( ( error ) => this.handleError( error, response ) );
            
            return;
        };

        this.encryptService.generateKeyPair( generateKeyPairsDto! )
            .then( keys => response.status( 200 ).json({ ...keys }))
            .catch( ( error ) => this.handleError( error, response ) );
    };

    public calculateHashMessage = async( request: Request, response: Response ) => {

        const [ error, hashMessageDto ] = HashMessageDto.create( request.body );
        if ( !!error ){ 

            response.status(400).json({ error });
            return;
        };

        this.encryptService.calculateHashMessage( hashMessageDto! )
            .then( hash => response.status( 200 ).json({ hash }))
            .catch( ( error ) => this.handleError( error, response ) );
    };

    public calculateHashFile = async( request: Request, response: Response ) => {

        const [ error, hashFileDto ] = HashFileDto.create( request.body );
        if ( !!error ){ 

            response.status(400).json({ error });
            return;
        };

        this.encryptService.calculateHashFile( hashFileDto! )
            .then( hash => response.status( 200 ).json({ hash }))
            .catch( ( error ) => this.handleError( error, response ) );
    };
};