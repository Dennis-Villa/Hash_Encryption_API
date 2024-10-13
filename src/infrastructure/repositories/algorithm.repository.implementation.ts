import { AlgorithmDatasource, AlgorithmEntity, AlgorithmKeyType, AlgorithmRepository, AsymmetricCypherType, SymmetricCypherType } from "../../domain";

export class AlgorithmRepositoryImplementation implements AlgorithmRepository {

    constructor(
        private readonly datasource: AlgorithmDatasource,
    ){};
    
    getAllEntities(): Promise<AlgorithmEntity[]> {
        
        return this.datasource.getAllEntities();
    };

    getAllNames(): Promise<string[]> {
        
        return this.datasource.getAllNames();
    };

    getAllKeyTypes(): Promise<string[]> {
        
        return this.datasource.getAllKeyTypes();
    };

    getAllCypherTypes(): Promise<string[]> {
        
        return this.datasource.getAllCypherTypes();
    };

    getByName(name: string): Promise<AlgorithmEntity> {
        
        return this.datasource.getByName( name );
    };

    getByKeyType(keyType: AlgorithmKeyType): Promise<AlgorithmEntity[]> {
        
        return this.datasource.getByKeyType( keyType );
    };

    getByCypherType(cypherType: SymmetricCypherType | AsymmetricCypherType): Promise<AlgorithmEntity[]> {
        
        return this.datasource.getByCypherType( cypherType );
    };
};