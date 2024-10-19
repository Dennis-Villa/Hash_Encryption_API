import { AlgorithmDatasource, AlgorithmEntity, AlgorithmKeyType, AlgorithmRepository, AsymmetricCipherType, SymmetricCipherType } from "../../domain";

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

    getAllCipherTypes(): Promise<string[]> {
        
        return this.datasource.getAllCipherTypes();
    };

    verifyNameExist( name: string ): Promise<boolean> {
        
        return this.datasource.verifyNameExist( name );
    };

    getByName(name: string): Promise<AlgorithmEntity> {
        
        return this.datasource.getByName( name );
    };

    getByKeyType( keyType: string ): Promise<AlgorithmEntity[]> {
        
        return this.datasource.getByKeyType( keyType as AlgorithmKeyType );
    };

    getByCipherType( cipherType: string[] ): Promise<AlgorithmEntity[]> {
        
        return this.datasource.getByCipherType( cipherType as AsymmetricCipherType[] | SymmetricCipherType[] );
    };
};