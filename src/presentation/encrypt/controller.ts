import { Request, Response } from '../../config';
import { CustomError } from '../../domain';
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

        this.encryptService.encryptMessage()
            .then( hash => response.status( 200 ).json({ hash }))
            .catch( ( error ) => this.handleError( error, response ) );
    };
};