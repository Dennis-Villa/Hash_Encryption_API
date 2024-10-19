import { PrivateTypes, ValidAlgorithms, ValidFormats } from "./generate-key-pairs.dto";

export class GeneratePrivateKeyDto {

    private constructor(
        public readonly returnFile: boolean,
        public readonly algorithm: ValidAlgorithms,
        public readonly modulusLength: number,
        public readonly format: ValidFormats,
        public readonly type: PrivateTypes,
        public readonly cipher?: string,
        public readonly passphrase?: string,
    ){};

    static create( props: { [key: string]: any  }): [ string?, GeneratePrivateKeyDto? ] {

        const { 
            algorithm = ValidAlgorithms.ed25519, 
            modulusLength = 4096,
            format = ValidFormats.pem, 
            type = PrivateTypes.pkcs8,
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
        if( !Object.values( PrivateTypes ).includes( type ) ) return [
            `The parameter 'type' must be a supported Private Key encoding. Received '${ type }'`
        ];

        if( isNaN( Number(modulusLength) ) ) return [
            `The parameter 'modulusLength' must be a number`
        ];

        return [ undefined, new GeneratePrivateKeyDto( 
            returnFile, algorithm, Number(modulusLength), format, type, cipher, passphrase 
        )];
    };
};