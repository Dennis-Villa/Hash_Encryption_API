import crypto, { KeyObject } from 'crypto';
import { CustomError } from '../../errors/custom.error';
import { GeneratePublicKeyDto } from '../../dtos';

export interface GeneratePublicKeyUseCase {

    execute( dto: GeneratePublicKeyDto ): Promise<{ publicKey: KeyObject }>;
};

export class GeneratePublicKey implements GeneratePublicKeyUseCase {
    
    constructor(){};

    async execute( dto: GeneratePublicKeyDto ): Promise<{ publicKey: KeyObject } | any> {

        const { format, type, encoding } = dto;

        try {

            // const publicKey = crypto.createPublicKey({
            //     key, 
            //     format, 
            //     type, 
            //     encoding,
            // });

            const key = "-----BEGIN PRIVATE KEY-----\nMC4CAQAwBQYDK2VwBCIEIFCBNFQNaEq0bRs4GZKSM01sexqysuNNWJBCR5lkZ4hv\n-----END PRIVATE KEY-----\n";

            const publicKey = crypto.createPublicKey( key ).export({ format: 'pem', type });

            console.log( publicKey );

            return { publicKey };
        }
        catch ( error: Error | any ) {
        
            throw CustomError.badRequest(`${ error?.message }`);
        };
    };
};