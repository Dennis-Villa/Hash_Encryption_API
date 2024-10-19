import { CustomError } from '../../errors/custom.error';
import { Response, ZipAdapter } from '../../../config';

type Keys = { [ key: string ]: any };

export interface TransformKeyFileUseCase {

    execute( keys: Keys, response: Response ): Promise<void>;
};

export class TransformKeyFile implements TransformKeyFileUseCase {
    
    constructor(){};

    async execute( keys: Keys, response: any ): Promise<void> {

        const { publicKey, privateKey } = keys;

        const files = [];
        const fileNames = [];

        if( !!publicKey ) {

            if( typeof publicKey !== 'string' ) throw CustomError.badRequest( 'Key must be pem formatted to generate a file' );
            files.push( publicKey );
            fileNames.push( 'publicKey.key' );
        };

        if( !!privateKey ) {
            
            if( typeof privateKey !== 'string' ) throw CustomError.badRequest( 'Key must be pem formatted to generate a file' );
            files.push( privateKey );
            fileNames.push( 'privateKey.key' );
        };

        await ZipAdapter.responseZip( files, fileNames, 'keys.zip', response );
    };
};