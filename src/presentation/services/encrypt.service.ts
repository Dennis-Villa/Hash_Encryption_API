import { CustomError, EncryptMessage, EncryptMessageDto, HashMessage, HashMessageDto, HashFileDto, HashFile } from "../../domain";
import { AlgorithmService } from './algorithm.service';

export class EncryptService {

    constructor(
        private readonly algorithmService: AlgorithmService,
    ) {};

    public async encryptMessage( encryptMessageDto: EncryptMessageDto ): Promise<string> {

        const { algorithm } = encryptMessageDto;
        if( !( await this.algorithmService.verifyNameExists( algorithm ) ) ) {

            throw CustomError.badRequest( 'Algorithm name not found' );
        };

        return new EncryptMessage()
            .execute( encryptMessageDto );
    };

    public async calculateHashMessage( hashMessageDto: HashMessageDto ): Promise<string> {

        const { algorithm } = hashMessageDto;
        if( !( await this.algorithmService.verifyNameExists( algorithm ) ) ) {

            throw CustomError.badRequest( 'Algorithm name not found' );
        };

        return new HashMessage()
            .execute( hashMessageDto );
    };

    public async calculateHashFile( hashFileDto: HashFileDto ): Promise<string> {

        const { algorithm } = hashFileDto;
        if( !( await this.algorithmService.verifyNameExists( algorithm ) ) ) {

            throw CustomError.badRequest( 'Algorithm name not found' );
        };

        return new HashFile()
            .execute( hashFileDto );
    };
};