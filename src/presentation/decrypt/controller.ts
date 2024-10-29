
import { Request, Response } from '../../config';
import { CustomError } from '../../domain';
import { DecryptService } from '../services/decrypt.service';

export class DecryptController {

    constructor(
        private readonly decryptService: DecryptService,
    ) {};

    private handleError = ( error: Error | CustomError, response: Response ) => {

        if ( error instanceof CustomError ) {
        
            return response.status( error.statusCode ).json({error: error.message });
        };

        return response.status( 500 ).json({ 
            error: `Internal server error: ${error.message}`,
        });
    };

    public decryptHash = async( request: Request, response: Response ) => {

        // const [ error, createTodoDto ] = EncryptMessageDto.create( request.body );
        // if ( !!error ){ 

        //     response.status(400).json({ error });
        //     return;
        // };

        this.decryptService.decryptHash( )
            .then( hash => response.status( 200 ).json({ hash }))
            .catch( ( error ) => this.handleError( error, response ) );
    };
};