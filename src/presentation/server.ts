import path from 'path';
import http from 'http';
import { ExpressAdapter, Router } from '../config';

interface Options {
    port: number;
    public_path?: string;
};

export class Server {

    public readonly app = ExpressAdapter.createServer();
    private readonly port: number;
    private readonly publicPath: string;
    private serverListener?: http.Server;

    constructor( options: Options ){

        const { port, public_path = 'public' } = options;

        this.port = port;
        this.publicPath = public_path;

        this.configure();
    };

    private configure() {

        //* Middlewares
        this.app.use( ExpressAdapter.jsonParserMiddleware() );
        this.app.use( ExpressAdapter.urlencodedParserMiddleware({ extended: true }) );

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