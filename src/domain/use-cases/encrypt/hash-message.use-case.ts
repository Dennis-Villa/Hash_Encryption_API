import crypto from 'crypto';
import { HashMessageDto } from "../../dtos";

export interface HashMessageUseCase {

    execute( dto: HashMessageDto ): Promise<string>;
};

export class HashMessage implements HashMessageUseCase {
    
    constructor(){};

    async execute( dto: HashMessageDto ): Promise<string> {

        const { message, algorithm } = dto;

        return crypto.createHash( algorithm ).update( message ).digest('hex');
    };
};