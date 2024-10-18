import { UploadedFile } from "../../../config";
import { PublicTypes, ValidFormats } from "./generate-key-pairs.dto";
import fs from 'fs';

interface Props {
    file: UploadedFile;
    format?: ValidFormats;
    type?: PublicTypes;
    encoding?: string;
    returnFile?: boolean;
};

export class GeneratePublicKeyDto {

    private constructor(
        public readonly returnFile: boolean,
        public readonly key: string,
        public readonly format: "pem" | "der" | "jwk",
        public readonly type: PublicTypes,
        public readonly encoding: string,
    ){};

    static create( props: Props): [ string?, GeneratePublicKeyDto? ] {

        const { 
            file,
            format = ValidFormats.pem, 
            type = PublicTypes.spki,
            encoding = 'utf-8',
        } = props;

        let { returnFile = false } = props;

        returnFile = ( String( returnFile ).trim() === 'true');

        if( !Object.values( ValidFormats ).includes( format ) ) return [
            `The parameter 'format' must be a supported format type. Received '${ format }'`
        ];
        if( !Object.values( PublicTypes ).includes( type ) ) return [
            `The parameter 'type' must be a supported Public Key encoding. Received '${ type }'`
        ];

        if( !file ) return [
            'The parameter \'file\' is required'
        ];
        const key = fs.readFileSync( file.tempFilePath, { encoding: 'utf-8' } );

        return [ undefined, new GeneratePublicKeyDto( 
            returnFile, key, format, type, encoding
        )];
    };
};