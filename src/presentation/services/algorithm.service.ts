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

    getCipherTypes(): Promise<string[]> {
        
        return this.algorithmRepositoryImplementation.getAllCipherTypes();
    };

    getByName( name: string ): Promise<AlgorithmEntity> {
        
        return this.algorithmRepositoryImplementation.getByName( name );
    };

    getByKeyType( keyType: string ): Promise<AlgorithmEntity[]> {
        
        return this.algorithmRepositoryImplementation.getByKeyType( keyType );
    };

    getByCipherType( cipherType: string[] ): Promise<AlgorithmEntity[]> {
        
        return this.algorithmRepositoryImplementation.getByCipherType( cipherType );
    };
};