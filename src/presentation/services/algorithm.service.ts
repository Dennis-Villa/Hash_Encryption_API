import { AlgorithmEntity } from "../../domain";
import { AlgorithmRepositoryImplementation } from "../../infrastructure/repositories/algorithm.repository.implementation";

export class AlgorithmService {

    constructor(
        private readonly algorithmRepositoryImplementation: AlgorithmRepositoryImplementation,
    ) {};

    public async getAll(): Promise<AlgorithmEntity[]> {

        return this.algorithmRepositoryImplementation.getAllEntities();
    };

    public async getNames(): Promise<string[]> {

        return this.algorithmRepositoryImplementation.getAllNames();
    };

    getKeyTypes(): Promise<string[]> {
        
        throw new Error( 'Not implemented' );
    };

    getCypherTypes(): Promise<string[]> {
        
        throw new Error( 'Not implemented' );
    };

    getByName( name: string ): Promise<AlgorithmEntity> {
        
        throw new Error( 'Not implemented' );
    };

    getByKeyType( keyType: string ): Promise<AlgorithmEntity[]> {
        
        throw new Error( 'Not implemented' );
    };

    getByCypherType( cypherType: string ): Promise<AlgorithmEntity[]> {
        
        throw new Error( 'Not implemented' );
    };
};