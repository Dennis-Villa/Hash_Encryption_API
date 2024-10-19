import fs from 'fs';
import { UploadedFile } from "../../../config";
import { PublicTypes } from "./generate-key-pairs.dto";

interface Props {
    file: UploadedFile;
    type?: PublicTypes;
    encoding?: BufferEncoding;
    cipher?: string;
    passphrase?: string;
    returnFile?: boolean;
};

export class GeneratePublicKeyDto {

    private constructor(
        public readonly returnFile: boolean,
        public readonly key: string,
        public readonly type: PublicTypes,
        public readonly cipher?: string,
        public readonly passphrase?: string,
    ){};

    static create( props: Props): [ string?, GeneratePublicKeyDto? ] {

        const { 
            file,
            type = PublicTypes.spki,
            encoding = 'utf-8',
            passphrase = undefined,
        } = props;
        let { returnFile = false } = props;

        let cipher = props.cipher || 'aes-256-cbc' || undefined;
        if( !passphrase ) cipher = undefined;

        returnFile = ( String( returnFile ).trim() === 'true');

        if( !Object.values( PublicTypes ).includes( type ) ) return [
            `The parameter 'type' must be a supported Public Key encoding. Received '${ type }'`
        ];

        if( !file ) return [
            'The Private Key file is required'
        ];
        const key = fs.readFileSync( file.tempFilePath, { encoding } );

        return [ undefined, new GeneratePublicKeyDto( 
            returnFile, key, type, cipher, passphrase,
        )];
    };
};