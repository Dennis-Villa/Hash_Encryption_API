import { AlgorithmEntity, AlgorithmKeyType, AsymmetricCypherType, SymmetricCypherType } from "../entities";

export abstract class AlgorithmDatasource {
    
    abstract getAllEntities(): Promise<AlgorithmEntity[]>;

    abstract getAllNames(): Promise<string[]>;

    abstract getAllKeyTypes(): Promise<string[]>;

    abstract getAllCypherTypes(): Promise<string[]>;

    abstract verifyNameExist( name: string ): Promise<boolean>;

    abstract getByName( name: string ): Promise<AlgorithmEntity>;

    abstract getByKeyType( keyType: AlgorithmKeyType ): Promise<AlgorithmEntity[]>;

    abstract getByCypherType( cypherType: AsymmetricCypherType[] | SymmetricCypherType[] ): Promise<AlgorithmEntity[]>;
};