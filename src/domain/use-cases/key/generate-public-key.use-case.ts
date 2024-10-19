import crypto, { KeyObject } from 'crypto';
import { CustomError } from '../../errors/custom.error';
import { GeneratePublicKeyDto } from '../../dtos';

export interface GeneratePublicKeyUseCase {

    execute( dto: GeneratePublicKeyDto ): Promise<{ publicKey: KeyObject }>;
};

export class GeneratePublicKey implements GeneratePublicKeyUseCase {
    
    constructor(){};

    async execute( dto: GeneratePublicKeyDto ): Promise<{ publicKey: KeyObject } | any> {

        const { key, type, cipher, passphrase, } = dto;

        try {


            const publicKey = crypto.createPublicKey( key ).export({ format: 'pem', type, cipher, passphrase });

            return { publicKey };
        }
        catch ( error: Error | any ) {
        
            throw CustomError.badRequest(`${ error?.message }`);
        };
    };
};