import { AlgorithmEntity, AlgorithmKeyType, AsymmetricCipherType, SymmetricCipherType } from "../entities";

export abstract class AlgorithmRepository {
    
    abstract getAllEntities(): Promise<AlgorithmEntity[]>;

    abstract getAllNames(): Promise<string[]>;

    abstract getAllKeyTypes(): Promise<string[]>;

    abstract getAllCipherTypes(): Promise<string[]>;

    abstract verifyNameExist( name: string ): Promise<boolean>;

    abstract getByName( name: string ): Promise<AlgorithmEntity>;

    abstract getByKeyType( keyType: string ): Promise<AlgorithmEntity[]>;

    abstract getByCipherType( cipherType: string[] ): Promise<AlgorithmEntity[]>;
};