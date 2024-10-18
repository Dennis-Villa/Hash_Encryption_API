import { Response } from "../../config";
import { CustomError, EncryptMessage, EncryptMessageDto, HashMessage, HashMessageDto, HashFileDto, HashFile, GenerateKeyPairsDto, GenerateKeyPairs, GeneratePrivateKeyDto, GeneratePrivateKey, GeneratePublicKey, GeneratePublicKeyDto } from "../../domain";
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

        return await new GenerateKeyPairs()
            .execute( generateKeyPairsDto );
    };

    public async generateKeyPairFile( generateKeyPairsDto: GenerateKeyPairsDto, response: Response ): Promise<void> {

        const keys = await new GenerateKeyPairs()
            .execute( generateKeyPairsDto );

        await new TransformKeyFile()
            .execute( keys, response );

        return;
    };

    public async generatePrivateKey( generatePrivateKeyDto: GeneratePrivateKeyDto ): Promise<{ [ key: string ]: any }> {

        return await new GeneratePrivateKey()
            .execute( generatePrivateKeyDto );
    };

    public async generatePrivateKeyFile( generatePrivateKeyDto: GeneratePrivateKeyDto, response: Response ): Promise<void> {

        const keys = await new GeneratePrivateKey()
            .execute( generatePrivateKeyDto );

        await new TransformKeyFile()
            .execute( keys, response );

        return;
    };

    public async generatePublicKey( generatePublicKeyDto: GeneratePublicKeyDto ): Promise<{ [ key: string ]: any }> {

        return await new GeneratePublicKey()
            .execute( generatePublicKeyDto );
    };

    public async generatePublicKeyFile( generatePublicKeyDto: GeneratePublicKeyDto, response: Response ): Promise<void> {

        const keys = await new GeneratePublicKey()
            .execute( generatePublicKeyDto );

        await new TransformKeyFile()
            .execute( keys, response );

        return;
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