import { AlgorithmEntity, AlgorithmKeyType, AsymmetricCypherType, SymmetricCypherType } from "../entities";

export abstract class AlgorithmRepository {
    
    abstract getAllEntities(): Promise<AlgorithmEntity[]>;

    abstract getAllNames(): Promise<string[]>;

    abstract getAllKeyTypes(): Promise<string[]>;

    abstract getAllCypherTypes(): Promise<string[]>;

    abstract getByName( name: string ): Promise<AlgorithmEntity>;

    abstract getByKeyType( keyType: string ): Promise<AlgorithmEntity[]>;

    abstract getByCypherType( cypherType: string[] ): Promise<AlgorithmEntity[]>;

};