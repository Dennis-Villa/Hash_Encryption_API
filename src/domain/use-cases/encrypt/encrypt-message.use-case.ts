import crypto from 'crypto';
import { EncryptMessageDto } from "../../dtos";

export interface EncryptMessageUseCase {

    execute( dto: EncryptMessageDto ): Promise<string>;
};

export class EncryptMessage implements EncryptMessageUseCase {
    
    constructor(){};

    async execute( dto: EncryptMessageDto ): Promise<string> {

        const { message, algorithm, key } = dto;

        return crypto.createHmac( algorithm, key ).update( message ).digest('hex');
    };
};