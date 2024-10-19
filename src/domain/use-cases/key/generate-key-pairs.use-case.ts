import crypto, { KeyObject } from 'crypto';
import { GenerateKeyPairsDto } from '../../dtos/key/generate-key-pairs.dto';
import { CustomError } from '../../errors/custom.error';

export interface GenerateKeyPairsUseCase {

    execute( dto: GenerateKeyPairsDto ): Promise<{ [ key: string ]: KeyObject }>;
};

export class GenerateKeyPairs implements GenerateKeyPairsUseCase {
    
    constructor(){};

    async execute( dto: GenerateKeyPairsDto ): Promise<{ [ key: string ]: KeyObject }> {

        const { 
            algorithm, modulusLength, 
            format, publicType, privateType, 
            cipher, passphrase 
        } = dto;

        try {

            const { publicKey, privateKey } = crypto.generateKeyPairSync( algorithm as "x448", {
                modulusLength,
                publicKeyEncoding: {
                    type: publicType,
                    format,
                },
                privateKeyEncoding: {
                    type: privateType,
                    format,
                    cipher,
                    passphrase,
                },
            });

            return { publicKey, privateKey };
        }
        catch ( error: Error | any ) {
        
            throw CustomError.badRequest(`${ error?.message }`);
        };
    };
};