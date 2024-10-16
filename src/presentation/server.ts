import path from 'path';
import http from 'http';
import { ExpressAdapter, FileUploadAdapter, Router } from '../config';

interface Options {
    port: number;
    public_path?: string;
    max_file_size?: number;
};

export class Server {

    public readonly app = ExpressAdapter.createServer();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly maxFileSize: number;
    private serverListener?: http.Server;

    constructor( options: Options ){

        const { port, public_path = 'public', max_file_size = 3145728 } = options;

        this.port = port;
        this.publicPath = public_path;
        this.maxFileSize = max_file_size;

        this.configure();
    };

    private configure() {

        //* Middlewares
        this.app.use( ExpressAdapter.jsonParserMiddleware() );
        this.app.use( ExpressAdapter.urlencodedParserMiddleware({ extended: true }) );
        this.app.use( FileUploadAdapter.createWithMaxSize( this.maxFileSize ) );

        //* Public Folder
        this.app.use( ExpressAdapter.staticMiddleware( this.publicPath ) );

        //* SPA
        this.app.get( /^\/(?!api).*/, ( request, response ) => {

            const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
            response.sendFile( indexPath );
        });
    };

    public setRoutes( router: Router ) {
    
        //* Routes
        this.app.use( router );
    };
    
    async start() {
        
        this.serverListener = this.app.listen( this.port, () => {

            console.log( `Server running on port ${ this.port }` );
        });
    };
    
    public close() {
    
        this.serverListener?.close();
    };
};