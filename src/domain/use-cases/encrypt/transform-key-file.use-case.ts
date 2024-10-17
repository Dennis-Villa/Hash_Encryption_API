import { KeyObject } from 'crypto';
import fs from 'fs';

type Keys = { [ key: string ]: any };

export interface TransformKeyFileUseCase {

    execute( keys: Keys ): Promise<any>;
};

export class TransformKeyFile implements TransformKeyFileUseCase {
    
    constructor(){};

    async execute( keys: Keys ): Promise<any> {

        const { 
            publicKey
        } = keys;

        if( typeof publicKey === 'string' ) {

            const tempPath = fs.mkdtempSync( 'temp', { encoding: 'utf-8' } );
            fs.writeFileSync( `${ tempPath }/publicKey.key`, publicKey );

            console.log( fs.readFileSync( `${ tempPath }/publicKey.key`, { encoding: 'utf-8' } ) );

            fs.rmSync( tempPath, { recursive: true } );
        };

        fs.writeFileSync( 'Buffer', `${publicKey}`);

        if( Buffer.isBuffer( publicKey ) ) {

            const tempPath = fs.mkdtempSync( 'temp', { encoding: 'utf-8' } );
            fs.writeFileSync( `${ tempPath }/publicKey.key`, Buffer.from( publicKey ) );

            console.log( fs.readFileSync( `${ tempPath }/publicKey.key`, { encoding: 'hex' } ) );

            fs.rmSync( tempPath, { recursive: true } );
        };
    };
};