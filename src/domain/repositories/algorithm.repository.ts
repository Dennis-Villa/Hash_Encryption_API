import { AlgorithmEntity, AlgorithmKeyTipe, AsymmetricCypherTipe, SymmetricCypherTipe } from "../entities";

export abstract class AlgorithmRepository {
    
    abstract getAllEntities(): Promise<AlgorithmEntity[]>;

    abstract getAllNames(): Promise<string[]>;

    abstract getAllKeyTipes(): Promise<string[]>;

    abstract getAllCypherTipes(): Promise<string[]>;

    abstract getByName( name: string ): Promise<AlgorithmEntity>;

    abstract getByKeyTipe( keyType: AlgorithmKeyTipe ): Promise<AlgorithmEntity[]>;

    abstract getByCypherTipe( cypherTipe: SymmetricCypherTipe | AsymmetricCypherTipe ): Promise<AlgorithmEntity>;

};