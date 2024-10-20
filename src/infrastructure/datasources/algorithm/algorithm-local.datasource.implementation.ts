import { AlgorithmDatasource, AlgorithmEntity, AlgorithmKeyType, AsymmetricCipherType, SymmetricCipherType } from "../../../domain";
import { CustomError } from "../../../domain/errors/custom.error";
import { AlgorithmsSpecifications } from "./algorithms";

export class AlgorithmLocalDatasourceImplementation implements AlgorithmDatasource {
    
    async getAllEntities(): Promise<AlgorithmEntity[]> {
        
        const algorithms = AlgorithmsSpecifications;

        return algorithms.map( algorithm => {

            return AlgorithmEntity.fromObject( algorithm );
        });
    };

    async getAllNames(): Promise<string[]> {

        return AlgorithmsSpecifications.map( algorithm => algorithm.name );
    };

    async getAllKeyTypes(): Promise<string[]> {
        
        return Object.values( AlgorithmKeyType );
    };

    async getAllCipherTypes(): Promise<string[]> {

        return [
            ...Object.values( SymmetricCipherType ),
            ...Object.values( AsymmetricCipherType ),
        ];
    };

    async verifyNameExist( name: string ): Promise<boolean> {
        
        const algorithm = AlgorithmsSpecifications.find( algorithm => algorithm.name === name );

        return !!algorithm;
    };

    async getByName( name: string ): Promise<AlgorithmEntity> {
        
        const algorithm = AlgorithmsSpecifications.find( algorithm => algorithm.name === name );
        if( !algorithm ) throw CustomError.notFound( "Algorithm name not found" );

        return AlgorithmEntity.fromObject( algorithm );
    };

    async getByKeyType( keyType: AlgorithmKeyType ): Promise<AlgorithmEntity[]> {

        const algorithms = AlgorithmsSpecifications.filter( algorithm => algorithm.keyType === keyType );
        if( algorithms.length === 0 ) throw CustomError.notFound( "Algorithm keyType not found" );

        return algorithms.map( algorithm => {

            return AlgorithmEntity.fromObject( algorithm );
        });
    };

    async getByCipherType( cipherType: AsymmetricCipherType[] | SymmetricCipherType[] ): Promise<AlgorithmEntity[]> {
        
        
        const algorithms = AlgorithmsSpecifications.filter( algorithm => {

            for (let index = 0; index < cipherType.length; index++) {
                
                const element = cipherType.at( index )!;
                if ( !algorithm.cipherType.includes( element ) ) return false;
            };

            return true;
        });
        if( algorithms.length === 0 ) throw CustomError.notFound( "Algorithm cipherType not found" );

        return algorithms.map( algorithm => {

            return AlgorithmEntity.fromObject( algorithm );
        });
    };
};