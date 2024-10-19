import { Response } from "../../config";
import { GenerateKeyPairsDto, GenerateKeyPairs, TransformKeyFile, GeneratePrivateKeyDto, GeneratePrivateKey, GeneratePublicKey, GeneratePublicKeyDto } from "../../domain";

export class KeyService {

    constructor() {};

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
};