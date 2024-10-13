import { AlgorithmDatasource, AlgorithmEntity, AlgorithmKeyType, AsymmetricCypherType, SymmetricCypherType } from "../../../domain";
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

    async getAllCypherTypes(): Promise<string[]> {

        return [
            ...Object.values( SymmetricCypherType ),
            ...Object.values( AsymmetricCypherType ),
        ];
    };

    async getByName( name: string ): Promise<AlgorithmEntity> {
        
        const algorithm = AlgorithmsSpecifications.find( algorithm => algorithm.name === name );
        if( !algorithm ) throw CustomError.notFound( "Algorithm name not found" );

        return AlgorithmEntity.fromObject( algorithm );
    };

    async getByKeyType( keyType: AlgorithmKeyType ): Promise<AlgorithmEntity[]> {

        const algorithms = AlgorithmsSpecifications.filter( algorithm => algorithm.keyType === keyType );
        if( !algorithms ) throw CustomError.notFound( "Algorithm keyType not found" );

        return algorithms.map( algorithm => {

            return AlgorithmEntity.fromObject( algorithm );
        });
    };

    async getByCypherType( cypherType: AsymmetricCypherType | SymmetricCypherType ): Promise<AlgorithmEntity[]> {
        
        const algorithms = AlgorithmsSpecifications.filter( algorithm => algorithm.cypherType === cypherType );
        if( !algorithms ) throw CustomError.notFound( "Algorithm cypherType not found" );

        return algorithms.map( algorithm => {

            return AlgorithmEntity.fromObject( algorithm );
        });
    };
};