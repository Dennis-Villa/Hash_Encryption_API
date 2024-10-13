import { AlgorithmsSpecifications } from "./algorithms";

export enum AlgorithmKeyTipe {
    symmetric = 'symmetric',
    asymmetric = 'asymmetric',
};

export enum SymmetricCypherTipe {
    block = 'block',
    stream = 'stream',
};

export enum AsymmetricCypherTipe {
    reversible = 'reversible',
    ireversible = 'ireversible',
};

export interface AlgorithmEntityOptions {
   name: string;
   keyType: AlgorithmKeyTipe;
   cypherType: SymmetricCypherTipe | AsymmetricCypherTipe;
};

export class AlgorithmEntity {

    public readonly name: string;
    public readonly keyType: AlgorithmKeyTipe;
    public readonly cypherType: SymmetricCypherTipe | AsymmetricCypherTipe;

    constructor( options: AlgorithmEntityOptions ) {

        const { name, keyType, cypherType } = options;

        if ( !name ) throw 'Name is required';

        if ( !keyType ) throw 'Key type is required';
        this.checkKeyType( keyType );

        if ( !cypherType ) throw 'Cypher type is required';
        this.checkCypherType( keyType, cypherType );
        
        this.name = name; 
        this.keyType = keyType; 
        this.cypherType = cypherType; 
    };

    private checkKeyType( keyType: AlgorithmKeyTipe ): boolean {

        if ( !Object.values( AlgorithmKeyTipe ).includes( keyType ) ){
            throw 'Key must be a valid type';
        };

        return true;
    };

    private checkCypherType( 
        keyType: AlgorithmKeyTipe, cypherType: SymmetricCypherTipe | AsymmetricCypherTipe 
    ): boolean {

        if ( keyType === AlgorithmKeyTipe.symmetric ){

            if ( 
                ( cypherType !== SymmetricCypherTipe.block ) 
                && ( cypherType !== SymmetricCypherTipe.stream ) 
            ){
                throw 'Cypher must be a valid symmetric key type';
            };
        }
        else if ( keyType === AlgorithmKeyTipe.asymmetric ){

            if ( 
                ( cypherType !== AsymmetricCypherTipe.reversible ) 
                && ( cypherType !== AsymmetricCypherTipe.ireversible ) 
            ){
                throw 'Cypher must be a valid asymmetric key type';
            };
        };
        
        return true;
    };

    static fromObject( object: { [key: string]: any } ): AlgorithmEntity {

        const { name, keyType, cypherType } = object;

        if( !name ) throw new Error('Name of the algorithm is required');

        const algorithm = new AlgorithmEntity({ 
            name,
            keyType,
            cypherType,
        });

        return algorithm;
    };
};