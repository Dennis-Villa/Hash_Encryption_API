import { AlgorithmEntity, AlgorithmsSpecifications } from "../../domain";

export class AlgorithmService {

    constructor() {};

    public async getAll(): Promise<AlgorithmEntity[]> {

        return AlgorithmsSpecifications;
    };

    public async getNames(): Promise<string[]> {

        return AlgorithmsSpecifications.map( algorithm => algorithm.name );
    };
};