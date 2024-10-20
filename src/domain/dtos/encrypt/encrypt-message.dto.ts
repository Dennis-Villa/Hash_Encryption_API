
export class EncryptMessageDto {

    private constructor(
        public readonly message: string,
        public readonly algorithm: string,
        public readonly key: string,
    ){};

    static create( props: { [key: string]: any  }): [ string?, EncryptMessageDto? ] {

        const { message, algorithm, key = '' } = props;

        if ( !message ) return ['message property is required'];
        if ( !algorithm ) return ['algorithm property is required'];

        return [ undefined, new EncryptMessageDto( message, algorithm, key ) ];
    };
};