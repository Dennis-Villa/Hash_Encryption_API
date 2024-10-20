import { AlgorithmEntity, AlgorithmKeyType, AsymmetricCipherType, SymmetricCipherType } from "../entities";

export abstract class AlgorithmDatasource {
    
    abstract getAllEntities(): Promise<AlgorithmEntity[]>;

    abstract getAllNames(): Promise<string[]>;

    abstract getAllKeyTypes(): Promise<string[]>;

    abstract getAllCipherTypes(): Promise<string[]>;

    abstract verifyNameExist( name: string ): Promise<boolean>;

    abstract getByName( name: string ): Promise<AlgorithmEntity>;

    abstract getByKeyType( keyType: AlgorithmKeyType ): Promise<AlgorithmEntity[]>;

    abstract getByCipherType( cipherType: AsymmetricCipherType[] | SymmetricCipherType[] ): Promise<AlgorithmEntity[]>;
};