import { AlgorithmEntity } from "../../domain";
import { AlgorithmRepositoryImplementation } from "../../infrastructure/repositories/algorithm.repository.implementation";

export class AlgorithmService {

    constructor(
        private readonly algorithmRepositoryImplementation: AlgorithmRepositoryImplementation,
    ) {};

    verifyNameExists( name: string ): Promise<boolean> {
        
        return this.algorithmRepositoryImplementation.verifyNameExist( name );
    };

    public async getAll(): Promise<AlgorithmEntity[]> {

        return this.algorithmRepositoryImplementation.getAllEntities();
    };

    public async getNames(): Promise<string[]> {

        return this.algorithmRepositoryImplementation.getAllNames();
    };

    getKeyTypes(): Promise<string[]> {
        
        return this.algorithmRepositoryImplementation.getAllKeyTypes();
    };

    getCypherTypes(): Promise<string[]> {
        
        return this.algorithmRepositoryImplementation.getAllCypherTypes();
    };

    getByName( name: string ): Promise<AlgorithmEntity> {
        
        return this.algorithmRepositoryImplementation.getByName( name );
    };

    getByKeyType( keyType: string ): Promise<AlgorithmEntity[]> {
        
        return this.algorithmRepositoryImplementation.getByKeyType( keyType );
    };

    getByCypherType( cypherType: string[] ): Promise<AlgorithmEntity[]> {
        
        return this.algorithmRepositoryImplementation.getByCypherType( cypherType );
    };
};