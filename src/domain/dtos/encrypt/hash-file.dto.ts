import { UploadedFile } from "../../../config";

export class HashFileDto {

    private constructor(
        public readonly file: UploadedFile,
        public readonly algorithm: string,
    ){};

    static create( props: { [key: string]: any  }): [ string?, HashFileDto? ] {

        const { file, algorithm } = props;

        if ( !file ) return ['File is required'];
        if ( !algorithm ) return ['Algorithm property is required'];

        return [ undefined, new HashFileDto( file, algorithm ) ];
    };
};