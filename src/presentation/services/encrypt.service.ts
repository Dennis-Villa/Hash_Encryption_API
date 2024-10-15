import { EncryptMessage, EncryptMessageDto } from "../../domain";

export class EncryptService {

    constructor() {};

    public async encryptMessage( encryptMessageDto: EncryptMessageDto ): Promise<string> {

        return new EncryptMessage()
            .execute( encryptMessageDto );
    };
};