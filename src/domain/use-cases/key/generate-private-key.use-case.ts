import crypto, { KeyObject } from 'crypto';
import { GenerateKeyPairsDto } from '../../dtos/key/generate-key-pairs.dto';
import { CustomError } from '../../errors/custom.error';
import { GeneratePrivateKeyDto } from '../../dtos';

export interface GeneratePrivateKeyUseCase {

    execute( dto: GeneratePrivateKeyDto ): Promise<{ [ key: string ]: KeyObject }>;
};

export class GeneratePrivateKey implements GeneratePrivateKeyUseCase {
    
    constructor(){};

    async execute( dto: GeneratePrivateKeyDto ): Promise<{ [ key: string ]: KeyObject }> {

        const { 
            algorithm, modulusLength, 
            format, type, 
            cipher, passphrase 
        } = dto;

        try {

            const { privateKey } = crypto.generateKeyPairSync( algorithm as "x448", {
                modulusLength,
                privateKeyEncoding: {
                    type: type,
                    format,
                    cipher,
                    passphrase,
                },
            });

            return { privateKey };
        }
        catch ( error: Error | any ) {
        
            throw CustomError.badRequest(`${ error?.message }`);
        };
    };
};