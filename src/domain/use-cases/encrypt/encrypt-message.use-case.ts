import { EncryptMessageDto } from "../../dtos";

export interface EncryptMessageUseCase {

    execute( dto: EncryptMessageDto ): Promise<string>;
};

export class EncryptMessage implements EncryptMessageUseCase {
    
    constructor(){};

    execute( dto: EncryptMessageDto ): Promise<string> {
        
        throw new Error( "Not implemented" );
    };
};