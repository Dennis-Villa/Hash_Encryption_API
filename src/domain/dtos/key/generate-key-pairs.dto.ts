
export enum ValidAlgorithms {
    rsa = 'rsa', 
    rsa_pss = 'rsa-pss', 
    dsa = 'dsa', 
    // ec = 'ec', 
    ed25519 = 'ed25519', 
    ed448 = 'ed448', 
    x25519 = 'x25519', 
    x448 = 'x448', 
    // dh = 'dh',
};

export enum ValidFormats {
    pem = 'pem',
    der = 'der',
    jwk = 'jwk',
};

export enum PublicTypes {
    pkcs1   = 'pkcs1',
    spki    = 'spki',
};

export enum PrivateTypes {
    pkcs1   = 'pkcs1',
    pkcs8   = 'pkcs8',
    // sec1    = 'sec1',
};

export class GenerateKeyPairsDto {

    private constructor(
        public readonly returnFile: boolean,
        public readonly algorithm: ValidAlgorithms,
        public readonly modulusLength: number,
        public readonly format: ValidFormats,
        public readonly publicType: PublicTypes,
        public readonly privateType: PrivateTypes,
        public readonly cipher?: string,
        public readonly passphrase?: string,
    ){};

    static create( props: { [key: string]: any  }): [ string?, GenerateKeyPairsDto? ] {

        const { 
            algorithm = ValidAlgorithms.ed25519, 
            modulusLength = 4096,
            format = ValidFormats.pem, 
            publicType = PublicTypes.spki,
            privateType = PrivateTypes.pkcs8,
            passphrase = undefined 
        } = props;

        let { returnFile = false, cipher = 'aes-256-cbc' } = props;
        if( !passphrase ) cipher = undefined;

        returnFile = ( String( returnFile ).trim() === 'true');

        if( !Object.values( ValidAlgorithms ).includes( algorithm ) ) return [
            `The parameter 'algorithm' must be a supported algorithm type. Received '${ algorithm }'`
        ];
        if( !Object.values( ValidFormats ).includes( format ) ) return [
            `The parameter 'format' must be a supported format type. Received '${ format }'`
        ];
        if( !Object.values( PublicTypes ).includes( publicType ) ) return [
            `The parameter 'publicType' must be a supported Public Key encoding. Received '${ publicType }'`
        ];
        if( !Object.values( PrivateTypes ).includes( privateType ) ) return [
            `The parameter 'privateType' must be a supported Private Key encoding. Received '${ privateType }'`
        ];

        if( isNaN( Number(modulusLength) ) ) return [
            `The parameter 'modulusLength' must be a number`
        ];

        return [ undefined, new GenerateKeyPairsDto( 
            returnFile, algorithm, Number(modulusLength), format, publicType, privateType, cipher, passphrase 
        )];
    };
};