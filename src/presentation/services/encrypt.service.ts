import { CustomError, EncryptMessage, EncryptMessageDto, HashMessage, HashMessageDto, HashFileDto, HashFile, GenerateKeyPairsDto, GenerateKeyPairs } from "../../domain";
import { TransformKeyFile } from "../../domain/use-cases/encrypt/transform-key-file.use-case";
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

    public async generateKeyPair( generateKeyPairsDto: GenerateKeyPairsDto ): Promise<{ [ key: string ]: any }> {

        const keys = new GenerateKeyPairs()
            .execute( generateKeyPairsDto )
            .then( keys => {

                new TransformKeyFile().execute( keys );
                return keys;
            });

        return keys;
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