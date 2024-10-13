import { CustomError } from "../../errors/custom.error";

export enum AlgorithmKeyType {
    symmetric = 'SYMMETRIC',
    asymmetric = 'ASYMMETRIC',
};

export enum SymmetricCypherType {
    block = 'BLOCK',
    stream = 'STREAM',
};

export enum AsymmetricCypherType {
    pubKey = 'PUBKEY',
    signature = 'SIGNATURE',
};

export interface AlgorithmEntityOptions {
   name: string;
   keyType: AlgorithmKeyType;
   cypherType: SymmetricCypherType | AsymmetricCypherType;
};

export class AlgorithmEntity {

    public readonly name: string;
    public readonly keyType: AlgorithmKeyType;
    public readonly cypherType: SymmetricCypherType | AsymmetricCypherType;

    constructor( options: AlgorithmEntityOptions ) {

        const { name, keyType, cypherType } = options;

        if ( !name ) throw CustomError.badRequest( 'Algorithm name is required' );

        if ( !keyType ) throw CustomError.badRequest( 'Key type is required' );
        this.checkKeyType( keyType );

        if ( !cypherType ) throw CustomError.badRequest( 'Cypher type is required' );
        this.checkCypherType( keyType, cypherType );
        
        this.name = name; 
        this.keyType = keyType; 
        this.cypherType = cypherType; 
    };

    private checkKeyType( keyType: AlgorithmKeyType ): boolean {

        if ( !Object.values( AlgorithmKeyType ).includes( keyType ) ){

            throw CustomError.badRequest( 'Key must be a valid type' );
        };

        return true;
    };

    private checkCypherType( 
        keyType: AlgorithmKeyType, cypherType: SymmetricCypherType | AsymmetricCypherType 
    ): boolean {

        if ( keyType === AlgorithmKeyType.symmetric ){

            if ( 
                ( cypherType !== SymmetricCypherType.block ) 
                && ( cypherType !== SymmetricCypherType.stream ) 
            ){

                throw CustomError.badRequest( 'Cypher must be a valid symmetric key type' );
            };
        }
        else if ( keyType === AlgorithmKeyType.asymmetric ){

            if ( 
                ( cypherType !== AsymmetricCypherType.pubKey ) 
                && ( cypherType !== AsymmetricCypherType.signature ) 
            ){

                throw CustomError.badRequest( 'Cypher must be a valid asymmetric key type' );
            };
        };
        
        return true;
    };

    static fromObject( object: { [key: string]: any } ): AlgorithmEntity {

        const { name, keyType, cypherType } = object;

        const algorithm = new AlgorithmEntity({ 
            name,
            keyType,
            cypherType,
        });

        return algorithm;
    };
};