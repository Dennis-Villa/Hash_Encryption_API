import crypto from 'crypto';
import fs from 'fs';
import { HashFileDto } from "../../dtos";
import { CustomError } from '../../errors/custom.error';

export interface HashFileUseCase {

    execute( dto: HashFileDto ): Promise<string>;
};

export class HashFile implements HashFileUseCase {
    
    constructor(){};

    async execute( dto: HashFileDto ): Promise<string> {

        const { file, algorithm } = dto;
        let result: string = '';


        return new Promise( ( resolve ) => {
            
            const hash = crypto.createHash( algorithm );
            const rs = fs.createReadStream( file.tempFilePath );

            rs.on( 'error', ( error ) => {
                throw CustomError.internalServer( error.message)
            });
            rs.on( 'data', chunk => hash.update( chunk ) );
            rs.on( 'end', () => { 
                result = hash.digest( 'hex' ) 
                resolve( result );
            });
        });
    };
};