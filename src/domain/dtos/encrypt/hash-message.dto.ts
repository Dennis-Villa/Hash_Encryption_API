
export class HashMessageDto {

    private constructor(
        public readonly message: string,
        public readonly algorithm: string,
    ){};

    static create( props: { [key: string]: any  }): [ string?, HashMessageDto? ] {

        const { message, algorithm } = props;

        if ( !message ) return ['Message property is required'];
        if ( !algorithm ) return ['Algorithm property is required'];

        return [ undefined, new HashMessageDto( message, algorithm ) ];
    };
};