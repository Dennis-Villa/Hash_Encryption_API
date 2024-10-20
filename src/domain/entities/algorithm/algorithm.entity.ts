import { CustomError } from "../../errors/custom.error";

export enum AlgorithmKeyType {
    symmetric = 'SYMMETRIC',
    asymmetric = 'ASYMMETRIC',
};

export enum SymmetricCipherType {
    block = 'BLOCK',
    stream = 'STREAM',
};

export enum AsymmetricCipherType {
    pubKey = 'PUBKEY',
    signature = 'SIGNATURE',
};

export interface AlgorithmEntityOptions {
   name: string;
   keyType: AlgorithmKeyType;
   cipherType: SymmetricCipherType[] | AsymmetricCipherType[];
};

export class AlgorithmEntity {

    public readonly name: string;
    public readonly keyType: AlgorithmKeyType;
    public readonly cipherType: SymmetricCipherType[] | AsymmetricCipherType[];

    constructor( options: AlgorithmEntityOptions ) {

        const { name, keyType, cipherType } = options;

        if ( !name ) throw CustomError.badRequest( 'Algorithm name is required' );

        if ( !keyType ) throw CustomError.badRequest( 'Key type is required' );
        this.checkKeyType( keyType );

        if ( !cipherType ) throw CustomError.badRequest( 'Cipher type is required' );
        this.checkCypherType( keyType, cipherType );
        
        this.name = name; 
        this.keyType = keyType; 
        this.cipherType = cipherType; 
    };

    private checkKeyType( keyType: AlgorithmKeyType ): boolean {

        if ( !Object.values( AlgorithmKeyType ).includes( keyType ) ){

            throw CustomError.badRequest( 'Key must be a valid type' );
        };

        return true;
    };

    private checkCypherType( keyType: string, cipherType: string[] ): boolean {

        if ( keyType === AlgorithmKeyType.symmetric ){

            if ( 
                ( !cipherType.includes( SymmetricCipherType.block ) ) 
                && ( !cipherType.includes( SymmetricCipherType.stream ) ) 
            ){

                throw CustomError.badRequest( 'Cipher must be a valid symmetric key type' );
            };
        }
        else if ( keyType === AlgorithmKeyType.asymmetric ){

            if ( 
                ( !cipherType.includes( AsymmetricCipherType.pubKey ) ) 
                && ( !cipherType.includes( AsymmetricCipherType.signature ) ) 
            ){

                throw CustomError.badRequest( 'Cipher must be a valid asymmetric key type' );
            };
        };
        
        return true;
    };

    static fromObject( object: { [key: string]: any } ): AlgorithmEntity {

        const { name, keyType, cipherType } = object;

        const algorithm = new AlgorithmEntity({ 
            name,
            keyType,
            cipherType,
        });

        return algorithm;
    };
};