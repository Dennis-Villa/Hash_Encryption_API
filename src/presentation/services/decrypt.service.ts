import { CustomError } from "../../domain";

export class DecryptService {

    constructor(
    ) {};

    public async decryptHash() {
        throw CustomError.internalServer("Not implemented");
    };
};